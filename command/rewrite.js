module.exports = {
    name: "rewrite",
    aliases: ["rw", "improve", "paraphrase"],
    category: "AI",
    description: "Rewrite or improve text",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const text = args.join(" ");

            if (!text) {
                return await sock.sendMessage(from, {
                    text: `📝 *MordeKiller Rewrite AI*

Usage:
.rewrite <text>

Examples:
.rewrite I wants to become a software engineer.
.improve This message sounds unprofessional.
.paraphrase Learning to code is fun.`
                });
            }

            // Placeholder until AI API is connected
            const response = `📝 *MordeKiller Rewrite AI*

📄 Original:
${text}

✨ Rewritten:
Rewrite service is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to rewrite, paraphrase, simplify, expand, or make text more professional.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Rewrite Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to rewrite the text."
            });
        }
    }
};
