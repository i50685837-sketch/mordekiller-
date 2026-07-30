const db = require("../lib/database");

module.exports = async function antiLink(sock, msg) {
    try {

        if (!msg || !msg.message) return;

        const jid = msg.key.remoteJid;

        // Groups only
        if (!jid.endsWith("@g.us")) return;

        const groups = db.readDB("groups.json");

        // Check if anti-link is enabled
        if (!groups[jid] || !groups[jid].antiLink) {
            return;
        }

        const sender =
            msg.key.participant || msg.key.remoteJid;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text) return;

        // Detect common links
        const linkRegex =
            /(https?:\/\/|www\.|chat\.whatsapp\.com\/|wa\.me\/)/i;

        if (!linkRegex.test(text)) {
            return;
        }

        const metadata = await sock.groupMetadata(jid);

        const admins = metadata.participants
            .filter(p => p.admin)
            .map(p => p.id);

        // Ignore group admins
        if (admins.includes(sender)) {
            return;
        }

        // Delete the message
        await sock.sendMessage(jid, {
            delete: msg.key
        });

        // Warn the user
        await sock.sendMessage(jid, {
            text:
`🚫 *Anti-Link*

@${sender.split("@")[0]}

Links are not allowed in this group.`,
            mentions: [sender]
        });

        console.log(
            `🚫 Link removed from ${sender}`
        );

    } catch (error) {
        console.error(
            "AntiLink Middleware Error:",
            error
        );
    }
};
