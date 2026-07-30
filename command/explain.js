module.exports = {
    name: "explain",
    aliases: ["exp", "whatis"],
    category: "AI",
    description: "Explain any topic in simple language",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const topic = args.join(" ");

            if (!topic) {
                return await sock.sendMessage(from, {
                    text: `📘 *MordeKiller Explain AI*

Usage:
.explain <topic>

Examples:
.explain JavaScript
.explain Artificial Intelligence
.explain Blockchain
.explain API
.explain Quantum Computing`
                });
            }

            // Placeholder until AI API is connected
            const response = `📘 *MordeKiller Explain AI*

📚 Topic:
${topic}

💡 Explanation:
Explanation service is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to receive detailed explanations with examples.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Explain Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to explain the requested topic."
            });
        }
    }
};
