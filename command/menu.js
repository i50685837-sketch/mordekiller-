module.exports = {
    name: "aimenu",
    aliases: ["aihelp", "menuai"],
    category: "AI",
    description: "Display the AI commands menu",

    async execute(sock, msg) {
        try {
            const from = msg.key.remoteJid;

            const menu = `🤖 *MordeKiller AI Menu*

━━━━━━━━━━━━━━━━━━
🧠 AI COMMANDS
━━━━━━━━━━━━━━━━━━

💬 .ai <prompt>
💬 .chat <message>
❓ .ask <question>
💻 .code <prompt>
🖼️ .image <prompt>
🌍 .translate <lang> <text>
📄 .summarize <text>
✍️ .grammar <text>
📘 .explain <topic>
📝 .rewrite <text>
🧮 .math <expression>
📖 .story <topic>
🪶 .poem <topic>
🧠 .quiz <topic>

━━━━━━━━━━━━━━━━━━
📚 Examples
━━━━━━━━━━━━━━━━━━

.ai Tell me a joke
.chat Hello
.ask What is Node.js?
.code Create a login page
.image A futuristic city
.translate sw Hello
.summarize Long paragraph...
.grammar i likes coding
.explain API
.rewrite Improve this sentence
.math 45 + 55
.story A brave lion
.poem Friendship
.quiz Science

━━━━━━━━━━━━━━━━━━
🤖 MordeKiller AI
Version: 1.0.0
━━━━━━━━━━━━━━━━━━`;

            await sock.sendMessage(from, {
                text: menu
            });

        } catch (error) {
            console.error("AI Menu Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to display the AI menu."
            });
        }
    }
};
