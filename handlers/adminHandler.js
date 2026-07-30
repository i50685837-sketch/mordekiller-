const owner = require("../config/owner");

module.exports = async function adminHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        const from = m.key.remoteJid;
        const sender = m.key.participant || from;

        // Check if private chat
        const isGroup = from.endsWith("@g.us");

        let isAdmin = false;

        if (isGroup) {
            const metadata = await sock.groupMetadata(from);

            const admins = metadata.participants
                .filter(p => p.admin)
                .map(p => p.id);

            isAdmin = admins.includes(sender);
        }

        const isOwner = owner.number + "@s.whatsapp.net" === sender;

        return {
            isAdmin,
            isOwner,
            isAuthorized: isAdmin || isOwner
        };

    } catch (error) {
        console.error("Admin Handler Error:", error);

        return {
            isAdmin: false,
            isOwner: false,
            isAuthorized: false
        };
    }
};
