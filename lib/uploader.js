const axios = require("axios");
const FormData = require("form-data");


/**
 * Upload file using file.io
 */
async function uploadFile(buffer, filename = "file") {

    try {

        const form = new FormData();

        form.append(
            "file",
            buffer,
            filename
        );

        const response = await axios.post(
            "https://file.io",
            form,
            {
                headers: form.getHeaders()
            }
        );

        return response.data.link;

    } catch (error) {

        console.error(
            "Upload Error:",
            error.message
        );

        return null;
    }
}


/**
 * Upload image/media
 */
async function uploadMedia(buffer, filename) {

    return await uploadFile(
        buffer,
        filename
    );

}


module.exports = {
    uploadFile,
    uploadMedia
};
