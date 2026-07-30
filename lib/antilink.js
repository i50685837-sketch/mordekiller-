const db = require("../../lib/database");

module.exports = {
    name: "antilink",
    aliases: ["alink"],
    category: "Group",
    description: "Enable or disable anti-link protection",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return await sock.sendMessage(from, {
                    text: "❌ This command can only be used in groups."
                });
            }

            const option = (args[0] || "").toLowerCase();

            if (!["on", "off"].includes(option)) {
                return await sock.sendMessage(from, {
                    text: `🛡️ *Anti-Link*

Usage:
.antilink on
.antilink off`
                });
            }

            const groups = db.readDB("groups.json");

            if (!groups[from]) {
                groups[from] = {};
            }

            groups[from].antiLink = option === "on";

            db.writeDB("groups.json", groups);

            await sock.sendMessage(from, {
                text: `✅ Anti-Link has been *${option.toUpperCase()}*.`
            });

        } catch (error) {
            console.error("AntiLink Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to update Anti-Link settings."
            });
        }
    }
};
