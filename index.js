const baseUrl = 'http://localhost:3000/films';

//get movie titles 
function getMovieTitles(){
return fetch(baseUrl)
.then(res => res.json())
.then(films => films.forEach(film => renderMovieTitleList(film)))
}


//render movie titles to the DOM
function renderMovieTitleList(film){
const unoderedList = document.querySelector('#films')
const movieTitleList = document.createElement('li')
movieTitleList.className = "lists"
movieTitleList.textContent = film.title
unoderedList.appendChild(movieTitleList)
movieTitleList.addEventListener('click', onTitleClick)
}


//get movie info
function getMovieDetails (id) {
    return fetch(baseUrl + `/${2}`)
    .then(response => response.json())
}

//click title to get details and change the poster
function onTitleClick(event){
    getMovieDetails(event.target.dataset.id)
   .then(renderMovieDetails)
}


//render poster and other movie info to the DOM
function renderMovieDetails(film){
const posterChange = document.getElementById('poster')
posterChange.src = film.poster
const movieTitle = document.getElementById('title')
movieTitle.innerText = film.title
const runtime = document.getElementById('runtime')
runtime.innerText = film.runtime
const description = document.getElementById('film-info')
description.innerText = film.description
const showTime = document.getElementById('showtime')
showTime.innerText = film.showtime
const remainingTickets = document.getElementById('ticket-num')
remainingTickets.innerText = film.capacity - film.tickets_sold


//Buy ticket
const button = document.querySelector('.ui.orange.button')
button.addEventListener('click', (e)=>{
    if(remainingTickets.innerText <= 0){
        let buttonDiv = document.querySelector('.extra.content');
        buttonDiv.innerHTML=`<button>Sold Out</button>`
    }
    else{
        remainingTickets.innerText -= 1

    }
})
}
//loader
document.addEventListener('DOMContentLoaded', () => {
    getMovieTitles()
    getMovieDetails()
})
