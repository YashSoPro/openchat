const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Routes
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error or user already exists' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', username: user.username });
    });
});

app.post('/api/messages', (req, res) => {
    const { username, message } = req.body;

    connection.query('INSERT INTO messages (username, message) VALUES (?, ?)', [username, message], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving message' });
        }
        res.status(201).json({ message: 'Message sent successfully' });
    });
});

app.get('/api/messages', (req, res) => {
    connection.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
