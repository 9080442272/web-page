document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const apiKeyInput = document.getElementById('api-key-input');
    const toggleKeyVisibilityBtn = document.getElementById('toggle-key-visibility');
    const visibilityIcon = document.getElementById('visibility-icon');
    const copyKeyBtn = document.getElementById('copy-key-btn');
    const copyIcon = document.getElementById('copy-icon');
    const verifyKeyBtn = document.getElementById('verify-key-btn');
    const verificationStatus = document.getElementById('verification-status');
    
    const endpointSelect = document.getElementById('endpoint-select');
    const payloadSelect = document.getElementById('payload-select');
    const requestPayload = document.getElementById('request-payload');
    const sendRequestBtn = document.getElementById('send-request-btn');
    const latencyDisplay = document.getElementById('latency-display');
    
    const terminalOutput = document.getElementById('terminal-output');
    const clearConsoleBtn = document.getElementById('clear-console-btn');
    
    const requestCountEl = document.getElementById('request-count');
    const avgLatencyEl = document.getElementById('avg-latency');
    const successRateEl = document.getElementById('success-rate');

    // Hero AI Agentic elements
    const spawnAgentBtn = document.getElementById('spawn-agent-btn');
    const agentConsoleOutput = document.getElementById('agent-console-output');
    const consoleStatus = document.getElementById('console-status');

    // State Variables
    let requestCount = 1248;
    let successCount = 1247.75; // 99.98%
    let totalLatency = 1248 * 24; // 24ms average
    let isAgentRunning = false;

    // Mock payloads config
    const payloads = {
        default: `{
  "config_id": "8f6412c5",
  "environment": "production",
  "debug_mode": false,
  "options": {
    "cache_ttl": 300,
    "compress_response": true
  }
}`,
        'custom-query': `{
  "query": "SELECT * FROM gateway_metrics WHERE status = '200' LIMIT 50",
  "timestamp_gte": "2026-06-25T10:00:00Z",
  "aggregate": "avg_latency"
}`,
        empty: `{}`
    };

    // Helper: Log message to playground terminal simulator
    function logToTerminal(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = '$';
        
        line.appendChild(promptSpan);
        
        const textNode = document.createTextNode(` ${text}`);
        line.appendChild(textNode);
        
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Helper: Log message to Hero Agent Console simulator
    function logToAgentConsole(text, type = '') {
        const timestamp = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'timestamp';
        timeSpan.textContent = `[${timestamp}]`;
        
        line.appendChild(timeSpan);
        
        const contentSpan = document.createElement('span');
        contentSpan.innerHTML = text;
        line.appendChild(contentSpan);
        
        agentConsoleOutput.appendChild(line);
        agentConsoleOutput.scrollTop = agentConsoleOutput.scrollHeight;
    }

    // Initialize Lucide Icons for dynamically generated elements
    function refreshIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // ==========================================================================
    // AI AGENT LOOP SIMULATION
    // ==========================================================================
    if (spawnAgentBtn) {
        spawnAgentBtn.addEventListener('click', () => {
            if (isAgentRunning) return;
            isAgentRunning = true;

            // 1. UI Loading States
            spawnAgentBtn.disabled = true;
            spawnAgentBtn.innerHTML = '<i data-lucide="loader" class="rotating"></i> Running Loop...';
            consoleStatus.innerHTML = '<i data-lucide="loader" class="rotating text-cyan"></i> Agentic Process: Running...';
            refreshIcons();

            // Clear Console Output
            agentConsoleOutput.innerHTML = '';
            logToTerminal('Spawning new autonomous AI Agent loop...', 'system');

            // 2. Timed Simulation steps
            const simulationSteps = [
                {
                    delay: 0,
                    action: () => logToAgentConsole('<span class="text-bold text-yellow">Task Instantiated:</span> Verify local environment credentials, check authorization signatures, and query system stats.', 'system')
                },
                {
                    delay: 1000,
                    action: () => logToAgentConsole('<span class="text-purple">[REASONING]</span> Analyzing workspace structure to find environment variables.', 'system')
                },
                {
                    delay: 2000,
                    action: () => logToAgentConsole('<span class="text-cyan">[TOOL CALL]</span> <code class="text-bold">list_dir({ DirectoryPath: "/workspace/web-page" })</code>', 'system')
                },
                {
                    delay: 2800,
                    action: () => logToAgentConsole('<span class="text-green">[TOOL RESULT]</span> Found 4 files: <code>.env</code>, <code>index.html</code>, <code>style.css</code>, <code>app.js</code>', 'system')
                },
                {
                    delay: 3800,
                    action: () => logToAgentConsole('<span class="text-purple">[REASONING]</span> Located <code>.env</code> config file. Reading keys to inspect API credentials...', 'system')
                },
                {
                    delay: 4800,
                    action: () => logToAgentConsole('<span class="text-cyan">[TOOL CALL]</span> <code class="text-bold">read_file({ FilePath: ".env" })</code>', 'system')
                },
                {
                    delay: 5500,
                    action: () => logToAgentConsole('<span class="text-green">[TOOL RESULT]</span> Parsed successfully: <code>API_KEY=8f6412c5...ba7129</code>', 'system')
                },
                {
                    delay: 6500,
                    action: () => logToAgentConsole('<span class="text-purple">[REASONING]</span> Authenticating credentials against central devcore gateway API...', 'system')
                },
                {
                    delay: 7500,
                    action: () => logToAgentConsole('<span class="text-cyan">[TOOL CALL]</span> <code class="text-bold">fetch_url({ Url: "https://api.devcore.io/v1/auth/status" })</code>', 'system')
                },
                {
                    delay: 8200,
                    action: () => logToAgentConsole('<span class="text-green">[TOOL RESULT]</span> Response: <code>HTTP/1.1 200 OK</code>. Auth Token verified successfully.', 'system')
                },
                {
                    delay: 9200,
                    action: () => logToAgentConsole('<span class="text-purple">[REASONING]</span> System configuration verified. Completing workspace instantiation.', 'system')
                },
                {
                    delay: 10200,
                    action: () => {
                        logToAgentConsole('<span class="text-bold text-green">✔ Loop Completed:</span> AI Agent successfully verified config and authenticated gateway route.', 'success');
                        
                        // Re-enable and reset
                        isAgentRunning = false;
                        spawnAgentBtn.disabled = false;
                        spawnAgentBtn.innerHTML = '<i data-lucide="terminal"></i> Spawn AI Agent';
                        consoleStatus.innerHTML = '<i data-lucide="play"></i> Agentic Process: Idle';
                        refreshIcons();

                        logToTerminal('AI Agent completed workspace loop successfully.', 'success');
                        
                        // Increment Metrics slightly
                        requestCount += 2;
                        successCount += 2;
                        totalLatency += 114; // simulated loop latency sum
                        requestCountEl.textContent = requestCount.toLocaleString();
                        avgLatencyEl.textContent = `${Math.round(totalLatency / requestCount)}ms`;
                        successRateEl.textContent = `${((successCount / requestCount) * 100).toFixed(2)}%`;
                    }
                }
            ];

            // Trigger steps
            simulationSteps.forEach(step => {
                setTimeout(step.action, step.delay);
            });
        });
    }

    // ==========================================================================
    // API KEY CONFIGURATOR PANEL
    // ==========================================================================
    // 1. API Key Visibility Toggle
    toggleKeyVisibilityBtn.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            visibilityIcon.setAttribute('data-lucide', 'eye-off');
            logToTerminal('API key visibility set to visible.', 'system');
        } else {
            apiKeyInput.type = 'password';
            visibilityIcon.setAttribute('data-lucide', 'eye');
            logToTerminal('API key visibility set to hidden (masked).', 'system');
        }
        refreshIcons();
    });

    // 2. Copy API Key to Clipboard
    copyKeyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(apiKeyInput.value);
            copyIcon.setAttribute('data-lucide', 'check');
            logToTerminal('API key copied to system clipboard.', 'system');
            refreshIcons();
            
            setTimeout(() => {
                copyIcon.setAttribute('data-lucide', 'copy');
                refreshIcons();
            }, 2000);
        } catch (err) {
            logToTerminal('Failed to copy API key: ' + err.message, 'error');
        }
    });

    // 3. Verify Key Configuration
    verifyKeyBtn.addEventListener('click', () => {
        // Show loading state
        verifyKeyBtn.disabled = true;
        verificationStatus.innerHTML = '<span class="status-placeholder"><i class="logo-icon rotating" data-lucide="loader"></i> Verifying credentials...</span>';
        refreshIcons();
        logToTerminal('Initiating environment configuration check...', 'system');

        setTimeout(() => {
            const currentKey = apiKeyInput.value.trim();
            const expectedHash = '8f6412c5e3969942032522cb998eaa2c7112c73fc28f9ed2ef35c228b6ba7129';
            
            verifyKeyBtn.disabled = false;
            
            if (currentKey === expectedHash) {
                verificationStatus.innerHTML = `
                    <span class="status-verified">
                        <i data-lucide="check-circle-2"></i> Config Verified: Active
                    </span>
                `;
                logToTerminal('Success: API key successfully authenticated with core gateway server.', 'success');
                logToTerminal('Configuration details: AES-256 Validated, Endpoint Route Enabled.', 'success');
            } else if (currentKey.length === 0) {
                verificationStatus.innerHTML = `
                    <span class="status-failed">
                        <i data-lucide="alert-circle"></i> Verification Failed: Empty Key
                    </span>
                `;
                logToTerminal('Error: No API key found in the configuration payload.', 'error');
            } else {
                verificationStatus.innerHTML = `
                    <span class="status-failed">
                        <i data-lucide="alert-circle"></i> Verification Failed: Invalid Key
                    </span>
                `;
                logToTerminal('Error: Invalid API signature detected. Authentication Rejected.', 'error');
            }
            refreshIcons();
        }, 1200);
    });

    // ==========================================================================
    // REQUEST PLAYGROUND
    // ==========================================================================
    // 4. Payload Selection Changes
    payloadSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (payloads[val] !== undefined) {
            requestPayload.value = payloads[val];
            logToTerminal(`Loaded request payload profile: '${val}'`, 'system');
        }
    });

    // 5. Send Request Simulator
    sendRequestBtn.addEventListener('click', () => {
        const endpoint = endpointSelect.value;
        const bodyText = requestPayload.value;
        const apiKey = apiKeyInput.value.trim();

        // 1. UI Loading State
        sendRequestBtn.disabled = true;
        sendRequestBtn.innerHTML = '<i data-lucide="loader" class="rotating"></i> Sending...';
        latencyDisplay.innerHTML = 'Connecting...';
        refreshIcons();

        // 2. Terminal Log: Request Initiation
        const requestMethod = endpoint.startsWith('/api/v1/auth') || endpoint.startsWith('/api/v1/system') ? 'GET' : 'POST';
        logToTerminal(`${requestMethod} https://api.devcore.io${endpoint} - H 'Content-Type: application/json'`, 'system');
        
        // Mask token for security in logs
        const maskedToken = apiKey.length > 12 
            ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 8)}` 
            : '******';
        logToTerminal(`Authorization: Bearer ${maskedToken}`, 'system');

        // 3. Simulated network delay (80ms to 420ms)
        const delay = Math.floor(Math.random() * 340) + 80;

        setTimeout(() => {
            sendRequestBtn.disabled = false;
            sendRequestBtn.innerHTML = '<i data-lucide="send"></i> Send Request';
            refreshIcons();

            // Check Auth Validity
            const isAuthorized = apiKey === '8f6412c5e3969942032522cb998eaa2c7112c73fc28f9ed2ef35c228b6ba7129';
            
            // Format Latency response
            latencyDisplay.innerHTML = `Latency: <span class="latency-value">${delay}ms</span>`;

            if (!isAuthorized) {
                // Response: 401 Unauthorized
                const errResponse = {
                    status: 401,
                    statusText: "Unauthorized",
                    error: "Invalid API Credentials",
                    message: "The authorization bearer token provided is invalid or has expired.",
                    timestamp: new Date().toISOString()
                };
                
                logToTerminal(`HTTP/1.1 401 Unauthorized (${delay}ms)`, 'error');
                logToTerminal(JSON.stringify(errResponse, null, 2));
                
                // Metrics update (success rate dips)
                requestCount++;
                totalLatency += delay;
                const newSuccessRate = ((successCount / requestCount) * 100).toFixed(2);
                
                requestCountEl.textContent = requestCount.toLocaleString();
                avgLatencyEl.textContent = `${Math.round(totalLatency / requestCount)}ms`;
                successRateEl.textContent = `${newSuccessRate}%`;
                
                return;
            }

            // Response: 200 OK (Authorized Mock Data)
            let mockResponse = {};
            
            if (endpoint === '/api/v1/auth/status') {
                mockResponse = {
                    status: "authenticated",
                    scope: ["read", "write", "admin"],
                    user_id: "usr_dev_4231",
                    config_hash: "8f6412c5e3969942",
                    rate_limit: {
                        limit: 5000,
                        remaining: 4987,
                        reset_seconds: 3120
                    }
                };
            } else if (endpoint === '/api/v1/data/query') {
                let parsedBody = {};
                try { parsedBody = JSON.parse(bodyText); } catch(e) {}
                
                mockResponse = {
                    query_executed: parsedBody.query || "SELECT * FROM *",
                    execution_time_ms: (delay * 0.15).toFixed(1),
                    rows_returned: Math.floor(Math.random() * 80) + 12,
                    data: [
                        { id: 1, metric: "throughput", value: "98.2k/s", status: "optimal" },
                        { id: 2, metric: "cpu_utilization", value: "14.2%", status: "optimal" },
                        { id: 3, metric: "active_sockets", value: "482", status: "optimal" }
                    ]
                };
            } else if (endpoint === '/api/v1/crypto/encrypt') {
                mockResponse = {
                    algorithm: "AES-GCM-256",
                    key_derivation: "PBKDF2",
                    payload_encrypted: "U2FsdGVkX195y9Z5nCg2eXhQ8j7q7U...",
                    iv_vector: "1f2c3b4d5e6f",
                    checksum_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                };
            } else if (endpoint === '/api/v1/system/diagnostics') {
                mockResponse = {
                    gateway_status: "healthy",
                    version: "v1.24.8",
                    uptime_seconds: 1478200,
                    nodes: [
                        { name: "node-us-east-1", ping_ms: 12, active: true },
                        { name: "node-eu-west-1", ping_ms: 78, active: true }
                    ]
                };
            }

            const successObj = {
                status: 200,
                statusText: "OK",
                latency: `${delay}ms`,
                response: mockResponse
            };

            logToTerminal(`HTTP/1.1 200 OK (${delay}ms)`, 'success');
            logToTerminal(JSON.stringify(successObj, null, 2));

            // Metrics Update (Successful)
            requestCount++;
            successCount++;
            totalLatency += delay;
            
            const newSuccessRate = ((successCount / requestCount) * 100).toFixed(2);
            
            requestCountEl.textContent = requestCount.toLocaleString();
            avgLatencyEl.textContent = `${Math.round(totalLatency / requestCount)}ms`;
            successRateEl.textContent = `${newSuccessRate}%`;

        }, delay);
    });

    // 6. Clear Console/Terminal output
    clearConsoleBtn.addEventListener('click', () => {
        terminalOutput.innerHTML = '<div class="terminal-line system"><span class="prompt">$</span> console output cleared.</div>';
    });
});
