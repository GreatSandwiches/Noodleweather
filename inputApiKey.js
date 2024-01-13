
// function to optain openai key from user

function inputApiKey() {

    var apiKey = prompt("Please enter your OpenAI API Key:");

    if (apiKey !== null && apiKey !== "") {

        localStorage.setItem("openApiKey", apiKey);

        location.reload();

    } else {
        alert("You need to enter a valid OpenAI key.")
    }
}