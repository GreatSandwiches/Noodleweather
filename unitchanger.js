document.getElementById('unit-toggle').addEventListener('click', function() {
  const button = this;
  if (button.textContent.includes('Fahrenheit')) {
      button.textContent = 'Switch to Celsius';
      getWeather(location, 'imperial');
  } else {
      button.textContent = 'Switch to Fahrenheit';
      getWeather(location, 'metric');
  }
});