const { downloadBuffer } = require("../lib/downloader");

const file = await downloadBuffer(
    "https://example.com/image.jpg"
);

await sock.sendMessage(
    jid,
    {
        image: file,
        caption: "Downloaded by MordeKiller 🤖"
    }
);
