require("dotenv").config();

module.exports = {
  name: process.env.OWNER_NAME || "Morde",

  number: process.env.OWNER_NUMBER || "254700000000",

  jid: (process.env.OWNER_NUMBER || "254700000000") + "@s.whatsapp.net",

  premium: [
    (process.env.OWNER_NUMBER || "254700000000") + "@s.whatsapp.net"
  ],

  developers: [
    {
      name: process.env.OWNER_NAME || "Morde",
      number: process.env.OWNER_NUMBER || "254700000000",
      jid: (process.env.OWNER_NUMBER || "254700000000") + "@s.whatsapp.net"
    }
  ]
};
