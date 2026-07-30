require("dotenv").config();

module.exports = {
  // Bot Identity
  botName: process.env.BOT_NAME || "MordeKiller",
  version: "1.0.0",
  prefix: process.env.PREFIX || ".",

  // Behaviour
  autoRead: process.env.AUTO_READ === "true",
  autoTyping: process.env.AUTO_TYPING === "true",
  autoRecording: process.env.AUTO_RECORDING === "true",

  // Group Features
  welcome: process.env.WELCOME === "true",
  goodbye: process.env.GOODBYE === "true",
  antiLink: process.env.ANTI_LINK === "true",
  antiSpam: process.env.ANTI_SPAM === "true",
  antiDelete: process.env.ANTI_DELETE === "true",

  // Limits
  maxWarnings: 3,
  commandCooldown: 3, // seconds

  // Economy
  startingCoins: 100,
  dailyReward: 50,
  xpPerCommand: 10,

  // Sticker
  stickerPack: "MordeKiller",
  stickerAuthor: "Morde",

  // Menu
  menuType: "image",

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",

  // Timezone
  timezone: process.env.TIMEZONE || "Africa/Nairobi"
};
