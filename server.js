// Description: This file contains the server-side code for the chatbot application.
// It creates an express server that serves the static files in the public directory and listens for POST requests to the /getChatbotResponse endpoint.
// When a POST request is received, it uses the OpenAIAPI class to generate a response using the OpenAI API and sends the response back to the client.  

const express = require('express'); // Import express module
const path = require('path'); // Import path module
const { OpenAIAPI } = require('./openai'); // Import OpenAIAPI class

const app = express(); // Create an express application 
const port = 3000; // Set the port to the environment port or 3000

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files in the public directory
app.use(express.json()); // Parse JSON bodies

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send the index.html file
});

// Define a route for the /getChatbotResponse endpoint
app.post('/getChatbotResponse', async (req, res) => {
    const userMessage = req.body.userMessage;

    // Use OpenAI API to generate a response
    const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);

    // Send the response back to the client
    res.json({ chatbotResponse });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});