const db = require("../lib/database");

module.exports = async function banMiddleware(sock, msg) {
    try {

        if (!msg || !msg.key) {
            return {
                success: false,
                message: "Invalid message."
            };
        }

        const sender =
            (msg.key.participant ||
            msg.key.remoteJid).split(":")[0];

        const bans = db.readDB("bans.json");

        if (bans[sender]) {
            return {
                success: false,
                message:
`🚫 *Access Denied*

You have been banned from using *MordeKiller*.

If you believe this is a mistake, please contact the bot owner.`
            };
        }

        return {
            success: true
        };

    } catch (error) {

        console.error(
            "Ban Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Ban verification failed."
        };
    }
};
