const axios = require("axios");


/**
 * Download file as buffer
 */
async function downloadBuffer(url) {

    try {

        const response = await axios.get(
            url,
            {
                responseType: "arraybuffer",
                timeout: 30000
            }
        );

        return Buffer.from(
            response.data
        );

    } catch (error) {

        console.error(
            "Download Error:",
            error.message
        );

        return null;
    }
}


/**
 * Download JSON data
 */
async function downloadJSON(url) {

    try {

        const response = await axios.get(
            url,
            {
                timeout: 30000
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "JSON Download Error:",
            error.message
        );

        return null;
    }
}


/**
 * Check if URL is reachable
 */
async function checkURL(url) {

    try {

        await axios.head(
            url,
            {
                timeout: 10000
            }
        );

        return true;

    } catch {

        return false;
    }
}


module.exports = {
    downloadBuffer,
    downloadJSON,
    checkURL
};
