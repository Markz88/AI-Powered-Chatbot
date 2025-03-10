const { OPENAI_API_KEY } = require('./config'); // Create config.js with your API key

class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        const apiKey = OPENAI_API_KEY; // Get the OpenAI API key from the environment variables
        const endpoint = 'https://api.openai.com/v1/chat/completions'; // Define the API endpoint
        // Make a POST request to the OpenAI API
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                max_tokens: 150
            }),
        });
        const responseData = await response.json(); // Parse the JSON response
        // Log the entire API response for debugging
        console.log('Response from OpenAI API:', responseData);
        // Check if choices array is defined and not empty
        if (responseData.choices && responseData.choices.length > 0) {
            // Return the response content from the first choice
            return responseData.choices[0].text.trim();
        } else {
            // Handle the case where choices array is undefined or empty
            console.error('Error: No valid response from OpenAI API');
            return 'Sorry, I couldn\'t understand that.';
        }
    }
}
module.exports = { OpenAIAPI };