const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "success" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "perseverance" },
  { text: "It always seems impossible until it’s done.", category: "determination" },
  { text: "Happiness depends upon ourselves.", category: "happiness" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "mindfulness" },
  { text: "The secret of getting ahead is getting started.", category: "productivity" },
  { text: "Believe you can and you're halfway there.", category: "confidence" }
];

const showBtn = document.getElementById("newQuote");
showBtn.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  let quote = document.createElement("p");
  quote.innerHTML = `${randomQuote.text} <br><em>(${randomQuote.category})</em>`;
  display.appendChild(quote);
  quote.classList.add("random-quote");
}

function addQuote() {
  let quoteInputElement = document.getElementById("newQuoteText");
  let categoryInputElement = document.getElementById("newQuoteCategory");

  let quoteInput = quoteInputElement.value;
  let categoryInput = categoryInputElement.value.toLowerCase();

  if (!quoteInput || !categoryInput) {
    alert("Quote and category fields must be filled");
    return;
  }

  const categoryExists = quotes.some(quote => quote.category === categoryInput);
  if (categoryExists) {
    alert("Category already exists. Please choose a different category.");
    return;
  }

  let addedQuote = { text: quoteInput, category: categoryInput };
  quotes.push(addedQuote);

  quoteInputElement.value = "";
  categoryInputElement.value = "";

  console.log(quotes);
}