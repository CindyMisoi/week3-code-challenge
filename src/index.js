const baseUrl = 'http://localhost:3000/films';

//fetch film data
function getFilmData(){
    return fetch(baseUrl)
    .then(res => res.json())
    .then(data => console.log(data))
}

//get movie titles 
function getMovieTitles(){
return fetch(baseUrl)
.then(res => res.json())
}


//render movie titles to the DOM
function renderMovieTitleList(film){
const unoderedList = document.querySelector('#films')
const movieTitleList = document.createElement('li')
movieTitleList.dataset.id = film.id;
movieTitleList.className = "lists"
movieTitleList.textContent = film.title
unoderedList.appendChild(movieTitleList)
unoderedList.addEventListener('click', onTitleClick)
}
getMovieTitles().then(films => films.forEach(film => {
    renderMovieTitleList(film)
}))

//get movie info
function getMovieDetails (id) {
    return fetch(baseUrl + `/${id}`)
    .then(response => response.json())
}

//click title to get details and change the poster
function onTitleClick(e){
    getMovieDetails(e.target.dataset.id)
    .then(renderMovieDetails)
    // console.log(e.target.getAttribute('id') + ' is clicked'); 
    // const target = e.target
    // target.style.background = "lightgrey"
    // if(target == document.getElementById("films")){
    //   getMovieDetails(renderMovieDetails(film))
    // }
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
    e.preventDefault()
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
