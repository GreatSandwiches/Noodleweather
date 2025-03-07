document.addEventListener('DOMContentLoaded', () => {

  async function callchatgpt() {
    const humidity = document.getElementById('humidityvalue').innerHTML;
    const conditions = document.getElementById('Conditions').innerHTML;
    const weathertemperature = document.getElementById('bigweathertemp').innerHTML;
    const location = document.getElementById('locationdata').innerHTML;
    const windspeed = document.getElementById('windspeedvalue').innerHTML;
    console.log(humidity + conditions + weathertemperature + location);

      try {
        const apiKey = await fetchApiKey();
        const openaiSecretKey = apiKey;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiSecretKey}`,
        };

        const promptSelector = document.getElementById('settingsPopup').querySelector('#promptSelector');
        const responseDiv = document.getElementById('settingsPopup').querySelector('#apidata');

        const promptValue = promptSelector.value;
        const prompt = getPrompt(promptValue);

        const data = {
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.5,
            max_tokens: 250,
            n: 1,
            stream: false,
        };

        const url = "https://api.openai.com/v1/chat/completions";

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const json = await response.json();
            console.log(json.choices[0].message.content);
            const messagecontent = json.choices[0].message.content;
            responseDiv.innerHTML = `<p>${messagecontent}</p>`;
        }
    } catch (error) {
        console.error(error);
    }
}

function getPrompt(promptType) {
    // Define your prompts based on the selected dropdown option
    const prompts = {
        prompt1: `Give me a forecast that's as cheeky and entertaining as Carrot Weather. Bonus points for throwing in an extra snarky remark. Make meteorology sound as fun as a stand-up comedy routine! Write me a snarky, concise comment about the current weather in  ${location}. Use these conditions to base your comment off of: which is: ${weathertemperature} degrees, ${conditions}, ${humidity} humidity, windspeed of ${windspeed}.`,
        prompt2: `Write me a very short (80 words maximum) weather report for today's weather in ${location} which is: ${weathertemperature} degrees, ${conditions}, ${humidity} humidity, windspeed of ${windspeed}. Make the report noodle themed. And make sure it includes specific references towards ${location}.`

        // Add more prompts as needed
    };

    return prompts[promptType];
}
  

  function init() {
    const button = document.getElementById("weatherForm");
    button.addEventListener("submit", (event) => {
      event.preventDefault();
      setTimeout(callchatgpt, 1500);
    });
  }

  // Attach the function to the global scope
  window.callchatgpt = callchatgpt;

  init();

});
