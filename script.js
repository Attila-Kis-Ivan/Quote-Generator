'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];
// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden= true;
}
// Show new quote
function newQuote () {
    loading()
    // pick a randon quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//Check author field is blank
if (!quote.author) {
    author.text.textContent = "Unknown"
} else {
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
    complete();
}
// get quotes from API 
async function getQuotes() {
    loading();
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
