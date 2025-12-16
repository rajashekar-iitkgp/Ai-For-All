const pool = require('../db');

const listUsers = async () => {
    try {
        const res = await pool.query('SELECT user_id, user_name, user_email, role FROM users');
        console.log("Users found:", res.rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listUsers();
