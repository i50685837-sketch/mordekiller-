require("dotenv").config();

module.exports = {
  // Database Type: "mongo" or "json"
  type: process.env.DB_TYPE || "json",

  // MongoDB
  mongo: {
    uri: process.env.MONGO_URI || "",
    options: {
      autoIndex: true
    }
  },

  // Local JSON Database
  json: {
    users: "./database/users.json",
    groups: "./database/groups.json",
    economy: "./database/economy.json",
    settings: "./database/settings.json",
    premium: "./database/premium.json",
    warnings: "./database/warnings.json"
  }
};
