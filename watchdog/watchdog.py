#!/usr/bin/env python3
"""
OLOID Corporate Portal — Independent Repository Availability Watchdog (Python 3)

Runs autonomously via Hostinger Scheduled Tasks (Cron Jobs) to monitor
the upstream GitHub repository availability and integrity.

Requirements satisfied:
- Runs independently of GitHub Actions.
- Uses the official GitHub REST API.
- Validates expected Repository ID (1422620252) matching invisioncoai-a11y/oloid.
- Supports authenticated Personal Access Tokens (PAT) for private repo visibility.
- Distinguishes HTTP 200, 401, 403, 404, 429, 5xx, and network transport errors.
- NEVER disables the site for timeouts, outages, rate-limits, or bad credentials.
- Requires at least 3 consecutive confirmed HTTP 404s with valid authentication.
- Explains GitHub 404 behavior for private repos vs deleted repos.
- Creates a shutdown marker outside public_html triggering HTTP 503 via .htaccess.
- Requires explicit administrative intervention to clear a confirmed shutdown.
- Supports safe --dry-run and --simulate modes for verification.

Usage:
  python3 watchdog.py [--config=/path/to/config.json] [--dry-run] [--status] [--clear-shutdown] [--simulate-404]
"""

import sys
import os
import json
import time
import argparse
import urllib.request
import urllib.error
from datetime import datetime, timezone

WATCHDOG_VERSION = "1.0.0"
DEFAULT_REPO_ID = 1422620252
DEFAULT_REPO_OWNER = "invisioncoai-a11y"
DEFAULT_REPO_NAME = "oloid"
DEFAULT_THRESHOLD = 3

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CONFIG_FILE = os.path.join(BASE_DIR, "watchdog.config.json")
DEFAULT_STATE_FILE = os.path.join(BASE_DIR, "watchdog.state.json")
DEFAULT_LOG_FILE = os.path.join(BASE_DIR, "watchdog.log")
DEFAULT_MARKER_FILE = os.path.abspath(os.path.join(BASE_DIR, "..", ".site_disabled_marker"))


def load_config(config_path):
    config = {
        "expected_repo_id": DEFAULT_REPO_ID,
        "repo_owner": DEFAULT_REPO_OWNER,
        "repo_name": DEFAULT_REPO_NAME,
        "github_token": os.environ.get("GITHUB_TOKEN", "").strip(),
        "consecutive_404_threshold": DEFAULT_THRESHOLD,
        "state_file": DEFAULT_STATE_FILE,
        "log_file": DEFAULT_LOG_FILE,
        "marker_file": DEFAULT_MARKER_FILE,
        "dry_run": False
    }

    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                loaded = json.load(f)
                if isinstance(loaded, dict):
                    config.update(loaded)
        except Exception as e:
            print(f"[ERROR] Failed to read config file {config_path}: {e}")

    return config


def write_log(config, level, message, context=None):
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    ctx_str = f" {json.dumps(context)}" if context else ""
    line = f"[{now_str}] [{level.upper()}] {message}{ctx_str}\n"

    print(line, end="")
    log_path = config.get("log_file")
    if log_path:
        try:
            log_dir = os.path.dirname(log_path)
            if log_dir and not os.path.exists(log_dir):
                os.makedirs(log_dir, exist_ok=True)
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(line)
        except Exception as e:
            print(f"[ERROR] Failed to write to log file {log_path}: {e}")


def load_state(state_path):
    if os.path.exists(state_path):
        try:
            with open(state_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, dict):
                    return data
        except Exception:
            pass

    return {
        "consecutive_404_count": 0,
        "last_check_timestamp": None,
        "last_http_status": None,
        "last_status_message": "Initialized",
        "site_disabled": False,
        "site_disabled_at": None,
        "history": []
    }


def save_state(state_path, state):
    try:
        state_dir = os.path.dirname(state_path)
        if state_dir and not os.path.exists(state_dir):
            os.makedirs(state_dir, exist_ok=True)
        if "history" in state and len(state["history"]) > 20:
            state["history"] = state["history"][-20:]
        with open(state_path, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2)
    except Exception as e:
        print(f"[ERROR] Failed to save state to {state_path}: {e}")


