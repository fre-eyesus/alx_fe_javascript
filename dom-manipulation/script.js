
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "success" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "perseverance" },
];


const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categorySelect");


showQuoteBtn.addEventListener("click", showRandomQuote);
categorySelect.addEventListener("change", showRandomQuote);


createAddQuoteForm();
populateCategoryDropdown();


function populateCategoryDropdown() {
  categorySelect.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  uniqueCategories.forEach(category => {
      let option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
  });
}


function showRandomQuote() {
  quoteDisplay.innerHTML = "";

  let selectedCategory = categorySelect.value;
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
  

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
  populateCategoryDropdown();
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Local storage implementation


function loadQuotesFromLocalStorage() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    const parsedQuotes = JSON.parse(savedQuotes);
    quotes.length = 0; // Clear current quotes array
    quotes.push(...parsedQuotes); // Add saved quotes to the array
  }
}


function exportQuotesToJSON() {
  const jsonBlob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(jsonBlob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url); // Clean up the URL object
}

exportBtn.addEventListener("click", exportQuotesToJSON); // Export event

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