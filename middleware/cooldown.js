const cooldowns = new Map();

module.exports = async function cooldown(
    msg,
    command,
    seconds = 3
) {
    try {

        if (!msg || !msg.key) {
            return {
                success: false,
                message: "Invalid message."
            };
        }

        const sender =
            (msg.key.participant ||
            msg.key.remoteJid).split(":")[0];

        const key = `${sender}:${command}`;

        const now = Date.now();
        const delay = seconds * 1000;

        if (cooldowns.has(key)) {

            const expires = cooldowns.get(key);

            if (now < expires) {

                const remaining = Math.ceil(
                    (expires - now) / 1000
                );

                return {
                    success: false,
                    message:
`⏳ Please wait ${remaining} second(s) before using *${command}* again.`
                };
            }
        }

        cooldowns.set(
            key,
            now + delay
        );

        return {
            success: true
        };

    } catch (error) {

        console.error(
            "Cooldown Middleware Error:",
            error
        );

        return {
            success: false,
            message: "Cooldown check failed."
        };
    }
};
