<?php
/**
 * OLOID Corporate Portal — Independent Repository Availability Watchdog
 *
 * Runs autonomously via Hostinger Scheduled Tasks (Cron Jobs) to monitor
 * the upstream GitHub repository availability and integrity.
 *
 * Requirements satisfied:
 * - Runs independently of GitHub Actions.
 * - Uses the official GitHub REST API.
 * - Validates expected Repository ID (1422620252) matching invisioncoai-a11y/oloid.
 * - Supports authenticated Personal Access Tokens (PAT) for private repo visibility.
 * - Distinguishes HTTP 200, 401, 403, 404, 429, 5xx, and network transport errors.
 * - NEVER disables the site for timeouts, outages, rate-limits, or bad credentials.
 * - Requires at least 3 consecutive confirmed HTTP 404s with valid authentication.
 * - Explains GitHub 404 behavior for private repos vs deleted repos.
 * - Creates a shutdown marker outside public_html triggering HTTP 503 via .htaccess.
 * - Requires explicit administrative intervention to clear a confirmed shutdown.
 * - Supports safe --dry-run and --simulate modes for verification.
 *
 * Usage:
 *   php watchdog.php [--config=/path/to/config.json] [--dry-run] [--status] [--clear-shutdown] [--simulate-404]
 */

declare(strict_types=1);

// Default configuration constants
define('WATCHDOG_VERSION', '1.0.0');
define('DEFAULT_REPO_ID', 1422620252);
define('DEFAULT_REPO_OWNER', 'invisioncoai-a11y');
define('DEFAULT_REPO_NAME', 'oloid');
define('DEFAULT_THRESHOLD', 3);

// Determine directory paths (placed outside public_html in production)
$baseDir = __DIR__;
$defaultConfigFile = $baseDir . '/watchdog.config.json';
$defaultStateFile  = $baseDir . '/watchdog.state.json';
$defaultLogFile    = $baseDir . '/watchdog.log';
$defaultMarkerFile = dirname($baseDir) . '/.site_disabled_marker'; // One level above public_html

// Parse CLI options
$options = getopt('', [
    'config:',
    'dry-run',
    'status',
    'clear-shutdown',
    'simulate-404',
    'help'
]);

if (isset($options['help'])) {
    echo "OLOID Repository Watchdog v" . WATCHDOG_VERSION . "\n";
    echo "Usage:\n";
    echo "  php watchdog.php [options]\n\n";
    echo "Options:\n";
    echo "  --config=<path>     Path to JSON configuration file\n";
    echo "  --dry-run           Execute checks without writing shutdown marker\n";
    echo "  --status            Display current watchdog state and exit\n";
    echo "  --clear-shutdown    Administratively clear shutdown marker and reset count\n";
    echo "  --simulate-404      Simulate an authenticated 404 response for testing\n";
    echo "  --help              Display this help message\n";
    exit(0);
}

// Load Configuration
$configFile = $options['config'] ?? $defaultConfigFile;
$config = [
    'expected_repo_id'          => DEFAULT_REPO_ID,
    'repo_owner'                => DEFAULT_REPO_OWNER,
    'repo_name'                 => DEFAULT_REPO_NAME,
    'github_token'              => getenv('GITHUB_TOKEN') ?: '',
    'consecutive_404_threshold' => DEFAULT_THRESHOLD,
    'state_file'                => $defaultStateFile,
    'log_file'                  => $defaultLogFile,
    'marker_file'               => $defaultMarkerFile,
    'dry_run'                   => false
];

if (file_exists($configFile)) {
    $loaded = json_decode((string)file_get_contents($configFile), true);
    if (is_array($loaded)) {
        $config = array_merge($config, $loaded);
    }
}

// Override dry-run if flag provided
if (isset($options['dry-run'])) {
    $config['dry_run'] = true;
}

// Logging helper
function writeLog(string $level, string $message, array $context = []): void {
    global $config;
    $timestamp = gmdate('Y-m-d\TH:i:s\Z');
    $contextStr = !empty($context) ? ' ' . json_encode($context, JSON_UNESCAPED_SLASHES) : '';
    $line = sprintf("[%s] [%s] %s%s\n", $timestamp, strtoupper($level), $message, $contextStr);
    
    // Output to stdout for cron execution logs
    echo $line;
    
    // Append to protected log file
    if (!empty($config['log_file'])) {
        @file_put_contents($config['log_file'], $line, FILE_APPEND | LOCK_EX);
    }
}

