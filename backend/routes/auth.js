const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorization = require('../middleware/authorization');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(401).json({ message: 'User already exists!' });
        }

        // Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert user
        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        // Generate JWT
        const token = jwt.sign({ user: newUser.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: newUser.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Password or Email is incorrect' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Password or Email is incorrect' });
        }

        // Generate JWT
        const token = jwt.sign({ user: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: user.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update User
router.put('/update', authorization, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user; // from authorization middleware

        let updateQuery = 'UPDATE users SET user_name = $1, user_email = $2';
        let queryParams = [name, email];
        let paramCounter = 3;

        // If password is provided, hash it and add to query
        if (password && password.trim() !== "") {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);
            updateQuery += `, user_password = $${paramCounter}`;
            queryParams.push(bcryptPassword);
            paramCounter++;
        }

        updateQuery += ` WHERE user_id = $${paramCounter} RETURNING *`;
        queryParams.push(userId);

        const updatedUser = await pool.query(updateQuery, queryParams);

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Verify Token
router.get('/verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
