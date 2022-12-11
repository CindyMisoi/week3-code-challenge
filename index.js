//retrive film data
function retriveData(film){
    fetch(`http://localhost:3000/films`)
    .then(res=>res.json())
    .then(data => console.log(data))
}
retriveData()