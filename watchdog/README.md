# OLOID — Independent Repository Availability Watchdog

Autonomous server-side monitoring daemon designed to run via **Hostinger Scheduled Tasks (Cron Jobs)**.

---

## 1. Overview & Operational Model

The OLOID website is a static, high-performance React application hosted on Hostinger. To guarantee source repository integrity and verify legitimate deployment lifecycle ownership without introducing a runtime backend to the frontend app, this watchdog runs **independently outside `public_html`**.

```
[ Hostinger Cron (every 30m) ]
          │
          ▼
   [ watchdog.php / watchdog.py ]
          │
          ├─► Query GitHub REST API (Repo ID: 1422620252)
          │
          ├─► HTTP 200 (OK) ──────────────► Reset failure counter; site nominal
          │
          ├─► Network error / 5xx / 429 ──► Transient failure; DO NOTHING
          │
          ├─► HTTP 401 / 403 ─────────────► Auth/rate limit; DO NOTHING
          │
          └─► Authenticated HTTP 404 ─────► Counter++
                    │
                    ▼ (3 consecutive confirmed 404s)
             [ Write /home/uXXXXX/.site_disabled_marker ]
                    │
                    ▼
     [ Apache/LiteSpeed .htaccess detects marker ]
                    │
                    ▼
     [ Returns HTTP 503 Service Unavailable ]
     (Static files, databases, mailboxes, and DNS 100% UNTOUCHED)
```

---

## 2. Directory Layout on Hostinger

```
/home/uXXXXX/
├── .site_disabled_marker          <-- Created ONLY if 3 consecutive authenticated 404s occur
├── watchdog/                       <-- Kept strictly OUTSIDE public_html
│   ├── watchdog.php                <-- Primary Cron execution script (PHP CLI)
│   ├── watchdog.py                 <-- Alternative script (Python 3)
│   ├── watchdog.config.json        <-- Configuration & GitHub token (NOT in Git)
│   ├── watchdog.state.json         <-- Autonomous counter & status history
│   └── watchdog.log                <-- Audit trail & timestamped activity logs
└── public_html/                    <-- Production web root (deployed from hostinger-deploy branch)
    ├── .htaccess                   <-- Checks for .site_disabled_marker and serves 503
    ├── index.html
    └── assets/
```

---

## 3. Important GitHub API Behaviors

> [!IMPORTANT]
> **GitHub 404 vs 403 Semantics:**  
> GitHub's security model deliberately returns **HTTP 404 (Not Found)** instead of HTTP 403 when a client requests a private repository without sufficient permissions, to avoid disclosing whether a private repository exists.
>
> **The Watchdog Safeguard:**  
> - If an **unauthenticated** request receives a 404, the watchdog logs a warning and **SKIPS** incrementing the counter. It will **NEVER** shut down the website simply because a repository was toggled to private while unauthenticated.
> - To monitor a private repository, supply a read-only GitHub Personal Access Token (PAT) with `repo:read` or fine-grained repository read permissions in `watchdog.config.json`.
> - The shutdown action **requires at least 3 consecutive confirmed 404 responses with valid authentication**.

---

## 4. Hostinger Cron Job Configuration

1. Log into **Hostinger hPanel**.
2. Navigate to **Advanced** &rarr; **Cron Jobs**.
3. Under **Create a Cron Job**, configure:
   - **Type:** `PHP` (or `Custom`)
   - **Command:**
     ```bash
     /usr/bin/php /home/uXXXXX/watchdog/watchdog.php
     ```
     *(Replace `uXXXXX` with your Hostinger user account path, visible on your hPanel dashboard).*
   - **Interval:** Every 30 minutes (`*/30 * * * *`) or Hourly (`0 * * * *`).

---

## 5. Testing & Safe Simulation

### A. Dry-Run Mode
Test the script without risking site modification:
```bash
php /home/uXXXXX/watchdog/watchdog.php --dry-run
```

### B. Status Inspection
Inspect current counters, last check timestamp, and marker status:
```bash
php /home/uXXXXX/watchdog/watchdog.php --status
```

### C. 404 Policy Simulation
Simulate an authenticated 404 to test the consecutive threshold logic safely:
```bash
php /home/uXXXXX/watchdog/watchdog.php --simulate-404 --dry-run
```

### D. Administrative Clear & Restoration
If a shutdown was triggered and you wish to restore the website:
```bash
php /home/uXXXXX/watchdog/watchdog.php --clear-shutdown
```
This resets the counter to 0, deletes the marker file, and immediately resumes normal HTTP 200 responses through `.htaccess`.

---

## 6. Email and DNS Safety Guarantee

The watchdog:
- **NEVER** modifies DNS records or nameservers.
- **NEVER** touches MX, SPF, DKIM, or DMARC records.
- **NEVER** interacts with or removes email mailboxes or mail services.
- **NEVER** deletes website files or databases.
