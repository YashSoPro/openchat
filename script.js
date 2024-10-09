async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
    
    if (data.message === 'Login successful') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        loadMessages();
    }
}

async function sendMessage() {
    const username = document.getElementById('login-username').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message }),
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById('message').value = '';
    loadMessages();
}

async function loadMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.textContent = `${msg.username}: ${msg.message}`;
        messagesDiv.appendChild(msgElement);
    });
}
