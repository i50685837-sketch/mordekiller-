const settings = require("../config/settings");
const owner = require("../config/owner");

module.exports = async function maintenance(sock, msg) {
    try {

        // Maintenance mode disabled
        if (!settings.maintenance) {
            return {
                success: true
            };
        }

        const sender =
            (msg.key.participant ||
            msg.key.remoteJid).split(":")[0];

        const ownerJid =
            owner.number.replace(/\D/g, "") +
            "@s.whatsapp.net";

        // Allow owner to bypass maintenance mode
        if (sender === ownerJid) {
            return {
                success: true,
                owner: true
            };
        }

        return {
            success: false,
            message:
`🚧 *MordeKiller is under maintenance.*

Please try again later.

Thank you for your patience. 🙏`
        };

    } catch (error) {

        console.error(
            "Maintenance Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Maintenance check failed."
        };
    }
};
