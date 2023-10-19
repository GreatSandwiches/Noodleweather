document.addEventListener('DOMContentLoaded', function() {

let locationInput;

async function getLocation() {
   locationInput = document.querySelector('#locationInput');
  const submitButton = document.querySelector('#submitbutton');
  const resetButton = document.querySelector('#resetButton'); 

  // Check if the user's choice is already saved in local storage
  const savedLocation = localStorage.getItem('mainLocation');
  if (savedLocation) {
    locationInput.value = savedLocation;
    submitButton.click();
    resetButton.style.display = 'inline'; 
    return;
  }

  // Prompt the user for their main location
  const location = prompt("Please input your main location:");
  if (!location) {
    return;
  }
  const userlocation = location.trim();

  // Save the user's choice to local storage
  localStorage.setItem('mainLocation', userlocation);

  const weatherForm = document.querySelector('#weatherForm');

  console.log("User input location:", userlocation);

  locationInput.value = userlocation;
  submitButton.click();
  resetButton.style.display = 'inline'; 
}

const resetButton = document.querySelector('#resetButton');
if (resetButton) {
  resetButton.addEventListener('click', function() {
    localStorage.removeItem('mainLocation');
    locationInput.value = '';
    resetButton.style.display = 'none';
    getLocation();
  });
}

window.onload = function() {
  getLocation();
};
})