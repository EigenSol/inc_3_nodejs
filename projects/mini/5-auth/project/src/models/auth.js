const db = require("../config/database")

async function createAuthTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS auth_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            token VARCHAR(255) NOT NULL UNIQUE,
            valid_till TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;
    await db.query(query);
}

async function get_expiry(token) {
    const query = `SELECT valid_till FROM auth_tokens WHERE token = ?`;
    const [rows] = await db.query(query, [token]);
    return rows[0];
}

async function delete_token(token) {
    const query = `DELETE FROM auth_tokens WHERE token = ?`;
    await db.query(query, [token]);
}

async function add_token(user_id, token) {
    const valid_till = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    const query = `INSERT INTO auth_tokens (user_id, token, valid_till) VALUES (?, ?, ?)`;
    await db.query(query, [user_id, token, valid_till]);
    return { token, valid_till };
}

module.exports = {
    createAuthTable,
    get_expiry,
    delete_token,
    add_token,
}
