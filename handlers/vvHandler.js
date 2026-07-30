module.exports = async function vvHandler(sock, msg) {
    try {
        const m = msg.messages?.[0];

        if (!m || !m.message) return;

        if (m.key.fromMe) return;

        const from = m.key.remoteJid;

        // Detect View Once Image
        if (m.message.viewOnceMessageV2) {

            const viewOnce =
                m.message.viewOnceMessageV2.message;

            console.log("👁️ View Once Image detected");

            await sock.sendMessage(from, {
                text:
`👁️ *MordeKiller View Once Handler*

A view-once message was detected.

Media processing is ready.`
            });
        }


        // Detect View Once Video
        if (m.message.viewOnceMessage) {

            console.log("👁️ View Once Video detected");

            await sock.sendMessage(from, {
                text:
`👁️ *MordeKiller*

View-once media detected.`
            });
        }


    } catch (error) {
        console.error("VV Handler Error:", error);
    }
};
