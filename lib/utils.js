const crypto = require("crypto");

/**
 * Generate random string
 */
function randomString(length = 10) {
    return crypto
        .randomBytes(length)
        .toString("hex")
        .slice(0, length);
}

/**
 * Generate random number
 */
function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

/**
 * Capitalize text
 */
function capitalize(text = "") {
    return text.charAt(0).toUpperCase() +
        text.slice(1);
}

/**
 * Format numbers
 */
function formatNumber(number) {
    return Number(number).toLocaleString("en-GB");
}

/**
 * Format runtime
 */
function runtime(seconds) {

    seconds = Number(seconds);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);

    return [
        days && `${days}d`,
        hours && `${hours}h`,
        minutes && `${minutes}m`,
        secs && `${secs}s`
    ].filter(Boolean).join(" ");
}

/**
 * Pick random item
 */
function pickRandom(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

/**
 * Delay
 */
function delay(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

/**
 * Check URL
 */
function isUrl(text) {
    return /^https?:\/\/.+/i.test(text);
}

/**
 * Escape RegExp
 */
function escapeRegex(text) {
    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}

module.exports = {
    randomString,
    randomNumber,
    capitalize,
    formatNumber,
    runtime,
    pickRandom,
    delay,
    isUrl,
    escapeRegex
};
