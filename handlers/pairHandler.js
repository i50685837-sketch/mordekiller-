const readline = require("readline");

module.exports = async function pairHandler(sock, phoneNumber) {
    try {

        if (!phoneNumber) {
            console.log("❌ Phone number required for pairing.");
            return;
        }

        // Remove symbols/spaces
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

        console.log("📱 Requesting pairing code...");

        const code = await sock.requestPairingCode(phoneNumber);

        console.log("==============================");
        console.log("🤖 MordeKiller Pairing Code");
        console.log("==============================");
        console.log(`🔑 Code: ${code}`);
        console.log("==============================");

        console.log(
            "Open WhatsApp > Linked Devices > Link with phone number"
        );

    } catch (error) {
        console.error("Pair Handler Error:", error);
    }
};
