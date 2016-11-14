// For quotes on the main page
var quotes = $(".quotes")
var quoteIndex = -1
var duration = 1000

function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length)
        .fadeIn(duration)
        .delay(duration)
        .fadeOut(duration, showNextQuote)
}
showNextQuote()