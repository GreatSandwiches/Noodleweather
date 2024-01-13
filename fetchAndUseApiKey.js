
function fetchApiKey() {
    
    fetch("/.netlify/functions/storeApiKey")
        .then(response => response.json())
        .then(data => {
            if (data.message === "API key stored successfully") {
                // Use the API key for further processing
                console.log("API key retrieved successfully:", data);
            } else {
                console.error("Failed to retrieve API key:", data.error);
            }
        })
        .catch(error => console.error("Error fetching API key:", error));
}
