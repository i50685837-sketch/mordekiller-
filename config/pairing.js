module.exports = {

    // Enable Pairing Code Login
    enabled: true,

    // Phone Number (Country Code Required)
    phoneNumber: "2547XXXXXXXX",

    // Use Pairing Code Instead of QR
    usePairingCode: true,

    // Session Folder
    sessionPath: "./session",

    // Display Pairing Code
    showPairingCode: true,

    // Automatically Request Pairing Code
    autoRequest: true,

    // Retry if Pairing Fails
    maxRetries: 3,

    // Delay Before Retry (Milliseconds)
    retryDelay: 5000,

    // Print Connection Logs
    debug: true

};
