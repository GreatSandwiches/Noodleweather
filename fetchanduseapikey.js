async function fetchApiKey() {
    try {
        const response = await fetch("/.netlify/functions/storeApiKey");
        const data = await response.json();
        const apiKey = data.apiKey; // Make sure this matches the actual structure of the response
    } catch (error) {
        console.error("Error fetching API key:", error);
        
    }
}
