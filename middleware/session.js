const fs = require("fs");
const path = require("path");

module.exports = async function session(sock) {
    try {

        const sessionPath = path.join(
            __dirname,
            "../session/creds.json"
        );

        const exists = fs.existsSync(sessionPath);

        if (!exists) {
            console.log("⚠️ No session found.");

            return {
                success: false,
                paired: false,
                message: "Session not found."
            };
        }

        const stats = fs.statSync(sessionPath);

        if (stats.size === 0) {
            console.log("⚠️ Empty session file.");

            return {
                success: false,
                paired: false,
                message: "Invalid session."
            };
        }

        console.log("✅ WhatsApp session loaded.");

        return {
            success: true,
            paired: true,
            session: sessionPath
        };

    } catch (error) {

        console.error(
            "Session Middleware Error:",
            error
        );

        return {
            success: false,
            paired: false,
            message: "Session validation failed."
        };
    }
};
