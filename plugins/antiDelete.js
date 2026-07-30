module.exports = {
    name: "antidelete",
    description: "Recover deleted messages",

    // Temporary message storage
    messages: new Map(),

    async execute(sock, msg) {
        try {

            // Store incoming messages
            if (msg.message) {
                this.messages.set(msg.key.id, msg);

                // Limit stored messages
                if (this.messages.size > 1000) {
                    const firstKey = this.messages.keys().next().value;
                    this.messages.delete(firstKey);
                }
            }

            // Detect deleted messages
            if (msg.update?.message === null) {

                const deleted = this.messages.get(msg.key.id);

                if (!deleted) return;

                const from = msg.key.remoteJid;

                const text =
                    deleted.message?.conversation ||
                    deleted.message?.extendedTextMessage?.text ||
                    deleted.message?.imageMessage?.caption ||
                    deleted.message?.videoMessage?.caption ||
                    "[Media Message]";

                const sender =
                    deleted.pushName ||
                    deleted.key.participant ||
                    "Unknown";

                await sock.sendMessage(from, {
                    text:
`🗑️ *MordeKiller Anti-Delete*

⚠️ A message was deleted.

👤 Sender:
${sender}

📄 Content:
${text}`
                });

                this.messages.delete(msg.key.id);
            }

        } catch (error) {
            console.error("AntiDelete Plugin Error:", error);
        }
    }
};
