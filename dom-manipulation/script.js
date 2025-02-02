
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "success" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "perseverance" },
];


const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categoryFilter");


showQuoteBtn.addEventListener("click", filterQuotes);
// categorySelect.addEventListener("change", showRandomQuote);
localStorage.setItem("quotes",JSON.stringify(quotes));


createAddQuoteForm();
populateCategories();
document.addEventListener("DOMContentLoaded",filterQuotes);
// populateCategoryDropdown();


function populateCategories(){
  categorySelect.innerHTMl = '<option value="all">All categories</option>';
  const uniqueCategories = [...new Set(quotes.map(q => q.category))]
  localStorage.setItem("categories",JSON.stringify(uniqueCategories));
  uniqueCategories.forEach(cat =>{
    let option = document.createElement("option");
    option.value =  cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  })

}

window.addEventListener("load", () => {
  
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes.length = 0; 
    quotes.push(...JSON.parse(savedQuotes)); 
  }

  // Restore categories from localStorage
  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    const uniqueCategories = JSON.parse(savedCategories);
    categorySelect.innerHTML = '<option value="all">All Categories</option>'; 

    uniqueCategories.forEach(cat => {
      let option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); 
      categorySelect.appendChild(option);
    });
  }

  // Restore the last selected category
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categorySelect.value = lastSelectedCategory; // Set the dropdown to the last selected category
  }

  // Display quotes based on the restored category
  filterQuotes();
});


function filterQuotes() {

  quoteDisplay.innerHTML = "";
  let selectedCategory = categorySelect.value;
  // save the selected category to local storage
  localStorage.setItem("lastSelectedCategory",selectedCategory);

  let filteredQuotes = selectedCategory === "all"? quotes: quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
      return;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  let quoteElement = document.createElement("p");
  quoteElement.innerHTML = `"${randomQuote.text}" <br><em>(${randomQuote.category})</em>`;
  quoteElement.classList.add("random-quote");
  
  quoteDisplay.appendChild(quoteElement);

 }

loadQuotesFromLocalStorage();
function createAddQuoteForm() {
  let formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = ""; 

  let formHTML = `
      <div class="quote-form">
          <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
          <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
          <button id="addQuoteBtn">Add Quote</button>
      </div>
  `;

  formContainer.innerHTML = formHTML;
  
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}


function addQuote() {
  let quoteInput = document.getElementById("newQuoteText").value.trim();
  let categoryInput = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!quoteInput || !categoryInput) {
      alert("Both quote and category fields must be filled!");
      return;
  }

  let newQuote = { text: quoteInput, category: categoryInput };
  quotes.push(newQuote);
  
  localStorage.setItem("quotes",JSON.stringify(quotes));

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
  populateCategories();
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Local storage implementation


function loadQuotesFromLocalStorage() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    const parsedQuotes = JSON.parse(savedQuotes);
    quotes.length = 0; 
    quotes.push(...parsedQuotes); 
  }
}


function exportQuotesToJSON() {
  const jsonBlob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(jsonBlob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url); 
}

exportBtn.addEventListener("click", exportQuotesToJSON); 

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}


async function fetchQuotes() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    console.log('Fetched quotes from server:', data);
    return data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}

// Get quotes from local storage
function getLocalQuotes() {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  return localQuotes;
}

// Update quotes in local storage
function updateLocalQuotes(quotes) {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Sync data with the server
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';



// Fetch quotes from the server (Simulated API)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl,{ method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify(quote)});
    const data = await response.json();
    console.log('Fetched quotes from server:', data);
    return data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

// Get local quotes from localStorage
function getLocalQuotes() {
  return JSON.parse(localStorage.getItem('quotes')) || [];
}

// Update local storage with quotes
function updateLocalQuotes(quotes) {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Sync Data with Server and Handle Conflicts
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let localQuotes = getLocalQuotes();

  let updatedQuotes = [];
  serverQuotes.forEach(serverQuote => {
    const localQuote = localQuotes.find(q => q.id === serverQuote.id);

    if (!localQuote || new Date(serverQuote.lastUpdated) > new Date(localQuote.lastUpdated)) {
      updatedQuotes.push(serverQuote);
    } else {
      updatedQuotes.push(localQuote);
    }
  });

  handleConflicts(localQuotes, serverQuotes);
  updateLocalQuotes(updatedQuotes);
}

// Handle Conflict Resolution
function handleConflicts(localQuotes, serverQuotes) {
  localQuotes.forEach(localQuote => {
    const serverQuote = serverQuotes.find(q => q.id === localQuote.id);

    if (serverQuote && new Date(localQuote.lastUpdated) > new Date(serverQuote.lastUpdated)) {
      showConflictModal(localQuote, serverQuote);
    }
  });
}

// Show Notification
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setInterval(() => {
    toast.remove();
  }, 3000);
}

// Show Conflict Resolution Modal
function showConflictModal(localQuote, serverQuote) {
  const modal = document.getElementById('conflict-modal');
  const conflictDetails = document.getElementById('conflict-details');
  const keepLocalButton = document.getElementById('keep-local');
  const keepServerButton = document.getElementById('keep-server');

  conflictDetails.innerHTML = `
    <p><strong>Local Version:</strong> ${localQuote.text} (Last Updated: ${localQuote.lastUpdated})</p>
    <p><strong>Server Version:</strong> ${serverQuote.text} (Last Updated: ${serverQuote.lastUpdated})</p>
  `;

  modal.style.display = 'flex';

  keepLocalButton.onclick = () => {
    resolveConflict(localQuote);
    modal.style.display = 'none';
  };

  keepServerButton.onclick = () => {
    resolveConflict(serverQuote);
    modal.style.display = 'none';
  };
}

// Resolve Conflict
function resolveConflict(selectedQuote) {
  let localQuotes = getLocalQuotes();
  localQuotes = localQuotes.filter(q => q.id !== selectedQuote.id);
  localQuotes.push(selectedQuote);
  updateLocalQuotes(localQuotes);
  showNotification(`Quotes synced with server! ${selectedQuote.id}`, 'success');
}

// Start Periodic Syncing Every 5 Minutes
function startSync() {
syncQuotes().then(() => {
    setTimeout(startSync, 5 * 60 * 1000);
  });
}

// Start Sync Process
startSync();
