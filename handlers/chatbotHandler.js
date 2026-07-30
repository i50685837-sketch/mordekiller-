const config = require("../config/config");

module.exports = async function chatBotHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        // Ignore bot messages
        if (m.key.fromMe) return;

        const from = m.key.remoteJid;

        const text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            "";

        if (!text) return;

        const message = text.toLowerCase();

        console.log(`🤖 ChatBot: ${message}`);


        // Greeting replies
        const greetings = [
            "hi",
            "hello",
            "hey",
            "hallo"
        ];

        if (greetings.includes(message)) {
            await sock.sendMessage(from, {
                text:
`👋 Hello!

I'm *${config.botName}* 🤖

How can I help you today?

Type:
.menu
to see my features.`
            });

            return;
        }


        // Bot identity
        if (
            message.includes("who are you") ||
            message.includes("what are you")
        ) {
            await sock.sendMessage(from, {
                text:
`🤖 I am *${config.botName}*

An advanced WhatsApp automation bot powered by Node.js and Baileys.`
            });

            return;
        }


        // Help keywords
        if (message.includes("help")) {
            await sock.sendMessage(from, {
                text:
`🆘 *MordeKiller Help*

Commands:
.menu
.ai
.chat
.download
.games

Need more help? Ask me.`
            });

            return;
        }


        // Simple AI fallback
        if (message.endsWith("?")) {
            await sock.sendMessage(from, {
                text:
`🤖 *MordeKiller AI*

I received your question:

"${text}"

AI engine is ready for API integration.`
            });
        }


    } catch (error) {
        console.error("ChatBot Handler Error:", error);
    }
};
