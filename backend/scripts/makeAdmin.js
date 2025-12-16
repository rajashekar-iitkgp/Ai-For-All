const pool = require('../db');

const makeAdmin = async () => {
    try {
        const res = await pool.query("UPDATE users SET role = 'admin' RETURNING *");
        console.log("Updated users to admin:", res.rows.length);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

makeAdmin();
