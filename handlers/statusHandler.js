const settings = require("../config/settings");

module.exports = function statusHandler(sock) {

    sock.ev.on("messages.upsert", async (msg) => {
        try {

            const message = msg.messages[0];

            if (!message || !message.key) return;

            // Detect WhatsApp Status updates
            if (message.key.remoteJid === "status@broadcast") {

                console.log("📢 New WhatsApp Status detected");

                const statusOwner = message.key.participant;

                console.log(
                    `👤 Status from: ${statusOwner}`
                );

                // Auto view status (if enabled)
                if (settings.autoRead) {
                    await sock.readMessages([
                        message.key
                    ]);

                    console.log("👀 Status viewed");
                }

            }

        } catch (error) {
            console.error("Status Handler Error:", error);
        }
    });

    console.log("✅ Status Handler Loaded");
};
