document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('weatherForm');
  const locationInput = document.getElementById('locationInput');
  const bigweathertemp = document.getElementById('bigweathertemp');
  const weathericon = document.getElementById('weathericon');
  const units = 'metric';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;
    getWeather(location, units);
  });

  function getWeather(location, units = 'metric') {
    const apiKey = 'dea21c2780e5b55746cd4d2be3b8cab3';
    const encodedLocation = encodeURIComponent(location);
    const locationWithoutSpaces = encodedLocation.replace(/\+/g, '');

    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&units=${units}&appid=${apiKey}`)
      .then(response => response.json())
      .then(currentData => {
        // Update current weather display
        const weathertemperature = currentData.main.temp;
        const conditions = currentData.weather[0].description;
        const iconCode = currentData.weather[0].icon;

        bigweathertemp.innerHTML = `${Math.round(weathertemperature)} °C`;
        document.getElementById('Conditions').textContent = conditions;
        document.getElementById('locationdata').textContent = currentData.name;
        
        // Update weather icon using icon code
        weathericon.innerHTML = `<i class="wi ${getWeatherIconClass(iconCode)}"></i>`;

        // Update additional weather info
        document.getElementById('humidityvalue').textContent = `${currentData.main.humidity}%`;
        document.getElementById('windspeedvalue').textContent = `${currentData.wind.speed} m/s`;
        document.getElementById('airpressurevalue').textContent = `${currentData.main.pressure} hPa`;

        // Fetch 5-day forecast
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodedLocation}&units=${units}&appid=${apiKey}`)
          .then(response => response.json())
          .then(forecastData => {
            display5DayForecast(forecastData.list);
          })
          .catch(error => console.log('Forecast error:', error));

        // Fetch background image
        fetchPexelsBackground(locationWithoutSpaces);
      })
      .catch(error => {
        console.log('Current weather error:', error);
        bigweathertemp.innerHTML = 'Unable to retrieve weather data.';
      });
  }

  function display5DayForecast(forecastList) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';
    
    const dailyForecasts = {};
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = {
          temps: [],
          icons: []
        };
      }
      
      dailyForecasts[dayKey].temps.push(item.main.temp);
      dailyForecasts[dayKey].icons.push(item.weather[0].icon);
    });
  
    Object.keys(dailyForecasts).slice(0, 5).forEach(day => {
      const dayData = dailyForecasts[day];
      const maxTemp = Math.round(Math.max(...dayData.temps));
      const minTemp = Math.round(Math.min(...dayData.temps));
      const mostCommonIcon = mode(dayData.icons);
  
      const forecastDay = document.createElement('div');
      forecastDay.className = 'forecast-day';
      forecastDay.innerHTML = `
        <div class="forecast-date">${day}</div>
        <i class="wi ${getWeatherIconClass(mostCommonIcon)}"></i>
        <div class="forecast-temps">
          <span>${maxTemp}°</span>
          <span>${minTemp}°</span>
        </div>
      `;
      container.appendChild(forecastDay);
    });
  }

  function fetchPexelsBackground(location) {
    fetch(`https://api.pexels.com/v1/search?query=${location}&per_page=1&orientation=landscape`, {
      headers: { Authorization: "gSpYX4kZnMU9ZOnBNI15BctgnR5DfCUtNrHZvg3qov71er0uaCIxfFd9" }
    })
    .then(response => response.json())
    .then(data => {
      if (data.photos?.length > 0) {
        const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
        document.body.style.backgroundImage = `url(${randomPhoto.src.original})`;
        localStorage.setItem("backgroundImage", randomPhoto.src.original);
      }
    })
    .catch(error => console.log('Pexels error:', error));
  }

  function getWeatherIconClass(iconCode) {
    const iconMap = {
      '01d': 'wi-day-sunny', '01n': 'wi-night-clear',
      '02d': 'wi-day-cloudy', '02n': 'wi-night-alt-cloudy',
      '03d': 'wi-cloud', '03n': 'wi-cloud',
      '04d': 'wi-cloudy', '04n': 'wi-cloudy',
      '09d': 'wi-showers', '09n': 'wi-showers',
      '10d': 'wi-day-rain', '10n': 'wi-night-rain',
      '11d': 'wi-thunderstorm', '11n': 'wi-thunderstorm',
      '13d': 'wi-snow', '13n': 'wi-snow',
      '50d': 'wi-fog', '50n': 'wi-fog'
    };
    return iconMap[iconCode] || 'wi-day-cloudy';
  }

  function mode(arr) {
    return arr.sort((a,b) => 
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
  }
});