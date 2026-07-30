const fs = require("fs");
const path = require("path");

const logFolder = path.join(
    __dirname,
    "../logs"
);


// Create logs folder
if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
}


function saveLog(type, message) {

    const date = new Date()
        .toISOString();

    const log =
`[${date}] [${type}] ${message}\n`;

    fs.appendFileSync(
        path.join(logFolder, "bot.log"),
        log
    );
}


/**
 * Info log
 */
function info(message) {

    console.log(
        `ℹ️ INFO: ${message}`
    );

    saveLog(
        "INFO",
        message
    );
}


/**
 * Success log
 */
function success(message) {

    console.log(
        `✅ SUCCESS: ${message}`
    );

    saveLog(
        "SUCCESS",
        message
    );
}


/**
 * Warning log
 */
function warn(message) {

    console.log(
        `⚠️ WARNING: ${message}`
    );

    saveLog(
        "WARNING",
        message
    );
}


/**
 * Error log
 */
function error(message) {

    console.error(
        `❌ ERROR: ${message}`
    );

    saveLog(
        "ERROR",
        message
    );
}


/**
 * Command usage log
 */
function command(command, user) {

    const message =
`${user} used ${command}`;

    console.log(
        `⚡ COMMAND: ${message}`
    );

    saveLog(
        "COMMAND",
        message
    );
}


module.exports = {
    info,
    success,
    warn,
    error,
    command
};
