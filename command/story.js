module.exports = {
    name: "story",
    aliases: ["storytime", "tale"],
    category: "AI",
    description: "Generate stories from any topic",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const topic = args.join(" ");

            if (!topic) {
                return await sock.sendMessage(from, {
                    text: `📖 *MordeKiller Story AI*

Usage:
.story <topic>

Examples:
.story A brave warrior
.story A hacker who saved the world
.story A magical forest
.story Space adventure
.story Success through hard work`
                });
            }

            // Placeholder until AI API is connected
            const response = `📖 *MordeKiller Story AI*

📚 Topic:
${topic}

📝 Story:
Story generation is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to generate original stories with different genres, lengths, and writing styles.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Story Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to generate the story."
            });
        }
    }
};
