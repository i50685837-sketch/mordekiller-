const db = require("../lib/database");

module.exports = async function auth(sock, msg) {
    try {

        if (!msg || !msg.key) {
            return {
                success: false,
                message: "Invalid message."
            };
        }

        const sender =
            msg.key.participant ||
            msg.key.remoteJid;

        // Load users
        const users = db.readDB("users.json");

        // Create user if not found
        if (!users[sender]) {

            users[sender] = {
                id: sender,
                name: msg.pushName || "Unknown",
                coins: 0,
                xp: 0,
                level: 1,
                premium: false,
                banned: false,
                registered: Date.now()
            };

            db.writeDB("users.json", users);
        }

        const user = users[sender];

        // Check if banned
        if (user.banned) {
            return {
                success: false,
                message: "❌ You are banned from using MordeKiller."
            };
        }

        return {
            success: true,
            user
        };

    } catch (error) {

        console.error(
            "Auth Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Authentication failed."
        };
    }
};
