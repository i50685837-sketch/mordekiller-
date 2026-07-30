module.exports = {
    name: "summarize",
    aliases: ["summary", "sum"],
    category: "AI",
    description: "Summarize long text",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const text = args.join(" ");

            if (!text) {
                return await sock.sendMessage(from, {
                    text: `📄 *MordeKiller Summarizer*

Usage:
.summarize <text>

Examples:
.summarize JavaScript is a programming language used to build websites and applications...

.summary Artificial Intelligence is transforming many industries...

.sum Paste a long paragraph here...`
                });
            }

            // Placeholder summary
            const summary = text.length > 150
                ? text.substring(0, 150) + "..."
                : text;

            const response = `📄 *MordeKiller Summary*

📝 Original Length: ${text.length} characters

📌 Summary:
${summary}

⚠️ AI summarization is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) for intelligent summaries.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Summarize Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to summarize the text."
            });
        }
    }
};
