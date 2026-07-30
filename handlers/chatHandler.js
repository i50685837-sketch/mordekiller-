const settings = require("../config/settings");

module.exports = async function chatHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        const from = m.key.remoteJid;

        // Ignore bot messages
        if (m.key.fromMe) return;

        const text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            "";

        if (!text) return;

        const message = text.toLowerCase();

        console.log(`💬 Chat: ${from} -> ${text}`);


        // Simple auto replies
        if (message === "hi" || message === "hello") {

            await sock.sendMessage(from, {
                text:
`👋 Hello!

I'm *MordeKiller* 🤖

Type:
.menu
for available commands.`
            });

        }


        if (message.includes("how are you")) {

            await sock.sendMessage(from, {
                text:
`🤖 I'm running perfectly!

MordeKiller system:
✅ Online
✅ Ready
✅ Waiting for commands`
            });

        }


        // AI chat trigger
        if (message.startsWith("ai ")) {

            const question = text.slice(3);

            await sock.sendMessage(from, {
                text:
`🤖 *MordeKiller AI*

Your question:
${question}

AI connection is not configured yet.`
            });

        }

    } catch (error) {
        console.error("Chat Handler Error:", error);
    }
};
