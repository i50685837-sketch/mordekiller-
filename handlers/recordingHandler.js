module.exports = async function recordingHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        const from = m.key.remoteJid;

        // Detect voice notes
        if (m.message.audioMessage) {

            console.log(`🎙️ Voice message received from: ${from}`);

            await sock.sendMessage(from, {
                text:
`🎙️ *MordeKiller Voice Handler*

Voice message detected ✅

I can process audio when speech-to-text services are connected. 🤖`
            });

        }

        // Detect recorded audio
        if (m.message.pttMessage) {

            console.log(`🎤 Push-to-talk audio received: ${from}`);

            await sock.sendMessage(from, {
                text:
`🎤 Audio received!

Voice processing is ready for AI transcription integration.`
            });

        }

    } catch (error) {
        console.error("Recording Handler Error:", error);
    }
};
