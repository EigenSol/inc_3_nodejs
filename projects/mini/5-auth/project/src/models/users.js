const db = require("../config/database")

async function createUsersTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'employee', 'client', 'vendor', 'member') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    await db.query(query);
}

async function get_details(email) {
    const query = `SELECT id, first_name, last_name, password FROM users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows[0];
}

module.exports = {
    createUsersTable,
    get_details,
}