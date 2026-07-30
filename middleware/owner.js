const owner = require("../config/owner");

module.exports = async function ownerMiddleware(sock, msg) {
    try {

        if (!msg || !msg.key) {
            return {
                success: false,
                message: "Invalid message."
            };
        }

        const sender = (
            msg.key.participant ||
            msg.key.remoteJid
        ).split(":")[0];

        const ownerNumber = owner.number
            .replace(/\D/g, "") + "@s.whatsapp.net";

        const isOwner = sender === ownerNumber;

        if (!isOwner) {
            return {
                success: false,
                message: "❌ This command is for the bot owner only."
            };
        }

        return {
            success: true,
            isOwner: true
        };

    } catch (error) {

        console.error(
            "Owner Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Owner verification failed."
        };
    }
};
