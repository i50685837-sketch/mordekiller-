module.exports = {
    name: "autoviewstatus",
    description: "Automatically view WhatsApp Status updates",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;

            // Only process WhatsApp Status
            if (msg.key.remoteJid !== "status@broadcast") return;

            // Mark the status as viewed
            await sock.readMessages([
                msg.key
            ]);

            console.log(
                `👀 Viewed status from ${
                    msg.key.participant || "Unknown"
                }`
            );

        } catch (error) {
            console.error(
                "AutoViewStatus Plugin Error:",
                error
            );
        }
    }
};
