
exports.handler = async function (event, context) {
    try {
        // Access the OpenAI API key from environment variables
        const openaiApiKey = process.env.OpenAI_SK;

        // Return the API key as part of the JSON response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "API key accessed successfully", apiKey: openaiApiKey }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};


