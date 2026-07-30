module.exports = {
    name: "autoread",
    description: "Automatically mark incoming messages as read",

    async execute(sock, msg) {
        try {
            if (!msg.key) return;

            // Ignore messages sent by the bot
            if (msg.key.fromMe) return;

            // Mark message as read
            await sock.readMessages([
                msg.key
            ]);

            console.log(
                `👀 Read message from ${
                    msg.key.participant ||
                    msg.key.remoteJid
                }`
            );

        } catch (error) {
            console.error(
                "AutoRead Plugin Error:",
                error
            );
        }
    }
};
