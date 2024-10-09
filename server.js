const express = require('express');
const db = require('./database'); // Import your database connection file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route for testing
app.get('/', (req, res) => {
    res.send('Welcome to OpenChat API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
