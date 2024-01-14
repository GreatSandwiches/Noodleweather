
document.addEventListener("DOMContentLoaded", function() {
  
  const form = document.getElementById('weatherForm');
  const locationInput = document.getElementById('locationInput');
  const bigweathertemp = document.getElementById('bigweathertemp');
  const weathericon = document.getElementById('weathericon');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;
    console.log(location);
    getWeather(location);
  });

  function getWeather(location) {
    const apiKey = 'dea21c2780e5b55746cd4d2be3b8cab3';
    const encodedLocation = encodeURIComponent(location);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&units=metric&appid=${apiKey}`;
    
    // Make api call
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weathertemperature = data.main.temp;
        const conditions = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const airPressure = data.main.pressure;

        bigweathertemp.innerHTML = `${weathertemperature} &deg;C`;
        const conditionsSpan = document.getElementById('Conditions');
        conditionsSpan.innerHTML = conditions;
        locationdata.innerHTML = location;
        // Change icon based off of conditions
        if (conditions.includes('rain') || conditions.includes('drizzle')) {
          weathericon.innerHTML = '<i class="wi wi-day-rain"></i>';
        } else if (conditions.includes('cloud')) {
          weathericon.innerHTML = '<i class="wi wi-day-cloudy"></i>';
        } else if (conditions.includes('clear')) {
          weathericon.innerHTML = '<i class="wi wi-day-sunny"></i>';
        } else if (conditions.includes('snow')) {
          weathericon.innerHTML = '<i class="wi wi-day-snow"></i>';
        } else if (conditions.includes('fog')) {
          weathericon.innerHTML = '<i class="wi wi-day-fog"></i>';
        } else {
          weathericon.innerHTML = '<i class="wi wi-day-cloudy"></i>';
        }

        // Input weatherdata
        const humiditySpan = document.getElementById('humidityvalue');  
        humiditySpan.innerHTML = `${humidity}%`;
        const windSpeedSpan = document.getElementById('windspeedvalue');
        windSpeedSpan.innerHTML = `${windSpeed} m/s`;
        const airPressureSpan = document.getElementById('airpressurevalue');
        airPressureSpan.innerHTML = `${airPressure} hPa`;

        // Pexels api for background img  
        setTimeout(() => {
          fetch(`https://api.pexels.com/v1/search?query=${location}&per_page=1&page=1&orientation=landscape`, {
            headers: {
              Authorization: "gSpYX4kZnMU9ZOnBNI15BctgnR5DfCUtNrHZvg3qov71er0uaCIxfFd9",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (typeof data.total_results === "number" && data.total_results > 0) {
                const perPage = 1;
                const randomPage = Math.floor(Math.random() * data.total_results / perPage) + 1;
                fetch(`https://api.pexels.com/v1/search?query=${location}&per_page=${perPage}&page=${randomPage}&orientation=landscape`, {
                  headers: {
                    Authorization: "gSpYX4kZnMU9ZOnBNI15BctgnR5DfCUtNrHZvg3qov71er0uaCIxfFd9",
                  },
                })
                .then((response) => {
                  console.log(response);
                  return response.json();
                })
                .then((data) => {
                  if (data.photos && data.photos.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.photos.length);
                    const randomPhoto = data.photos[randomIndex];
                    const randomImage = randomPhoto.src.original;
                    const authorLink = randomPhoto.photographer_url;
                
                    document.body.style.backgroundImage = `url(${randomImage})`;
                    localStorage.setItem("backgroundImage", randomImage);
                    localStorage.setItem("authorLink", authorLink);
                
                    console.log(randomImage);
                    console.log("Author Link:", authorLink);
                  } else {
                    console.log("No photos found in response.");
                  }
                })
                
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log("Invalid total_results value in API response.");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1000);
        
        
        
})

    


     
      .catch(error => {
        console.log(error);
        bigweathertemp.innerHTML = 'Unable to retrieve weather data.';
      });
      
  }
});
