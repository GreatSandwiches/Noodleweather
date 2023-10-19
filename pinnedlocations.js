document.addEventListener('DOMContentLoaded', function() {
    // Get references to the pin location button, pinned location list, and weather form
    const pinLocationButton = document.querySelector('#pinlocationbutton');
    const pinnedLocationList = document.querySelector('#pinnedlocationlist');
    const weatherForm = document.querySelector('#weatherForm');
    const submitButton = document.querySelector('#submitbutton');
  
    // Get the pinned locations from local storage
    let pinnedLocations = JSON.parse(localStorage.getItem('pinnedLocations')) || [];
  
    // Generate the HTML for the pinned location list and update the DOM
    const pinnedLocationListHTML = pinnedLocations.map((location, index) => {
      return `<li>${location} <button class="remove-button" data-index="${index}">Remove</button></li>`;
    }).join('');
    pinnedLocationList.innerHTML = pinnedLocationListHTML;
  
    // Add an event listener to the pin location button
    pinLocationButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the form from submitting
  
      // Get the location data
      const locationData = document.querySelector('#locationdata').textContent;
  
      // Check if the location is already in the pinned locations array
      if (pinnedLocations.includes(locationData)) {
        alert('Location already pinned!');
        return;
      }
  
      // Check if the maximum number of pinned locations has already been reached
      if (pinnedLocations.length >= 2) {
        alert('You can only pin up to 2 locations!');
        return;
      }
  
      // Add the location data to the pinned locations array
      pinnedLocations.push(locationData);
  
      // Save the pinned locations to local storage
      localStorage.setItem('pinnedLocations', JSON.stringify(pinnedLocations));
  
      // Generate the HTML for the pinned location list 
      const pinnedLocationListHTML = pinnedLocations.map((location, index) => {
        return `<li>${location} <button class="remove-button" data-index="${index}">Remove</button></li>`;
      }).join('');
      pinnedLocationList.innerHTML = pinnedLocationListHTML;
    });
  
    // Add a click event listener to the pinned location list
    pinnedLocationList.addEventListener('click', function(event) {
      // Check if a list item or remove button was clicked
      if (event.target.tagName === 'LI' && !event.target.classList.contains('removebutton')) {
        // Set the value of the location input field in the weather form to the clicked location
        const clickedLocation = event.target.textContent.replace(' Remove', '');
        weatherForm.elements['locationInput'].value = clickedLocation;
  
        // Trigger a click event on the submit button
        submitButton.click();
      } else if (event.target.classList.contains('remove-button')) {
        // Get the index of the clicked remove button
        const indexToRemove = event.target.dataset.index;
  
        // Remove the corresponding location from the pinned locations array
        pinnedLocations.splice(indexToRemove, 1);
  
        // Save the updated pinned locations to local storage
        localStorage.setItem('pinnedLocations', JSON.stringify(pinnedLocations));
  
        // Generate the HTML for the pinned location list
        const pinnedLocationListHTML = pinnedLocations.map((location, index) => {
          return `<li>${location} <button class="remove-button" data-index="${index}">Remove</button></li>`;
        }).join('');
        pinnedLocationList.innerHTML = pinnedLocationListHTML;
      }
    });
  });
  