def main():
    parser = argparse.ArgumentParser(description="OLOID GitHub Repository Availability Watchdog")
    parser.add_argument("--config", default=DEFAULT_CONFIG_FILE, help="Path to config JSON")
    parser.add_argument("--dry-run", action="store_true", help="Execute checks without modifying marker")
    parser.add_argument("--status", action="store_true", help="Show current state and exit")
    parser.add_argument("--clear-shutdown", action="store_true", help="Clear shutdown marker and reset counts")
    parser.add_argument("--simulate-404", action="store_true", help="Simulate authenticated 404 response")

    args = parser.parse_args()
    config = load_config(args.config)

    if args.dry_run:
        config["dry_run"] = True

    state_file = config["state_file"]
    state = load_state(state_file)

    if args.status:
        marker_file = config["marker_file"]
        print("=== OLOID REPOSITORY WATCHDOG STATUS ===")
        print(f"Target Repo ID:        {config['expected_repo_id']}")
        print(f"Target Repo:           {config['repo_owner']}/{config['repo_name']}")
        print(f"Authenticated:         {'YES (Token Configured)' if config.get('github_token') else 'NO (Public API Only)'}")
        print(f"Consecutive 404 Count: {state.get('consecutive_404_count', 0)} / {config['consecutive_404_threshold']}")
        print(f"Site Disabled State:   {'YES (HTTP 503 ACTIVE)' if state.get('site_disabled') else 'NO (Normal Operation)'}")
        print(f"Marker File:           {marker_file} ({'EXISTS' if os.path.exists(marker_file) else 'NOT FOUND'})")
        print(f"Last Checked:          {state.get('last_check_timestamp', 'Never')}")
        print(f"Last HTTP Status:      {state.get('last_http_status', 'N/A')} ({state.get('last_status_message', 'None')})")
        return 0

    if args.clear_shutdown:
        write_log(config, "INFO", "Administrative reset requested. Clearing shutdown marker and resetting counters.")
        state["consecutive_404_count"] = 0
        state["site_disabled"] = False
        state["site_disabled_at"] = None
        state["last_status_message"] = "Administratively Restored"
        save_state(state_file, state)

        marker_file = config["marker_file"]
        if os.path.exists(marker_file):
            try:
                os.remove(marker_file)
                write_log(config, "INFO", f"Deleted shutdown marker: {marker_file}")
            except Exception as e:
                write_log(config, "ERROR", f"Failed to delete marker file: {e}")
        print("Website administratively restored. Normal operation resumed.")
        return 0

    # Prevent further execution if already in confirmed shutdown
    if state.get("site_disabled") and os.path.exists(config["marker_file"]):
        write_log(config, "WARNING", "Website is currently in ADMINISTRATIVE SHUTDOWN. Manual clearance required via --clear-shutdown. Monitoring paused.")
        return 0

    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    state["last_check_timestamp"] = now_str

    token = config.get("github_token", "").strip()
    is_authenticated = bool(token)

    # API execution or simulation
    http_code = 0
    response_body = ""
    error_message = None

    if args.simulate_404:
        write_log(config, "TEST", "SIMULATING an authenticated HTTP 404 response for testing failure policy.")
        http_code = 404
        is_authenticated = True
        response_body = json.dumps({"message": "Not Found", "documentation_url": "https://docs.github.com/rest/repos/repos#get-a-repository"})
    else:
        repo_url = f"https://api.github.com/repositories/{config['expected_repo_id']}"
        headers = {
            "User-Agent": f"OLOID-Watchdog/{WATCHDOG_VERSION}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        if is_authenticated:
            headers["Authorization"] = f"Bearer {token}"

        req = urllib.request.Request(repo_url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                http_code = resp.getcode()
                response_body = resp.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            http_code = e.code
            try:
                response_body = e.read().decode("utf-8")
            except Exception:
                response_body = ""
        except urllib.error.URLError as e:
            error_message = str(e.reason)
        except Exception as e:
            error_message = str(e)

    state["last_http_status"] = http_code

    if error_message:
        msg = f"Network/URLError encountered: {error_message}"
        write_log(config, "WARNING", msg)
        state["last_status_message"] = msg
        save_state(state_file, state)
        return 0

    if http_code == 200:
        try:
            data = json.loads(response_body)
            recv_id = data.get("id")
            recv_name = data.get("full_name")
            if int(recv_id) == int(config["expected_repo_id"]):
                write_log(config, "INFO", f"Repository verified OK: {recv_name} (ID: {recv_id}). System nominal.")
                state["consecutive_404_count"] = 0
                state["last_status_message"] = f"OK: {recv_name}"
            else:
                write_log(config, "CRITICAL", f"Repository ID MISMATCH! Expected {config['expected_repo_id']}, received {recv_id} ({recv_name}). Potential repo diversion.")
                state["last_status_message"] = f"ID Mismatch: {recv_name}"
        except Exception as e:
            write_log(config, "ERROR", f"Failed to parse GitHub JSON payload: {e}")
            state["last_status_message"] = f"JSON parse error: {e}"

    elif http_code == 401:
        write_log(config, "ERROR", "HTTP 401 Unauthorized: Configured GitHub token is invalid or expired. Site remains operational.")
        state["last_status_message"] = "HTTP 401: Invalid Credentials"

    elif http_code == 403:
        write_log(config, "WARNING", "HTTP 403 Forbidden: Potential rate limit reached or insufficient token scope. Site remains operational.")
        state["last_status_message"] = "HTTP 403: Forbidden / Rate Limited"

    elif http_code == 429:
        write_log(config, "WARNING", "HTTP 429 Too Many Requests: Rate limited by GitHub API. Site remains operational.")
        state["last_status_message"] = "HTTP 429: Rate Limited"

    elif http_code == 404:
        if not is_authenticated:
            write_log(config, "WARNING", "HTTP 404 Not Found received WITHOUT authentication. If repository was made private, an authenticated token is required. Will NOT increment consecutive deletion count without confirmed authentication.")
            state["last_status_message"] = "HTTP 404: Unauthenticated (Safe Skip)"
        else:
            state["consecutive_404_count"] = state.get("consecutive_404_count", 0) + 1
            cur_count = state["consecutive_404_count"]
            threshold = int(config["consecutive_404_threshold"])

            write_log(config, "ALERT", f"Confirmed authenticated 404 Not Found! Consecutive count: {cur_count} of {threshold}.")
            state["last_status_message"] = f"HTTP 404 (Consecutive: {cur_count}/{threshold})"

            if cur_count >= threshold:
                if config.get("dry_run"):
                    write_log(config, "DRY-RUN", f"Threshold reached ({cur_count} consecutive 404s). Marker creation SKIPPED due to dry-run mode.")
                else:
                    write_log(config, "CRITICAL", f"Threshold reached ({cur_count} consecutive 404s)! Initiating administrative shutdown.")
                    marker_file = config["marker_file"]
                    marker_content = (
                        f"SHUTDOWN_TRIGGERED_AT={now_str}\n"
                        f"REPO_ID={config['expected_repo_id']}\n"
                        f"CONSECUTIVE_404_COUNT={cur_count}\n"
                        f"REASON=Confirmed repository deletion or authorization revocation.\n"
                    )
                    try:
                        m_dir = os.path.dirname(marker_file)
                        if m_dir and not os.path.exists(m_dir):
                            os.makedirs(m_dir, exist_ok=True)
                        with open(marker_file, "w", encoding="utf-8") as f:
                            f.write(marker_content)
                        write_log(config, "CRITICAL", f"Shutdown marker successfully created at: {marker_file}")
                        state["site_disabled"] = True
                        state["site_disabled_at"] = now_str
                    except Exception as e:
                        write_log(config, "ERROR", f"FAILED to write shutdown marker at: {marker_file}: {e}")

    else:
        write_log(config, "WARNING", f"HTTP {http_code} unexpected response from GitHub API. Site remains operational.")
        state["last_status_message"] = f"HTTP {http_code}: GitHub Upstream Outage"

    if "history" not in state:
        state["history"] = []
    state["history"].append({
        "timestamp": now_str,
        "http_code": http_code,
        "count_404": state.get("consecutive_404_count", 0),
        "message": state.get("last_status_message")
    })

    save_state(state_file, state)
    return 0


if __name__ == "__main__":
    sys.exit(main())
