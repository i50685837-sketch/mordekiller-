module.exports = {
    name: "code",
    aliases: ["generate", "coding"],
    category: "AI",
    description: "Generate or explain code",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const prompt = args.join(" ");

            if (!prompt) {
                return await sock.sendMessage(from, {
                    text: `💻 *MordeKiller Code AI*

Usage:
.code <what you want>

Examples:
.code Create a JavaScript calculator
.code Python login system
.code Explain async await
.code HTML portfolio page`
                });
            }

            // Placeholder until AI API is connected
            const response = `💻 *MordeKiller Code AI*

📝 Request:
${prompt}

⚠️ Code generation is not configured yet.

Connect an AI API (such as OpenAI, Gemini, or another compatible service) to generate code automatically.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Code Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to generate code."
            });
        }
    }
};
