// For quotes on the main page
var quotes = $(".quotes"), quoteIndex = -1, duration = 1000
function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length)
        .fadeIn(duration)
        .delay(duration)
        .fadeOut(duration, showNextQuote)
}
showNextQuote()