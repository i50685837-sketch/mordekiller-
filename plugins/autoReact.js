module.exports = {
    name: "autoreact",
    description: "Automatically react to incoming messages",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;
            if (msg.key.fromMe) return;

            const reactions = [
                "👍",
                "❤️",
                "🔥",
                "😂",
                "😊",
                "😎",
                "🎉",
                "⚡",
                "💯",
                "🤖"
            ];

            const emoji =
                reactions[Math.floor(Math.random() * reactions.length)];

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    react: {
                        text: emoji,
                        key: msg.key
                    }
                }
            );

        } catch (error) {
            console.error("AutoReact Plugin Error:", error);
        }
    }
};
