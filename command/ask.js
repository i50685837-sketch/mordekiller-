module.exports = {
    name: "ask",
    aliases: ["question", "q"],
    category: "AI",
    description: "Ask MordeKiller AI anything",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const question = args.join(" ");

            if (!question) {
                return await sock.sendMessage(from, {
                    text: `🤖 *MordeKiller AI*

Please ask a question.

Example:
.ask What is JavaScript?
.ask Who created WhatsApp?
.ask Explain APIs`
                });
            }

            // Placeholder until AI API is connected
            const answer = `🤖 *MordeKiller AI*

❓ Question:
${question}

💡 Answer:
Your AI provider is not configured yet.

Connect an AI API (such as OpenAI, Gemini, or another supported service) to receive real answers.`;

            await sock.sendMessage(from, {
                text: answer
            });

        } catch (error) {
            console.error("Ask Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Unable to process your question."
            });
        }
    }
};
