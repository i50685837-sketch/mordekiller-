const {
    downloadContentFromMessage
} = require("@whiskeysockets/baileys");


/**
 * Send text message
 */
async function sendText(sock, jid, text, options = {}) {
    return await sock.sendMessage(jid, {
        text,
        ...options
    });
}


/**
 * Send image
 */
async function sendImage(sock, jid, image, caption = "") {
    return await sock.sendMessage(jid, {
        image,
        caption
    });
}


/**
 * Send video
 */
async function sendVideo(sock, jid, video, caption = "") {
    return await sock.sendMessage(jid, {
        video,
        caption
    });
}


/**
 * Send audio
 */
async function sendAudio(sock, jid, audio, ptt = false) {
    return await sock.sendMessage(jid, {
        audio,
        mimetype: "audio/mp4",
        ptt
    });
}


/**
 * Download WhatsApp media
 */
async function downloadMedia(message, type) {

    const stream = await downloadContentFromMessage(
        message,
        type
    );

    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([
            buffer,
            chunk
        ]);
    }

    return buffer;
}


/**
 * Get sender ID
 */
function getSender(msg) {
    return (
        msg.key.participant ||
        msg.key.remoteJid
    );
}


/**
 * Check group message
 */
function isGroup(msg) {
    return msg.key.remoteJid.endsWith("@g.us");
}


module.exports = {
    sendText,
    sendImage,
    sendVideo,
    sendAudio,
    downloadMedia,
    getSender,
    isGroup
};
