const config = require("./config");

document.addEventListener('DOMContentLoaded', () => {

  async function callchatgpt() {
    const humidity = document.getElementById('humidityvalue').innerHTML;
    const conditions = document.getElementById('Conditions').innerHTML;
    const weathertemperature = document.getElementById('bigweathertemp').innerHTML;
    const location = document.getElementById('locationdata').innerHTML;
    const windspeed = document.getElementById('windspeedvalue').innerHTML;
    console.log(humidity + conditions + weathertemperature + location);

    // Set up the request payload with prompt
  
    const data = {
      model: "gpt-4",
      messages: [{ "role": "user", "content": `Write me a very short (80 words maximum) weather report for today's weather in ${location} which is: ${weathertemperature} degrees, ${conditions}, ${humidity} humidity, windspeed of ${windspeed}. Make the report noodle themed. And make sure it includs specific references towards ${location}.` }],
      temperature: 0.5,
      max_tokens: 250,
      n: 1,
      stream: false,
    };

    const openaiSecretKey = config.openaiSecretKey
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiSecretKey}`,
    };
    const url = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      console.log(response); 
      if (response.ok) {
        response.json().then((json) => {
          console.log(json);  
          console.log(json.choices[0].message.content)
          const messagecontent = (json.choices[0].message.content)
          document.getElementById('apidata').innerHTML = messagecontent;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function init() {
    const button = document.getElementById("weatherForm");
    button.addEventListener("submit", (event) => {
      event.preventDefault();
      setTimeout(callchatgpt, 1500);
    });
  }

  init();

});
