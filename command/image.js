module.exports = {
    name: "image",
    aliases: ["img", "imagine", "draw"],
    category: "AI",
    description: "Generate AI images",

    async execute(sock, msg, args) {
        try {
            const from = msg.key.remoteJid;
            const prompt = args.join(" ");

            if (!prompt) {
                return await sock.sendMessage(from, {
                    text: `🖼️ *MordeKiller Image AI*

Usage:
.image <description>

Examples:
.image A futuristic city at night
.image A lion wearing sunglasses
.image A cyberpunk hacker
.image A luxury mansion with a pool`
                });
            }

            // Placeholder until an image-generation API is connected
            await sock.sendMessage(from, {
                text: `🎨 *MordeKiller Image AI*

📝 Prompt:
${prompt}

⚠️ Image generation is not configured yet.

Connect an image generation service (such as OpenAI Images or another compatible provider) to generate and send images automatically.`
            });

        } catch (error) {
            console.error("Image Command Error:", error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Failed to process your image request."
            });
        }
    }
};
