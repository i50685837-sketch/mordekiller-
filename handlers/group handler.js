const settings = require("../config/settings");

module.exports = async function groupHandler(sock, update) {
    try {
        const { id, participants, action } = update;

        // Ignore invalid events
        if (!id || !participants) return;

        for (const user of participants) {

            // Welcome Message
            if (action === "add" && settings.welcome) {
                await sock.sendMessage(id, {
                    text:
`👋 Welcome!

@${user.split("@")[0]}

🎉 Welcome to the group.
Please read the group rules and enjoy your stay!

🤖 Powered by MordeKiller`,
                    mentions: [user]
                });
            }

            // Goodbye Message
            if (action === "remove" && settings.goodbye) {
                await sock.sendMessage(id, {
                    text:
`👋 Goodbye!

@${user.split("@")[0]}

We hope to see you again.

🤖 MordeKiller`,
                    mentions: [user]
                });
            }

            // Promote
            if (action === "promote") {
                await sock.sendMessage(id, {
                    text:
`🎉 Congratulations!

@${user.split("@")[0]} has been promoted to *Group Admin*. 👑`,
                    mentions: [user]
                });
            }

            // Demote
            if (action === "demote") {
                await sock.sendMessage(id, {
                    text:
`⚠️ Notice

@${user.split("@")[0]} is no longer a *Group Admin*.`,
                    mentions: [user]
                });
            }
        }

    } catch (error) {
        console.error("Group Handler Error:", error);
    }
};
