const quotes = [
  { motivation: "The only way to do great work is to love what you do." },
  { inspiration: "In the middle of every difficulty lies opportunity." },
  { success: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
  { life: "Your time is limited, so don’t waste it living someone else’s life." },
  { perseverance: "Do what you can, with what you have, where you are." },
  { determination: "It always seems impossible until it’s done." },
  { happiness: "Happiness depends upon ourselves." },
  { mindfulness: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment." },
  { productivity: "The secret of getting ahead is getting started." },
  { confidence: "Believe you can and you're halfway there." }
];


const showBtn = document.getElementById("newQuote");
showBtn.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  const display = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  

  const randomQuoteObject = quotes[randomIndex];
  
  const randomCategory = Object.keys(randomQuoteObject)[0]; 
  
 
  const randomQuote = randomQuoteObject[randomCategory];
  
 
  let quote = document.createElement("p");
  quote.innerHTML = randomQuote;
  display.appendChild(quote);
  quote.classList.add("random-quote");
}

function addQuote(){
  let quoteInput = document.getElementById("newQuoteText").value;
  let categoryInput = document.getElementById("newQuoteCategory").value.toLowerCase();

  let addedQuote = { [categoryInput] : quoteInput};
  if(quoteInput && categoryInput){
    quotes.push(addedQuote);
  }
  else{
    alert("Quote and category filled must be filled");
  }
  qouteInput.innerHTML = "";
  categoryInput.innerHTML="";

}

