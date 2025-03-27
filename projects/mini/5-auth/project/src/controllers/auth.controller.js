const users = require("../models/users")
const auth = require("../models/auth")
const crypto = require("crypto")
const md5 = require("md5")

async function login(req, res) {
    const { email, password } = req.body;
    const user = await users.get_details(email);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = crypto.randomBytes(64).toString('hex');
    const { valid_till } = await auth.add_token(user.id, token);

    return res.json({ success: true, token: token, valid_till: valid_till });
}

async function logout(req, res) {
    try {
        const token = req.headers['authorization'];
        await auth.delete_token(token);
        res.status(200).send({success: true, message: "Logged out successfully"})
    }
    catch (error) {
        res.status(500).send({success: false, message: error})
    }
}

async function check(req, res) {
    try {
        expiry = await auth.get_expiry(req.headers['authorization']);
        res.status(200).send({ success: true, message: "Token valid", valid_till: expiry['valid_till'] });
    }
    catch (error) {
        res.status(500).send({success: false, message: error})
    }
}

module.exports = { login, logout, check }