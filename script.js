// Get important elements from the page
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchHistory = document.getElementById('searchHistory');
const clearHistoryButton = document.getElementById('clearHistoryButton');

// Load search history from localStorage or start with an empty array
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to display search history on the page
function showSearchHistory() {
    // Clear the current list
    searchHistory.innerHTML = '';
    
    // Add each search term to the list
    for (let term of history) {
        let listItem = document.createElement('li');
        listItem.textContent = term;
        searchHistory.appendChild(listItem);
    }
}

// Function to add a new search term to history
function addSearch(term) {
    // Add the term to the beginning of the history array
    history.unshift(term);
    
    // Keep only the latest 10 searches
    if (history.length > 10) {
        history.pop();
    }
    
    // Save to localStorage and update the display
    localStorage.setItem('searchHistory', JSON.stringify(history));
    showSearchHistory();
}

// What happens when the search button is clicked
searchButton.addEventListener('click', function() {
    let term = searchInput.value.trim();
    if (term !== '') {
        addSearch(term);
        console.log('Searching for:', term);
        searchInput.value = ''; // Clear the input
    }
});

// What happens when the clear history button is clicked
clearHistoryButton.addEventListener('click', function() {
    history = []; // Clear the history array
    localStorage.removeItem('searchHistory'); // Clear from localStorage
    showSearchHistory(); // Update the display
});

// Show the initial search history when the page loads
showSearchHistory();