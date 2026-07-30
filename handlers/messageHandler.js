const { handleCommand } = require("./commandHandler");
const settings = require("../config/settings");

module.exports = async function messageHandler(sock, msg) {
    try {
        if (!msg.messages || !msg.messages.length) return;

        const m = msg.messages[0];

        // Ignore empty messages
        if (!m.message) return;

        // Ignore status updates
        if (m.key.remoteJid === "status@broadcast") return;

        // Ignore messages sent by the bot itself
        if (m.key.fromMe) return;

        const from = m.key.remoteJid;

        // Auto Read
        if (settings.autoRead) {
            await sock.readMessages([m.key]);
        }

        // Auto Typing
        if (settings.autoTyping) {
            await sock.sendPresenceUpdate("composing", from);
        }

        // Auto Recording
        if (settings.autoRecording) {
            await sock.sendPresenceUpdate("recording", from);
        }

        // Get message text
        const body =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            m.message.imageMessage?.caption ||
            m.message.videoMessage?.caption ||
            "";

        console.log(
            `[MESSAGE] ${from} : ${body || "[Non-text message]"}`
        );

        // Handle commands
        await handleCommand(sock, m);

    } catch (error) {
        console.error("Message Handler Error:", error);
    }
};
