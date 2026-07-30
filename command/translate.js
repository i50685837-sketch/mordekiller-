module.exports = {
    name: "translate",
    aliases: ["tr", "trans"],
    category: "AI",
    description: "Translate text into another language",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;

            if (args.length < 2) {
                return await sock.sendMessage(from, {
                    text: `🌍 *MordeKiller Translator*

Usage:
.translate <language> <text>

Examples:
.translate sw Hello, how are you?
.translate en Habari yako?
.translate fr Good morning
.translate es I love programming`
                });
            }

            const language = args[0];
            const text = args.slice(1).join(" ");

            // Placeholder until translation API is connected
            const translatedText = `🌍 *MordeKiller Translator*

📝 Original:
${text}

🌐 Target Language:
${language}

⚠️ Translation service is not configured yet.

Connect a translation API (such as Google Cloud Translation, Microsoft Translator, or another compatible provider) to receive real translations.`;

            await sock.sendMessage(from, {
                text: translatedText
            });

        } catch (error) {
            console.error("Translate Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to translate the text."
            });
        }
    }
};
