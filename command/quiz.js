module.exports = {
    name: "quiz",
    aliases: ["trivia", "question"],
    category: "AI",
    description: "Generate quiz questions",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const topic = args.join(" ");

            if (!topic) {
                return await sock.sendMessage(from, {
                    text: `🧠 *MordeKiller Quiz AI*

Usage:
.quiz <topic>

Examples:
.quiz JavaScript
.quiz Geography
.quiz Football
.quiz Science
.quiz History`
                });
            }

            // Placeholder until AI API is connected
            const response = `🧠 *MordeKiller Quiz AI*

📚 Topic:
${topic}

❓ Quiz:
Quiz generation is not configured yet.

Connect an AI service (such as OpenAI, Gemini, or another compatible provider) to automatically generate multiple-choice questions, true/false questions, and short-answer quizzes with correct answers and explanations.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Quiz Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to generate the quiz."
            });
        }
    }
};
