// Fetches the API key from the serverless function and uses it to make a request to the API
async function fetchApiKey() {
    try {
        const response = await fetch("/.netlify/functions/storeApiKey");
        const data = await response.json();
        const apiKey = data.apiKey; // Extract the API key from the JSON response
        
        return apiKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        throw error; // Propagate the error up
    }
}
