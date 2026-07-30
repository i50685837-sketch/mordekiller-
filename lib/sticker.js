const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

/**
 * Convert image to WebP sticker
 */
function imageToSticker(input, output) {
    return new Promise((resolve, reject) => {

        const command = `ffmpeg -i "${input}" \
-vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white" \
-lossless 1 -compression_level 6 -q:v 80 -loop 0 -preset default -an -vsync 0 "${output}"`;

        exec(command, (err) => {
            if (err) return reject(err);
            resolve(output);
        });

    });
}

/**
 * Convert video to WebP sticker
 */
function videoToSticker(input, output) {
    return new Promise((resolve, reject) => {

        const command = `ffmpeg -i "${input}" \
-t 8 \
-vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white" \
-lossless 1 -compression_level 6 -q:v 80 -loop 0 -preset default -an -vsync 0 "${output}"`;

        exec(command, (err) => {
            if (err) return reject(err);
            resolve(output);
        });

    });
}

/**
 * Send sticker
 */
async function sendSticker(sock, jid, stickerPath) {

    await sock.sendMessage(jid, {
        sticker: fs.readFileSync(stickerPath)
    });

}

/**
 * Delete temporary file
 */
function remove(file) {

    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }

}

module.exports = {
    imageToSticker,
    videoToSticker,
    sendSticker,
    remove
};
