
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "success" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "perseverance" },
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categorySelect");

// Event Listeners
showQuoteBtn.addEventListener("click", showRandomQuote);
categorySelect.addEventListener("change", showRandomQuote);

// Create Add Quote Form Dynamically
createAddQuoteForm();
populateCategoryDropdown();

// Function to Populate Category Dropdown
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

// Function to Show a Random Quote Based on Selected Category
function showRandomQuote() {
  quoteDisplay.innerHTML = "";

  let selectedCategory = categorySelect.value;
  let filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

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

// Function to Dynamically Create Add Quote Form
function createAddQuoteForm() {
  let formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = ""; // Clear existing form

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

// Function to Add a New Quote
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
}
