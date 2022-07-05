import { searchMarvelCharacters } from "./marvelService.js"

const DEFAULT_SEARCH_TERM = "spider"

// Run a search once on page load (before the user gets a chance to enter a new search term),
// so that the page starts with some characters already displayed:
searchMarvelCharacters(DEFAULT_SEARCH_TERM)

// Handle search form submissions...
document
    .querySelector("#search-form")
    .addEventListener("submit", event => {
        event.preventDefault()  // Prevent the form from doing its default behavior of refreshing the page.

        const searchInputElement = event.target.elements.search
        searchMarvelCharacters(searchInputElement.value || DEFAULT_SEARCH_TERM)
    })



console.log("Log #1: When does this run?")
const timerId1 = setTimeout(() => console.log("Log #2: When does this run?"), 100000)
const timerId2 = setTimeout(() => console.log("Log #3: When does this run?"), 40000)
console.log("Log #4: When does this run?")
const timerId3 = setInterval(() => console.log("Log #5: When does this run?"), 10000)

// Execution order: 1, 4, 5, 5, 5, 3, 5, 5, 5, 2

// But what if we want to cancel timer 1?
// "The global clearTimeout() method cancels a timeout timer previously established by calling setTimeout()."
// "The global clearInterval() method cancels an interval timer previously established by calling setInterval()."

clearTimeout(timerId1) // Timer 1 cancelled!
clearInterval(timerId3) // Timer 3 cancelled!

// This is especially useful with setInterval()


// Questions?