const fs = require("fs");
const path = require("path");

const { downloadMedia } = require("../lib/baileys");
const sticker = require("../lib/sticker");

module.exports = {
    name: "autosticker",
    description: "Automatically convert images to stickers",

    async execute(sock, msg) {
        try {
            if (!msg.message) return;
            if (msg.key.fromMe) return;

            const from = msg.key.remoteJid;

            // Image only
            if (!msg.message.imageMessage) return;

            const tempDir = path.join(__dirname, "../temp");

            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }

            const input = path.join(
                tempDir,
                `${Date.now()}.jpg`
            );

            const output = path.join(
                tempDir,
                `${Date.now()}.webp`
            );

            // Download image
            const buffer = await downloadMedia(
                msg.message.imageMessage,
                "image"
            );

            fs.writeFileSync(input, buffer);

            // Convert to sticker
            await sticker.imageToSticker(
                input,
                output
            );

            // Send sticker
            await sticker.sendSticker(
                sock,
                from,
                output
            );

            // Clean temporary files
            sticker.remove(input);
            sticker.remove(output);

            console.log("🖼️ AutoSticker executed.");

        } catch (error) {
            console.error(
                "AutoSticker Plugin Error:",
                error
            );
        }
    }
};
