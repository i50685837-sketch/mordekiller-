module.exports = {
    name: "grammar",
    aliases: ["gram", "correct", "fix"],
    category: "AI",
    description: "Correct grammar and improve text",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const text = args.join(" ");

            if (!text) {
                return await sock.sendMessage(from, {
                    text: `✍️ *MordeKiller Grammar AI*

Usage:
.grammar <text>

Examples:
.grammar i am going to school tomorrow
.correct he don't like coding
.fix this sentence need grammar correction`
                });
            }

            // Placeholder until AI API is connected
            const response = `✍️ *MordeKiller Grammar AI*

📝 Original:
${text}

✅ Corrected:
Grammar correction is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to automatically correct grammar, punctuation, and spelling.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Grammar Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to check grammar."
            });
        }
    }
};
