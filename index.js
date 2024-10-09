<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenChat</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>OpenChat</h1>
        <div id="registration">
            <h2>Register</h2>
            <input type="text" id="register-username" placeholder="Username" required>
            <input type="password" id="register-password" placeholder="Password" required>
            <button onclick="register()">Register</button>
        </div>
        <div id="login">
            <h2>Login</h2>
            <input type="text" id="login-username" placeholder="Username" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button onclick="login()">Login</button>
        </div>
        <div id="chat" style="display: none;">
            <h2>Chat</h2>
            <input type="text" id="message" placeholder="Type a message..." required>
            <button onclick="sendMessage()">Send</button>
            <div id="messages"></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
