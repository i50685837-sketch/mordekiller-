require("dotenv").config();

module.exports = {
  // Bot Details
  botName: process.env.BOT_NAME || "MordeKiller",
  prefix: process.env.PREFIX || ".",

  // Owner
  owner: {
    name: process.env.OWNER_NAME || "Morde",
    number: process.env.OWNER_NUMBER || "254700000000"
  },

  // Session
  sessionPath: process.env.SESSION_PATH || "./session",

  // Server
  port: process.env.PORT || 3000,

  // Timezone
  timezone: process.env.TIMEZONE || "Africa/Nairobi",

  // APIs
  api: {
    openai: process.env.OPENAI_API_KEY || "",
    gemini: process.env.GEMINI_API_KEY || "",
    weather: process.env.WEATHER_API_KEY || "",
    youtube: process.env.YOUTUBE_API_KEY || ""
  },

  // Database
  mongoURI: process.env.MONGO_URI || "",

  // Features
  features: {
    autoRead: process.env.AUTO_READ === "true",
    autoTyping: process.env.AUTO_TYPING === "true",
    autoRecording: process.env.AUTO_RECORDING === "true",
    welcome: process.env.WELCOME === "true",
    goodbye: process.env.GOODBYE === "true",
    antiLink: process.env.ANTI_LINK === "true",
    antiSpam: process.env.ANTI_SPAM === "true",
    antiDelete: process.env.ANTI_DELETE === "true"
  }
};
