const axios = require("axios");
const settings = require("../config/settings");

const API_URL = settings.aiApiUrl;
const API_KEY = settings.aiApiKey;

/**
 * Send prompt to AI
 */
async function askAI(prompt) {

    try {

        const response = await axios.post(
            API_URL,
            {
                prompt
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "AI Error:",
            error.message
        );

        return {
            success: false,
            message: "AI service unavailable."
        };
    }

}


/**
 * Chat AI
 */
async function chat(message) {

    return await askAI(message);

}


/**
 * Generate code
 */
async function generateCode(prompt) {

    return await askAI(
        `Write code for: ${prompt}`
    );

}


/**
 * Translate text
 */
async function translate(text, language) {

    return await askAI(
        `Translate to ${language}: ${text}`
    );

}


/**
 * Summarize text
 */
async function summarize(text) {

    return await askAI(
        `Summarize:\n${text}`
    );

}


/**
 * Explain topic
 */
async function explain(topic) {

    return await askAI(
        `Explain: ${topic}`
    );

}

module.exports = {
    askAI,
    chat,
    generateCode,
    translate,
    summarize,
    explain
};
