const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./database'); // Connect to the database
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Route for home page (login/register)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    database.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.username = username;
            res.redirect('/chat');
        } else {
            res.send('Incorrect username or password.');
        }
    });
});

// Handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    database.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Route for chat page
app.get('/chat', (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/chat.html'); // Create a separate chat page
    } else {
        res.redirect('/');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
