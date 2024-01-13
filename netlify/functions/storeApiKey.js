
exports.handler = async function (event, context) {
    try {
        // Access the OpenAI API key from environment variables
        const openaiApiKey = process.env.OPENAI_API_KEY;

        // You can use the API key for further processing
        console.log("API key:", openaiApiKey);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "API key accessed successfully" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