// State helpers
function loadState(): array {
    global $config;
    if (file_exists($config['state_file'])) {
        $data = json_decode((string)file_get_contents($config['state_file']), true);
        if (is_array($data)) {
            return $data;
        }
    }
    return [
        'consecutive_404_count' => 0,
        'last_check_timestamp'  => null,
        'last_http_status'      => null,
        'last_status_message'   => 'Initialized',
        'site_disabled'         => false,
        'site_disabled_at'      => null,
        'history'               => []
    ];
}

function saveState(array $state): void {
    global $config;
    // Keep max 20 history entries
    if (isset($state['history']) && count($state['history']) > 20) {
        $state['history'] = array_slice($state['history'], -20);
    }
    @file_put_contents($config['state_file'], json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

// Handle administrative status display
if (isset($options['status'])) {
    $state = loadState();
    echo "=== OLOID REPOSITORY WATCHDOG STATUS ===\n";
    echo "Target Repo ID:        " . $config['expected_repo_id'] . "\n";
    echo "Target Repo:           " . $config['repo_owner'] . "/" . $config['repo_name'] . "\n";
    echo "Authenticated:         " . (!empty($config['github_token']) ? "YES (Token Configured)" : "NO (Public API Only)") . "\n";
    echo "Consecutive 404 Count: " . $state['consecutive_404_count'] . " / " . $config['consecutive_404_threshold'] . "\n";
    echo "Site Disabled State:   " . ($state['site_disabled'] ? "YES (HTTP 503 ACTIVE)" : "NO (Normal Operation)") . "\n";
    echo "Marker File:           " . $config['marker_file'] . " (" . (file_exists($config['marker_file']) ? "EXISTS" : "NOT FOUND") . ")\n";
    echo "Last Checked:          " . ($state['last_check_timestamp'] ?? 'Never') . "\n";
    echo "Last HTTP Status:      " . ($state['last_http_status'] ?? 'N/A') . " (" . ($state['last_status_message'] ?? 'None') . ")\n";
    exit(0);
}

// Handle administrative clear / restoration
if (isset($options['clear-shutdown'])) {
    writeLog('INFO', "Administrative reset requested. Clearing shutdown marker and resetting counters.");
    $state = loadState();
    $state['consecutive_404_count'] = 0;
    $state['site_disabled'] = false;
    $state['site_disabled_at'] = null;
    $state['last_status_message'] = 'Administratively Restored';
    saveState($state);
    
    if (file_exists($config['marker_file'])) {
        @unlink($config['marker_file']);
        writeLog('INFO', "Deleted shutdown marker: " . $config['marker_file']);
    }
    echo "Website administratively restored. Normal operation resumed.\n";
    exit(0);
}

// Check existing shutdown state
$state = loadState();
if ($state['site_disabled'] && file_exists($config['marker_file'])) {
    writeLog('WARNING', "Website is currently in ADMINISTRATIVE SHUTDOWN. Manual clearance required via --clear-shutdown. Monitoring paused.");
    exit(0);
}

// Execute GitHub API request
$repoUrl = sprintf("https://api.github.com/repositories/%d", $config['expected_repo_id']);
$token = trim((string)$config['github_token']);
$isAuthenticated = !empty($token);

$headers = [
    'User-Agent: OLOID-Watchdog/' . WATCHDOG_VERSION,
    'Accept: application/vnd.github+json',
    'X-GitHub-Api-Version: 2022-11-28'
];

if ($isAuthenticated) {
    $headers[] = 'Authorization: Bearer ' . $token;
}

// Simulation override
$simulate404 = isset($options['simulate-404']);

$httpCode = 0;
$responseBody = '';
$curlError = '';

if ($simulate404) {
    writeLog('TEST', "SIMULATING an authenticated HTTP 404 response for testing failure policy.");
    $httpCode = 404;
    $responseBody = json_encode(['message' => 'Not Found', 'documentation_url' => 'https://docs.github.com/rest/repos/repos#get-a-repository']);
    $isAuthenticated = true; // Test with simulated valid auth
} else {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $repoUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 8);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $responseBody = (string)curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
}

$now = gmdate('Y-m-d\TH:i:s\Z');
$state['last_check_timestamp'] = $now;
$state['last_http_status'] = $httpCode;

// Process HTTP Response Matrix
if ($curlError !== '') {
    // Network / Transport error — DO NOT DISABLE
    $msg = "Network/cURL error encountered: " . $curlError;
    writeLog('WARNING', $msg);
    $state['last_status_message'] = $msg;
    saveState($state);
    exit(0);
}

switch ($httpCode) {
    case 200:
        // Healthy repository verification
        $data = json_decode($responseBody, true);
        $receivedId = $data['id'] ?? null;
        $receivedName = $data['full_name'] ?? 'unknown';
        
        if ((int)$receivedId === (int)$config['expected_repo_id']) {
            writeLog('INFO', sprintf("Repository verified OK: %s (ID: %d). System nominal.", $receivedName, $receivedId));
            $state['consecutive_404_count'] = 0;
            $state['last_status_message'] = "OK: " . $receivedName;
        } else {
            writeLog('CRITICAL', sprintf("Repository ID MISMATCH! Expected %d, received %s (%s). Potential repo diversion.", $config['expected_repo_id'], var_export($receivedId, true), $receivedName));
            $state['last_status_message'] = "ID Mismatch: " . $receivedName;
        }
        break;

    case 401:
        // Authentication token invalid or expired — DO NOT DISABLE
        writeLog('ERROR', "HTTP 401 Unauthorized: Configured GitHub token is invalid or expired. Site remains operational.");
        $state['last_status_message'] = "HTTP 401: Invalid Credentials";
        break;

    case 403:
        // Rate limit or permission denied — DO NOT DISABLE
        writeLog('WARNING', "HTTP 403 Forbidden: Potential rate limit reached or insufficient token scope. Site remains operational.");
        $state['last_status_message'] = "HTTP 403: Forbidden / Rate Limited";
        break;

    case 429:
        // Explicit rate limit — DO NOT DISABLE
        writeLog('WARNING', "HTTP 429 Too Many Requests: Rate limited by GitHub API. Site remains operational.");
        $state['last_status_message'] = "HTTP 429: Rate Limited";
        break;

    case 404:
        // NOT FOUND analysis
        // Note: GitHub returns 404 for private repos without auth OR deleted repos.
        if (!$isAuthenticated) {
            writeLog('WARNING', "HTTP 404 Not Found received WITHOUT authentication. If repository was made private, an authenticated token is required. Will NOT increment consecutive deletion count without confirmed authentication.");
            $state['last_status_message'] = "HTTP 404: Unauthenticated (Safe Skip)";
            break;
        }

        // Authenticated 404: Confirmed missing
        $state['consecutive_404_count']++;
        $currentCount = $state['consecutive_404_count'];
        $threshold = (int)$config['consecutive_404_threshold'];
        
        writeLog('ALERT', sprintf("Confirmed authenticated 404 Not Found! Consecutive count: %d of %d.", $currentCount, $threshold));
        $state['last_status_message'] = sprintf("HTTP 404 (Consecutive: %d/%d)", $currentCount, $threshold);

        if ($currentCount >= $threshold) {
            if ($config['dry_run']) {
                writeLog('DRY-RUN', sprintf("Threshold reached (%d consecutive 404s). Marker creation SKIPPED due to dry-run mode.", $currentCount));
            } else {
                writeLog('CRITICAL', sprintf("Threshold reached (%d consecutive 404s)! Initiating administrative shutdown.", $currentCount));
                
                // Write shutdown marker file
                $markerContent = sprintf(
                    "SHUTDOWN_TRIGGERED_AT=%s\nREPO_ID=%d\nCONSECUTIVE_404_COUNT=%d\nREASON=Confirmed repository deletion or authorization revocation.\n",
                    $now,
                    $config['expected_repo_id'],
                    $currentCount
                );
                
                $dir = dirname($config['marker_file']);
                if (!is_dir($dir)) {
                    @mkdir($dir, 0755, true);
                }
                
                $written = @file_put_contents($config['marker_file'], $markerContent, LOCK_EX);
                if ($written !== false) {
                    writeLog('CRITICAL', "Shutdown marker successfully created at: " . $config['marker_file']);
                    $state['site_disabled'] = true;
                    $state['site_disabled_at'] = $now;
                } else {
                    writeLog('ERROR', "FAILED to write shutdown marker at: " . $config['marker_file']);
                }
            }
        }
        break;

    default:
        // 5xx Server errors, 502 Bad Gateway, 503 Service Unavailable, etc. — DO NOT DISABLE
        writeLog('WARNING', sprintf("HTTP %d unexpected response from GitHub API. Site remains operational.", $httpCode));
        $state['last_status_message'] = "HTTP " . $httpCode . ": GitHub Upstream Outage";
        break;
}

// Record history entry
$state['history'][] = [
    'timestamp' => $now,
    'http_code' => $httpCode,
    'count_404' => $state['consecutive_404_count'],
    'message'   => $state['last_status_message']
];

saveState($state);
