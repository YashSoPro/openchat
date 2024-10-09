const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database'); // Import your database connection

const router = express.Router();

// User Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password for security
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Store user in database
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hash], (error) => {
            if (error) {
                return res.status(500).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Get user from database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = results[0];

        // Compare password with hashed password
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).send('Invalid username or password');
            }
            res.status(200).send('Login successful');
        });
    });
});

module.exports = router;
