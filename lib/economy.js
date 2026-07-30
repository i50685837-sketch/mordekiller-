const db = require("./database");

/**
 * Get user economy
 */
function getUser(userId) {
    let users = db.readDB("users.json");

    if (!users[userId]) {
        users[userId] = {
            coins: 0,
            xp: 0,
            level: 1,
            bank: 0,
            daily: 0
        };

        db.writeDB("users.json", users);
    }

    return users[userId];
}

/**
 * Save user
 */
function saveUser(userId, data) {
    let users = db.readDB("users.json");
    users[userId] = data;
    db.writeDB("users.json", users);
}

/**
 * Add coins
 */
function addCoins(userId, amount) {
    let user = getUser(userId);

    user.coins += amount;

    saveUser(userId, user);

    return user.coins;
}

/**
 * Remove coins
 */
function removeCoins(userId, amount) {
    let user = getUser(userId);

    user.coins = Math.max(0, user.coins - amount);

    saveUser(userId, user);

    return user.coins;
}

/**
 * Add XP
 */
function addXP(userId, amount) {
    let user = getUser(userId);

    user.xp += amount;

    while (user.xp >= user.level * 100) {
        user.xp -= user.level * 100;
        user.level++;
    }

    saveUser(userId, user);

    return user;
}

/**
 * Daily reward
 */
function claimDaily(userId) {
    let user = getUser(userId);

    const now = Date.now();

    if (now - user.daily < 86400000) {
        return {
            success: false,
            remaining: 86400000 - (now - user.daily)
        };
    }

    user.daily = now;
    user.coins += 500;

    saveUser(userId, user);

    return {
        success: true,
        reward: 500
    };
}

/**
 * Deposit coins
 */
function deposit(userId, amount) {
    let user = getUser(userId);

    if (amount > user.coins) return false;

    user.coins -= amount;
    user.bank += amount;

    saveUser(userId, user);

    return true;
}

/**
 * Withdraw coins
 */
function withdraw(userId, amount) {
    let user = getUser(userId);

    if (amount > user.bank) return false;

    user.bank -= amount;
    user.coins += amount;

    saveUser(userId, user);

    return true;
}

module.exports = {
    getUser,
    saveUser,
    addCoins,
    removeCoins,
    addXP,
    claimDaily,
    deposit,
    withdraw
};
