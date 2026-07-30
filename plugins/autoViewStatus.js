module.exports = {
    name: "autolikestatus",
    description: "Automatically react to WhatsApp Status",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;

            // Only handle Status updates
            if (msg.key.remoteJid !== "status@broadcast") return;

            const emojis = [
                "❤️",
                "👍",
                "🔥",
                "😍",
                "🥳",
                "👏",
                "💯",
                "😊",
                "😎",
                "✨"
            ];

            const emoji =
                emojis[Math.floor(Math.random() * emojis.length)];

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    react: {
                        text: emoji,
                        key: msg.key
                    }
                }
            );

            console.log(
                `❤️ Reacted to status with ${emoji}`
            );

        } catch (error) {
            console.error(
                "AutoLikeStatus Plugin Error:",
                error
            );
        }
    }
};
