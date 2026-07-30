const warnings = new Map();

module.exports = async function demonsHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        if (m.key.fromMe) return;

        const from = m.key.remoteJid;
        const sender = m.key.participant || from;

        const text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            "";

        if (!text) return;


        // Detect spam messages
        const now = Date.now();

        if (!warnings.has(sender)) {
            warnings.set(sender, []);
        }

        const userMessages = warnings.get(sender);

        userMessages.push(now);

        // Keep last 10 seconds
        const recent = userMessages.filter(
            time => now - time < 10000
        );

        warnings.set(sender, recent);


        if (recent.length >= 6) {

            await sock.sendMessage(from, {
                text:
`⚠️ *MordeKiller Security*

Suspicious activity detected.

👤 User:
@${sender.split("@")[0]}

Reason:
Too many messages too quickly.`,
                mentions: [sender]
            });

            warnings.set(sender, []);
        }


        // Detect suspicious commands
        const blockedWords = [
            "hack bot",
            "spam",
            "exploit"
        ];

        if (
            blockedWords.some(word =>
                text.toLowerCase().includes(word)
            )
        ) {

            console.log(
                `🛡️ Security alert: ${sender}`
            );

        }


    } catch (error) {
        console.error("Demons Handler Error:", error);
    }
};
