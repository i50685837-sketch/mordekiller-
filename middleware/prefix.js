const settings = require("../config/settings");

module.exports = function prefix(msg) {
    try {

        if (!msg || !msg.message) {
            return {
                success: false
            };
        }

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text) {
            return {
                success: false
            };
        }

        const prefixes = settings.prefixes || [
            ".",
            "!",
            "#",
            "/"
        ];

        const prefix = prefixes.find(p =>
            text.startsWith(p)
        );

        if (!prefix) {
            return {
                success: false
            };
        }

        const args = text
            .slice(prefix.length)
            .trim()
            .split(/\s+/);

        const command =
            args.shift().toLowerCase();

        return {
            success: true,
            prefix,
            command,
            args,
            text
        };

    } catch (error) {

        console.error(
            "Prefix Middleware Error:",
            error
        );

        return {
            success: false
        };
    }
};
