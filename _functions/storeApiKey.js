
// Access the OpenAI API key from environment variables
const openaiApiKey = process.env.OpenAI_SK;

exports.handler = async function (event, context) {
    try {
        // Store the API key securely
        process.env.OPENAI_API_KEY = openaiApiKey;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "API key stored successfully" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
