const settings = require("../config/settings");

module.exports = {
    name: "pairing",
    description: "Generate WhatsApp pairing code",

    async execute(sock) {
        try {

            if (!settings.phoneNumber) {
                console.log("❌ No phone number configured.");
                return;
            }

            const phone = settings.phoneNumber.replace(/\D/g, "");

            console.log("📱 Requesting pairing code...");

            const code = await sock.requestPairingCode(phone);

            console.log("=================================");
            console.log("🤖 MordeKiller Pairing Code");
            console.log("=================================");
            console.log(`📞 Number : ${phone}`);
            console.log(`🔑 Code   : ${code}`);
            console.log("=================================");
            console.log("Open WhatsApp → Linked Devices → Link with phone number");

        } catch (error) {
            console.error("Pairing Plugin Error:", error);
        }
    }
};
