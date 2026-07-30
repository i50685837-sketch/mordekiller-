module.exports = {
    name: "math",
    aliases: ["solve", "calculate", "calc"],
    category: "AI",
    description: "Solve mathematical expressions",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const expression = args.join(" ");

            if (!expression) {
                return await sock.sendMessage(from, {
                    text: `🧮 *MordeKiller Math AI*

Usage:
.math <expression>

Examples:
.math 25 + 75
.solve (12 * 8) / 4
.calculate 15^2
.calc sqrt(144)`
                });
            }

            // Placeholder until a math engine or AI service is connected
            const response = `🧮 *MordeKiller Math AI*

📝 Expression:
${expression}

📊 Result:
Math solving is not configured yet.

Connect a math engine or AI service to evaluate expressions, solve equations, and explain solutions.`;

            await sock.sendMessage(from, {
                text: response
            });

        } catch (error) {
            console.error("Math Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to solve the mathematical expression."
            });
        }
    }
};
