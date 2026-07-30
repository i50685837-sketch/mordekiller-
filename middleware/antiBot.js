const db = require("../lib/database");

module.exports = async function antiBot(sock, msg) {
    try {

        if (!msg || !msg.message) return;

        const jid = msg.key.remoteJid;

        // Groups only
        if (!jid.endsWith("@g.us")) return;

        const groups = db.readDB("groups.json");

        // Check if AntiBot is enabled
        if (!groups[jid] || !groups[jid].antiBot) {
            return;
        }

        const sender =
            msg.key.participant || msg.key.remoteJid;

        // Ignore bot's own messages
        if (msg.key.fromMe) return;

        // Check if sender is another WhatsApp bot/business account
        const isBot =
            sender.includes("lid") ||
            sender.includes("bot") ||
            sender.endsWith("@newsletter");

        if (!isBot) return;

        const metadata = await sock.groupMetadata(jid);

        const botIsAdmin = metadata.participants.some(
            p => p.id === sock.user.id && p.admin
        );

        if (!botIsAdmin) return;

        // Remove detected bot account
        await sock.groupParticipantsUpdate(
            jid,
            [sender],
            "remove"
        );

        await sock.sendMessage(jid, {
            text:
`🤖 *Anti-Bot Protection*

A bot account has been removed automatically.

👤 Removed:
@${sender.split("@")[0]}`,
            mentions: [sender]
        });

        console.log(
            `🤖 Removed bot: ${sender}`
        );

    } catch (error) {
        console.error(
            "AntiBot Middleware Error:",
            error
        );
    }
};
