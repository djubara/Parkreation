
const searchFormEl = document.querySelector('#search')
const searchInputEl = document.querySelector('#search-input')

searchFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
    window.location.href = (`/state/${searchInputEl.value}`)
})