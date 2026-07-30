const db = require("../lib/database");

module.exports = {
    name: "autounlock",
    description: "Automatically unlock groups at a scheduled time",

    async execute(sock) {
        try {
            const now = new Date();

            // Unlock time (07:00 AM)
            const unlockHour = 7;
            const unlockMinute = 0;

            if (
                now.getHours() !== unlockHour ||
                now.getMinutes() !== unlockMinute
            ) {
                return;
            }

            // Load groups from database
            const groups = db.readDB("groups.json");

            for (const jid of Object.keys(groups)) {

                // Only unlock groups with autoUnlock enabled
                if (!groups[jid].autoUnlock) continue;

                try {

                    await sock.groupSettingUpdate(
                        jid,
                        "not_announcement"
                    );

                    await sock.sendMessage(jid, {
                        text:
`🔓 *Group Unlocked*

Members can now send messages again.

🤖 Automatically unlocked by *MordeKiller*.`
                    });

                    console.log(`🔓 Unlocked: ${jid}`);

                } catch (err) {

                    console.error(
                        `Failed to unlock ${jid}:`,
                        err.message
                    );

                }
            }

        } catch (error) {
            console.error(
                "AutoUnlock Plugin Error:",
                error
            );
        }
    }
};
