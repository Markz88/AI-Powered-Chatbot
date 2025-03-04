// This file contains the JavaScript code for the chatbot interface
// It sends a POST request to the /getChatbotResponse endpoint when the user sends a message

const chatLog = document.getElementById('chat-log'); // Get the chat log element
const userInput = document.getElementById('user-input'); // Get the user input element
const typingIndicator = document.getElementById('typing-indicator'); // Get the typing indicator element

function sendMessage() {
    const message = userInput.value.trim(); // Get the user's message and trim whitespace
    if (message === "") return; // Prevent sending empty messages
    // Display user's message
    displayMessage('user', message);
    // Show typing indicator
    showTypingIndicator();
    // Call OpenAI API to get chatbot's response
    getChatbotResponse(message);
    // Clear user input
    userInput.value = '';
}

function showTypingIndicator() {
    // Move typing indicator inside chat log at the bottom
    chatLog.appendChild(typingIndicator);
    
    // Display typing indicator
    typingIndicator.style.display = 'block';

    // Auto-scroll to the bottom of the chat log
    setTimeout(() => {
        chatLog.scrollTop = chatLog.scrollHeight;
    }, 100);
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function displayMessage(sender, message) {
    // Create main container for the message
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', sender);

    // Create sender label
    const senderLabel = document.createElement('div');
    senderLabel.classList.add('sender-name', sender);
    senderLabel.innerText = sender === 'user' ? 'You' : 'ChatBot';

    // Create a <div> for the message bubble
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    // create a <p> element for the message text
    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;

    // Create a <div> for the timestamp
    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // add the message text and timestamp to the message bubble
    messageElement.appendChild(messageParagraph);
    messageElement.appendChild(timestampElement);

    // Add sender label and message to the message container
    messageContainer.appendChild(senderLabel);
    messageContainer.appendChild(messageElement);

    // Add the message container to the chat log
    chatLog.appendChild(messageContainer);

    // Auto-scroll to the bottom of the chat log
    setTimeout(() => {
        chatLog.scrollTop = chatLog.scrollHeight;
    }, 100);
}

function getChatbotResponse(userMessage) {
    // Make a request to your server with the user's message
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot's response
        displayMessage('chatbot', data.chatbotResponse);
        // Hide typing indicator
        hideTypingIndicator();
    })
    .catch(error => console.error('Error:', error));
}

// Event listener to send message when pressing "Enter"
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent line break in input field
        sendMessage();
    }
});