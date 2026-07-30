module.exports = async function adminMiddleware(sock, msg) {
    try {

        if (!msg || !msg.key) {
            return {
                success: false,
                message: "Invalid message."
            };
        }

        const jid = msg.key.remoteJid;

        // Group only
        if (!jid.endsWith("@g.us")) {
            return {
                success: false,
                message: "❌ This command can only be used in groups."
            };
        }

        const sender = (
            msg.key.participant ||
            msg.key.remoteJid
        ).split(":")[0];

        const metadata = await sock.groupMetadata(jid);

        const admins = metadata.participants
            .filter(member => member.admin)
            .map(member => member.id.split(":")[0]);

        const botId = sock.user.id.split(":")[0];

        const isAdmin = admins.includes(sender);
        const isBotAdmin = admins.includes(botId);

        if (!isAdmin) {
            return {
                success: false,
                message: "❌ You must be a group admin."
            };
        }

        if (!isBotAdmin) {
            return {
                success: false,
                message: "❌ I must be a group admin to perform this action."
            };
        }

        return {
            success: true,
            isAdmin: true,
            isBotAdmin: true
        };

    } catch (error) {

        console.error(
            "Admin Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Failed to verify admin permissions."
        };
    }
};
