const settings = require("../config/settings");

module.exports = {
    name: "autotype",
    description: "Automatically show typing indicator before replying",

    async execute(sock, msg) {
        try {
            // Check if AutoType is enabled
            if (!settings.autoType) return;

            if (!msg || !msg.key) return;

            // Ignore bot's own messages
            if (msg.key.fromMe) return;

            const jid = msg.key.remoteJid;

            // Show typing presence
            await sock.sendPresenceUpdate(
                "composing",
                jid
            );

            // Typing delay
            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );

            // Stop typing
            await sock.sendPresenceUpdate(
                "available",
                jid
            );

            console.log(
                `⌨️ AutoType: ${jid}`
            );

        } catch (error) {
            console.error(
                "AutoType Plugin Error:",
                error
            );
        }
    }
};
