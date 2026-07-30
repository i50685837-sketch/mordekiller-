module.exports = {
    name: "autolock",
    description: "Automatically lock groups at a scheduled time",

    // Runs periodically (for example, every minute from a scheduler)
    async execute(sock) {
        try {
            const now = new Date();

            // Lock every day at 10:00 PM
            const lockHour = 22;
            const lockMinute = 0;

            if (
                now.getHours() !== lockHour ||
                now.getMinutes() !== lockMinute
            ) {
                return;
            }

            // TODO: Replace with your database
            const groups = [];

            for (const jid of groups) {

                try {

                    await sock.groupSettingUpdate(
                        jid,
                        "announcement"
                    );

                    await sock.sendMessage(jid, {
                        text:
`🔒 *Group Locked*

Only admins can send messages.

🤖 Locked automatically by *MordeKiller*.`
                    });

                    console.log(`🔒 Locked ${jid}`);

                } catch (err) {
                    console.error(
                        `Failed to lock ${jid}:`,
                        err.message
                    );
                }
            }

        } catch (error) {
            console.error(
                "AutoLock Plugin Error:",
                error
            );
        }
    }
};
