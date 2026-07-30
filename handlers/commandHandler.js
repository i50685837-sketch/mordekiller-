const fs = require("fs");
const path = require("path");

const config = require("../config/config");

// Collection of loaded commands
const commands = new Map();

/**
 * Recursively load command files
 */
function loadCommands(dir = path.join(__dirname, "..", "commands")) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(filePath);
            continue;
        }

        if (!file.endsWith(".js")) continue;

        try {
            delete require.cache[require.resolve(filePath)];

            const command = require(filePath);

            if (!command.name) continue;

            commands.set(command.name.toLowerCase(), command);

            if (Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    commands.set(alias.toLowerCase(), command);
                });
            }

            console.log(`✅ Loaded: ${command.name}`);
        } catch (err) {
            console.error(`❌ Failed to load ${file}:`, err.message);
        }
    }
}

/**
 * Handle commands
 */
async function handleCommand(sock, msg) {
    try {
        const from = msg.key.remoteJid;

        const body =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            msg.message?.videoMessage?.caption ||
            "";

        if (!body.startsWith(config.prefix)) return;

        const args = body.slice(config.prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (!command) {
            return await sock.sendMessage(from, {
                text: `❌ Unknown command: ${commandName}\n\nType ${config.prefix}menu to see available commands.`
            });
        }

        await command.execute(sock, msg, args);

    } catch (error) {
        console.error("Command Handler Error:", error);

        await sock.sendMessage(msg.key.remoteJid, {
            text: "❌ An error occurred while executing the command."
        });
    }
}

// Load commands when this file is imported
loadCommands();

module.exports = {
    commands,
    loadCommands,
    handleCommand
};
