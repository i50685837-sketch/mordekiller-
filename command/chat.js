module.exports = {
    name: "chat",
    aliases: ["c", "talk"],
    category: "AI",
    description: "Chat with MordeKiller AI",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const prompt = args.join(" ");

            if (!prompt) {
                return await sock.sendMessage(from, {
                    text:
`🤖 *MordeKiller Chat*

Usage:
.chat <message>

Example:
.chat Hello, how are you?`
                });
            }

            // TODO: Replace this with your AI provider.
            const response =
`🤖 *MordeKiller AI*

💬 You: ${prompt}

🤖 AI:
AI chat is not configured yet.
Connect your preferred AI API to enable real conversations.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Chat Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to process your message."
            });
        }
    }
};
