document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');

    messageInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    const sendMessage = () => {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You: ' + message, 'user');
            messageInput.value = '';

            fetch('/chat', {
                method: 'POST',
                body: new URLSearchParams({
                    message: message
                })
            })
                .then(response => response.text())
                .then(reply => {
                    appendMessage('Kochi: ' + reply, 'kochi');
                });
        }
    };

    const appendMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    document.getElementById('send-btn').addEventListener('click', sendMessage);
});
