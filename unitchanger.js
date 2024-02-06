// Prototype for ability to change units from imperial to metric and vice versa (not currently implemented/working)
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