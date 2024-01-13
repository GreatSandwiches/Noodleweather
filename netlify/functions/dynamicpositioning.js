document.addEventListener('DOMContentLoaded', () => {

// Get references to the "apidata" and "searchresults" divs
const apidataDiv = document.getElementById('apidata');
const searchResultsDiv = document.getElementById('searchresults');

// Function to update the position of the "searchresults" div based on the height of the "apidata" div
function updateSearchResultsPosition() {
  const apidataHeight = apidataDiv.offsetHeight; // Get the height of the "apidata" div
  searchResultsDiv.style.top = `${apidataHeight + 50}px`; // Adjust the top position as needed
}

// Call the function initially and whenever the content of "apidata" div changes
updateSearchResultsPosition();

})