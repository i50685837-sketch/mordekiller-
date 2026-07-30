module.exports = {
    name: "poem",
    aliases: ["poetry", "verse"],
    category: "AI",
    description: "Generate poems from a topic",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const topic = args.join(" ");

            if (!topic) {
                return await sock.sendMessage(from, {
                    text: `🪶 *MordeKiller Poem AI*

Usage:
.poem <topic>

Examples:
.poem Love
.poem Friendship
.poem Nature
.poem Success
.poem Coding`
                });
            }

            // Placeholder until AI API is connected
            const response = `🪶 *MordeKiller Poem AI*

📝 Topic:
${topic}

📜 Poem:
Poem generation is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to generate original poems in different styles and lengths.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Poem Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to generate the poem."
            });
        }
    }
};
