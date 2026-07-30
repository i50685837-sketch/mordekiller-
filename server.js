import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  delay
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import express from 'express';
import pino from 'pino';

const PORT = process.env.PORT || 3000;
const BOT_NAME = 'mordekiller';
const PREFIX = '.';

const app = express();
app.use(express.json());

let sock = null;
let isConnected = false;
let isPairing = false; // State lock to prevent concurrent API pairing requests

// Helper to format phone numbers (removes +, spaces, dashes)
function formatPhoneNumber(num) {
  return num.replace(/[^0-9]/g, '');
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  const { version } = await fetchLatestBaileysVersion();

  // Clean up memory leaks from old instances before creating a new socket
  if (sock) {
    try {
      sock.ev.removeAllListeners();
    } catch (e) {
      console.error('Error removing listeners:', e);
    }
  }

  sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false, // Turned off for public server clean logs
    browser: ['Ubuntu', 'Chrome', '20.0.0']
  });

  // Save session credentials
  sock.ev.on('creds.update', saveCreds);

  // Connection Updates & Reconnection Handling
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'open') {
      isConnected = true;
      console.log(`\n===================================`);
      console.log(`✅ ${BOT_NAME} Connected Successfully!`);
      console.log(`===================================\n`);
    } else if (connection === 'close') {
      isConnected = false;
      const statusCode = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output?.statusCode
        : null;

      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(`❌ Connection closed. Reason: ${statusCode}. Reconnecting: ${shouldReconnect}`);

      if (shouldReconnect) {
        setTimeout(startBot, 5000);
      } else {
        console.log('🔒 Logged out. Delete the ./auth_info folder to re-pair.');
      }
    }
  });

  // Message Handler / Bot Commands
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const from = msg.key.remoteJid;
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        '';

      if (!text.startsWith(PREFIX)) continue;

      const args = text.slice(PREFIX.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      console.log(`[CMD] ${command} from ${from}`);

      switch (command) {
        case 'ping':
          await sock.sendMessage(from, { text: '🏓 Pong! Mordekiller is active.' }, { quoted: msg });
          break;

        case 'alive':
        case 'menu':
        case 'help':
          await sock.sendMessage(
            from,
            {
              text: `👑 *${BOT_NAME.toUpperCase()} BOT SYSTEM*\n\n` +
                `*Status:* Active 🟢\n` +
                `*Prefix:* \`${PREFIX}\`\n\n` +
                `*Commands:*\n` +
                `• \`${PREFIX}ping\` - Test latency\n` +
                `• \`${PREFIX}alive\` - Check bot status\n` +
                `• \`${PREFIX}say [text]\` - Echo text back`
            },
            { quoted: msg }
          );
          break;

        case 'say':
          const echoText = args.join(' ');
          if (!echoText) {
            await sock.sendMessage(from, { text: 'Please provide a message to echo.' }, { quoted: msg });
          } else {
            await sock.sendMessage(from, { text: echoText }, { quoted: msg });
          }
          break;
      }
    }
  });
}

// REST API Endpoints

/**
 * GET /pair?phone=2547XXXXXXXX
 * Public endpoint to request a pairing code safely
 */
app.get('/pair', async (req, res) => {
  const rawPhone = req.query.phone;
  if (!rawPhone) {
    return res.status(400).json({ error: 'Phone number is required. Usage: /pair?phone=2547XXXXXXXX' });
  }

  const phone = formatPhoneNumber(rawPhone);

  if (!sock) {
    return res.status(503).json({ error: 'Server initializing WhatsApp core. Try again in a moment.' });
  }

  if (isConnected || sock?.authState?.creds?.registered) {
    return res.status(400).json({ error: 'Bot instance is already linked and active.' });
  }

  if (isPairing) {
    return res.status(429).json({ error: 'A pairing request is currently in progress. Please wait.' });
  }

  try {
    isPairing = true;
    await delay(2000); // Important buffer delay for Baileys socket synchronization
    const code = await sock.requestPairingCode(phone);
    isPairing = false;

    return res.json({
      status: 'success',
      bot: BOT_NAME,
      phone,
      pairingCode: code,
      instructions: 'Open WhatsApp > Linked Devices > Link with Phone Number > Enter this code.'
    });
  } catch (error) {
    isPairing = false;
    console.error('Public API Pairing Error:', error);
    return res.status(500).json({ error: 'Failed to generate code. Verify phone structure or server logs.' });
  }
});

/**
 * GET /status
 * Endpoint for health monitoring systems
 */
app.get('/status', (req, res) => {
  res.json({
    bot: BOT_NAME,
    connected: isConnected,
    registered: sock?.authState?.creds ? sock.authState.creds.registered : false,
    pairingLocked: isPairing
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ${BOT_NAME} Public Server listening on port ${PORT}`);
  startBot();
});
               
