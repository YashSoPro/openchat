const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'dhirajbhawana74', // Your username
    password: 'Avc&??3R9R8Tjy?', // Your new password
    database: 'freedb_openimg', // Updated database name
    port: 3306
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the FreeDB database successfully.');
});

module.exports = connection;
