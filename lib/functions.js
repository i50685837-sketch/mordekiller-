const moment = require("moment-timezone");


/**
 * Format WhatsApp number
 */
function formatNumber(number) {
    return number
        .replace(/[^0-9]/g, "") + "@s.whatsapp.net";
}


/**
 * Get current time
 */
function getTime(timezone = "Africa/Nairobi") {
    return moment()
        .tz(timezone)
        .format("HH:mm:ss");
}


/**
 * Get current date
 */
function getDate(timezone = "Africa/Nairobi") {
    return moment()
        .tz(timezone)
        .format("DD/MM/YYYY");
}


/**
 * Sleep / delay function
 */
function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


/**
 * Random number
 */
function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


/**
 * Pick random item from array
 */
function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}


/**
 * Check URL
 */
function isUrl(text) {
    return /^https?:\/\/.+/i.test(text);
}


/**
 * Convert bytes to readable size
 */
function formatSize(bytes) {

    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    if (bytes === 0) return "0 Bytes";

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return (
        Math.round(
            bytes / Math.pow(1024, i)
        , 2)
        + " " + sizes[i]
    );
}


/**
 * Generate random ID
 */
function randomID(length = 10) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {
        id += chars[
            Math.floor(Math.random() * chars.length)
        ];
    }

    return id;
}


module.exports = {
    formatNumber,
    getTime,
    getDate,
    sleep,
    randomNumber,
    randomItem,
    isUrl,
    formatSize,
    randomID
};
