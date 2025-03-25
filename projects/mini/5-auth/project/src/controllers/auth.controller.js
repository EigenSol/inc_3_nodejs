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
        const { token } = req.body;
        await auth.delete_token(token);
        res.status(200).send({success: true, message: "Logged out successfully"})
    }
    catch (error) {
        res.status(500).send({success: false, message: error})
    }
}

async function check(req, res) {
    try {
        const { token } = req.body;
        expiry = await auth.get_expiry(token);
        if (!expiry) {
            return res.status(404).send({ success: false, message: "Token not found" });
        }

        const now = new Date();
        if (now > new Date(expiry.valid_till)) {
            return res.status(401).send({ success: false, message: "Token expired" });
        }

        res.status(200).send({ success: true, message: "Token valid" });
    }
    catch (error) {
        res.status(500).send({success: false, message: error})
    }
}

module.exports = { login, logout, check }