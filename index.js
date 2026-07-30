/**
 * MordeKiller WhatsApp Bot
 * Main Entry File (index.js)
 */

require("dotenv").config();

const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const qrcode = require("qrcode-terminal");

const { Boom } = require("@hapi/boom");

// Load handlers
const messageHandler = require("./handlers/messageHandler");

async function startMordeKiller() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: "silent" }),
    browser: ["MordeKiller", "Chrome", "1.0.0"]
  });

  sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {

    if (qr) {
      console.clear();
      console.log("📲 Scan this QR Code:\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.clear();
      console.log("====================================");
      console.log("🤖 MORDEKILLER BOT CONNECTED");
      console.log("====================================");
      console.log("✅ WhatsApp Connected");
      console.log("🚀 Bot is Running...");
      console.log("====================================");
    }

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output.statusCode
          : 0) !== DisconnectReason.loggedOut;

      console.log("❌ Connection Closed");

      if (shouldReconnect) {
        console.log("🔄 Reconnecting...");
        startMordeKiller();
      } else {
        console.log("⚠️ Logged Out.");
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (msg) => {
    try {
      await messageHandler(sock, msg);
    } catch (err) {
      console.error(err);
    }
  });
}

startMordeKiller();
