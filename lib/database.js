const fs = require("fs");
const path = require("path");

const databaseFolder = path.join(
    __dirname,
    "../database"
);


/**
 * Ensure database folder exists
 */
if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder);
}


/**
 * Read JSON database file
 */
function readDB(file) {

    const filePath = path.join(
        databaseFolder,
        file
    );

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
            filePath,
            "{}"
        );
    }

    const data = fs.readFileSync(
        filePath,
        "utf-8"
    );

    return JSON.parse(data || "{}");
}


/**
 * Write JSON database file
 */
function writeDB(file, data) {

    const filePath = path.join(
        databaseFolder,
        file
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2)
    );

}


/**
 * Get user data
 */
function getUser(id) {

    const users = readDB(
        "users.json"
    );

    return users[id] || null;
}


/**
 * Create user
 */
function createUser(id, data = {}) {

    const users = readDB(
        "users.json"
    );

    if (!users[id]) {
        users[id] = {
            xp: 0,
            level: 1,
            coins: 0,
            premium: false,
            warnings: 0,
            ...data
        };
    }

    writeDB(
        "users.json",
        users
    );

    return users[id];
}


/**
 * Update user
 */
function updateUser(id, data) {

    const users = readDB(
        "users.json"
    );

    users[id] = {
        ...(users[id] || {}),
        ...data
    };

    writeDB(
        "users.json",
        users
    );

    return users[id];
}


/**
 * Delete user
 */
function deleteUser(id) {

    const users = readDB(
        "users.json"
    );

    delete users[id];

    writeDB(
        "users.json",
        users
    );
}


module.exports = {
    readDB,
    writeDB,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
