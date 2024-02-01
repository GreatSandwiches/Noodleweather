document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('unit-toggle');
    if (button) {
      button.addEventListener('click', function() {
        if (button.textContent.includes('Fahrenheit')) {
          button.textContent = 'Switch to Celsius';
          getWeather(location, 'imperial');
        } else {
          button.textContent = 'Switch to Fahrenheit';
          getWeather(location, 'metric');
        }
      });
    }
  });