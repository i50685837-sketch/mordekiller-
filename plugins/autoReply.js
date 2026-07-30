module.exports = {
    name: "autoreply",
    description: "Automatic reply plugin",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;
            if (msg.key.fromMe) return;

            const from = msg.key.remoteJid;

            const text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                "";

            if (!text) return;

            const message = text.toLowerCase().trim();

            const replies = {
                "hi": "👋 Hello! Welcome to *MordeKiller*.",
                "hello": "😊 Hi there! How can I help you today?",
                "hey": "🙌 Hey! Type *.menu* to see my commands.",
                "good morning": "🌅 Good morning! Have a wonderful day.",
                "good afternoon": "☀️ Good afternoon!",
                "good evening": "🌙 Good evening!",
                "bye": "👋 Goodbye! See you again.",
                "thanks": "❤️ You're welcome!",
                "thank you": "😊 Happy to help!",
                "menu": "📜 Type *.menu* to open the command menu.",
                "owner": "👑 My owner is Morde."
            };

            if (replies[message]) {
                await sock.sendMessage(from, {
                    text: replies[message]
                });
            }

        } catch (error) {
            console.error("AutoReply Plugin Error:", error);
        }
    }
};
