module.exports = {
    name: "goodbye",
    description: "Send goodbye messages when members leave a group",

    async execute(sock, update) {
        try {
            const { id, participants, action } = update;

            // Only process members leaving
            if (!id || action !== "remove") return;

            const metadata = await sock.groupMetadata(id);
            const groupName = metadata.subject;

            for (const user of participants) {

                await sock.sendMessage(id, {
                    text:
`👋 *Goodbye!*

@${user.split("@")[0]} has left *${groupName}*.

💙 Thank you for being part of our community.

We wish you all the best!

🤖 Powered by *MordeKiller*`,
                    mentions: [user]
                });

            }

        } catch (error) {
            console.error("Goodbye Plugin Error:", error);
        }
    }
};
