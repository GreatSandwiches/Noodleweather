async function fetchApiKey() {
    try {
        const response = await fetch("/.netlify/functions/storeApiKey");
        const data = await response.json();
        const apiKey = data.apiKey; // Make sure this matches the actual structure of the response
        
        return apiKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        throw error; // Propagate the error up
    }
}
