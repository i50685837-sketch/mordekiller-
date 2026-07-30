const { DisconnectReason } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");

/**
 * Register Baileys event listeners
 * @param {object} sock - WhatsApp socket
 * @param {Function} restartBot - Function to restart the bot
 */
module.exports = function eventHandler(sock, restartBot) {

    // Connection events
    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

        if (connection === "connecting") {
            console.log("🔄 Connecting to WhatsApp...");
        }

        if (connection === "open") {
            console.clear();
            console.log("==================================");
            console.log("🤖 MordeKiller Connected");
            console.log("✅ Bot is Online");
            console.log("==================================");
        }

        if (connection === "close") {

            const statusCode =
                lastDisconnect?.error instanceof Boom
                    ? lastDisconnect.error.output.statusCode
                    : 0;

            console.log(`❌ Connection Closed (${statusCode})`);

            switch (statusCode) {

                case DisconnectReason.loggedOut:
                    console.log("⚠️ Logged out. Scan a new QR or pairing code.");
                    break;

                case DisconnectReason.connectionClosed:
                case DisconnectReason.connectionLost:
                case DisconnectReason.restartRequired:
                case DisconnectReason.timedOut:
                    console.log("🔄 Reconnecting...");
                    if (typeof restartBot === "function") {
                        restartBot();
                    }
                    break;

                default:
                    console.log("🔄 Attempting reconnect...");
                    if (typeof restartBot === "function") {
                        restartBot();
                    }
                    break;
            }
        }
    });

    // Save credentials automatically
    sock.ev.on("creds.update", () => {
        console.log("💾 Credentials Updated");
    });

    // Group updates
    sock.ev.on("groups.update", updates => {
        console.log("👥 Group Updated");
    });

    // Group participants
    sock.ev.on("group-participants.update", update => {
        console.log("👤 Group Participant Event:", update.action);
    });

    // Incoming calls
    sock.ev.on("call", calls => {
        console.log("📞 Incoming Call");
    });

    // Message receipts
    sock.ev.on("message-receipt.update", receipts => {
        console.log("📨 Message Receipt Updated");
    });

    console.log("✅ Event Handler Loaded");
};
