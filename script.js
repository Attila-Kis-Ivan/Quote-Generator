'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden= true;
    }
}
// Show new quote
function newQuote () {
    showLoadingSpinner() ;
    // pick a randon quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//Check author field is blank
    if (!quote.author) {
    author.textContent = "Unknown"
}   else {
    authorText.textContent = quote.author;
}
    //Check the quote length 
    if(quote.text.length > 120 ) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}
// get quotes from API 
async function getQuotes() {
    showLoadingSpinner() ;
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert("Hmm, somthing went wrong", error)
    }
};
// Tweet Qoute 
function tweetQuote() {
    const twitterUrl =  `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, '_blank');
}
// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
