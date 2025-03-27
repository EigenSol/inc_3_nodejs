const db = require("../config/database")

async function createUsersTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fname VARCHAR(100) NOT NULL,
            lname VARCHAR(100) NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'employee', 'client', 'customer', 'vendor', 'member') NOT NULL,
            phone VARCHAR(20),
            address TEXT,
            pic_src VARCHAR(255),
            is_active BOOLEAN DEFAULT TRUE,
            last_login DATETIME NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    await db.query(query);
}

async function get_details(email) {
    const query = `SELECT id, fname, lname, password, role, is_active FROM users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows[0];
}

async function update_last_login(userId) {
    const query = `UPDATE users SET last_login = NOW() WHERE id = ?`;
    await db.query(query, [userId]);
}

module.exports = {
    createUsersTable,
    get_details,
    update_last_login,
}