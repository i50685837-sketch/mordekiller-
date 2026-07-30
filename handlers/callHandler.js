const settings = require("../config/settings");

module.exports = function callHandler(sock) {

    sock.ev.on("call", async (calls) => {
        try {

            for (const call of calls) {

                const caller = call.from;

                console.log(`📞 Incoming call from: ${caller}`);

                // Example: Auto reject calls
                if (call.status === "offer") {

                    await sock.rejectCall(
                        call.id,
                        caller
                    );

                    await sock.sendMessage(caller, {
                        text:
`📞 *MordeKiller*

Sorry, I don't accept calls.

Please send a text message instead. 🤖`
                    });

                    console.log("❌ Call rejected");
                }

            }

        } catch (error) {
            console.error("Call Handler Error:", error);
        }
    });

    console.log("✅ Call Handler Loaded");
};
