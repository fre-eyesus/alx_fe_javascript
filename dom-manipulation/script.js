
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
  uniqueCategories.forEach(cat =>{
    let option = document.createElement("option");
    option.value =  cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  })

}

window.addEventListener("load", () => {
  const categorySelect = document.getElementById("categoryFilter");
  const lastSelectedCategory = JSON.parse(localStorage.getItem("lastSelectedCategory"));
  
  if (lastSelectedCategory) {
    categorySelect.value = lastSelectedCategory; 
  }
  filterQuotes();
});



function filterQuotes() {

  quoteDisplay.innerHTML = "";
  let selectedCategory = categorySelect.value;
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
  quotes.push(filteredQuotes);

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