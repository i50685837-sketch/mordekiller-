require("dotenv").config();

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");

const messageHandler = require("./handlers/messageHandler");
const eventHandler = require("./handlers/eventHandler");

async function startBot() {

    const sessionDir = path.join(__dirname, "session");

    if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
    }

    const { state, saveCreds } =
        await useMultiFileAuthState(sessionDir);

    const { version } =
        await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        browser: [
            "MordeKiller",
            "Chrome",
            "1.0.0"
        ]
    });

    // Pairing Code
    if (
        process.env.USE_PAIRING_CODE === "true" &&
        !sock.authState.creds.registered
    ) {

        const phone =
            process.env.PHONE_NUMBER;

        const code =
            await sock.requestPairingCode(phone);

        console.log("");
        console.log("=================================");
        console.log("🤖 MordeKiller Pairing Code");
        console.log("=================================");
        console.log(`📱 ${phone}`);
        console.log(`🔑 ${code}`);
        console.log("=================================");
    }

    // QR Code
    sock.ev.on("connection.update", async ({
        connection,
        lastDisconnect,
        qr
    }) => {

        if (qr) {
            qrcode.generate(qr, {
                small: true
            });
        }

        if (connection === "open") {

            console.log("");
            console.log("✅ MordeKiller Connected");
            console.log(
                `👤 ${sock.user.name}`
            );
        }

        if (connection === "close") {

            const shouldReconnect =
                lastDisconnect?.error?.output
                    ?.statusCode !==
                DisconnectReason.loggedOut;

            console.log("❌ Disconnected");

            if (shouldReconnect) {
                startBot();
            }
        }
    });

    sock.ev.on(
        "creds.update",
        saveCreds
    );

    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {

            const msg = messages[0];

            if (!msg.message) return;

            await messageHandler(
                sock,
                msg
            );
        }
    );

    eventHandler(sock);
}

startBot().catch(console.error);
