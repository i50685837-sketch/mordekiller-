const warnings = new Map();

module.exports = {
    name: "antispam",
    description: "Detect and prevent message spam",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;
            if (msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            const sender = msg.key.participant || from;

            const now = Date.now();

            if (!warnings.has(sender)) {
                warnings.set(sender, []);
            }

            // Store message timestamp
            const history = warnings.get(sender);
            history.push(now);

            // Keep only messages from the last 10 seconds
            const recent = history.filter(
                time => now - time < 10000
            );

            warnings.set(sender, recent);

            // Spam threshold
            if (recent.length >= 6) {

                await sock.sendMessage(from, {
                    text:
`⚠️ *MordeKiller Anti-Spam*

🚫 Spam detected!

👤 User:
@${sender.split("@")[0]}

Please avoid sending too many messages in a short time.`,
                    mentions: [sender]
                });

                // Reset counter after warning
                warnings.set(sender, []);

                console.log(
                    `🚨 Spam detected from ${sender}`
                );
            }

        } catch (error) {
            console.error(
                "AntiSpam Plugin Error:",
                error
            );
        }
    }
};
