const messageStore = new Map();

module.exports = function retrieveHandler(sock) {

    // Store incoming messages
    sock.ev.on("messages.upsert", async ({ messages }) => {
        try {
            const msg = messages[0];

            if (!msg || !msg.message) return;
            if (msg.key.fromMe) return;

            const id = msg.key.id;

            messageStore.set(id, msg);

            // Keep only recent messages
            if (messageStore.size > 500) {
                const firstKey = messageStore.keys().next().value;
                messageStore.delete(firstKey);
            }

        } catch (error) {
            console.error("Message Store Error:", error);
        }
    });


    // Detect deleted messages
    sock.ev.on("messages.update", async (updates) => {
        try {

            for (const update of updates) {

                if (
                    update.update.message === null &&
                    messageStore.has(update.key.id)
                ) {

                    const oldMessage =
                        messageStore.get(update.key.id);

                    const chat = update.key.remoteJid;

                    await sock.sendMessage(chat, {
                        text:
`🕵️ *MordeKiller Anti-Delete*

A message was deleted.

👤 From:
${oldMessage.pushName || "Unknown"}

📝 Message:
${getText(oldMessage)}`
                    });

                }
            }

        } catch (error) {
            console.error("Retrieve Handler Error:", error);
        }
    });

};


// Extract text from message
function getText(msg) {

    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        msg.message?.videoMessage?.caption ||
        "Media message"
    );

}
