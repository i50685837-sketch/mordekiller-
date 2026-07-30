module.exports = {
    name: "welcome",
    description: "Send welcome messages when new members join",

    async execute(sock, update) {
        try {
            const { id, participants, action } = update;

            if (!id || action !== "add") return;

            const metadata = await sock.groupMetadata(id);
            const groupName = metadata.subject;

            for (const user of participants) {

                await sock.sendMessage(id, {
                    text:
`🎉 *Welcome to ${groupName}!*

👋 Hello @${user.split("@")[0]},

We're happy to have you here! 😊

📜 Please:
• Read the group rules
• Be respectful
• Enjoy the community

🤖 Powered by *MordeKiller*`,
                    mentions: [user]
                });

            }

        } catch (error) {
            console.error("Welcome Plugin Error:", error);
        }
    }
};
