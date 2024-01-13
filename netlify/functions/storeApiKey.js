
exports.handler = async function (event, context) {
    try {
        // Access the OpenAI API key from environment variables
        const openaiApiKey = process.env.OpenAI_SK;

        // You can use the API key for further processing
        console.log("API key:", openaiApiKey);

        return {
            openaiApiKey
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
