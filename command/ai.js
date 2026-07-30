const axios = require("axios");

module.exports = {
    name: "ai",
    aliases: ["chat", "ask"],
    category: "AI",
    description: "Chat with MordeKiller AI",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const text = args.join(" ");

            if (!text) {
                return await sock.sendMessage(from, {
                    text: "🤖 *MordeKiller AI*\n\nUsage:\n.ai <your question>\n\nExample:\n.ai What is Node.js?"
                });
            }

            // Placeholder response
            // Replace this section with your preferred AI API.
            const reply = `🤖 *MordeKiller AI*\n\nYou asked:\n"${text}"\n\nAI integration is not configured yet. Add your AI API in this command to receive real responses.`;

            await sock.sendMessage(from, {
                text: reply
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ An error occurred while processing your request."
            });
        }
    }
};
