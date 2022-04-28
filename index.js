const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const main = document.getElementById('main')
const mainWatchList = document.getElementById('main-watchlist')
let dataSearch
let titlesData 
let myWatchList = []

// localStorage.clear()
const moviesFromLocalStorage = JSON.parse(localStorage.getItem('myList'))


if(moviesFromLocalStorage)    myWatchList = moviesFromLocalStorage

let apiSearch = event=>{
    event.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=ab553d3f&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response==="True"){
                dataSearch = data
            console.log(dataSearch)
            rearrangeData()
            }else notFound()
            
        })
}

function notFound(){
    document.querySelector('.starting-pag').innerHTML = `
        <h2>Unable to find what you’re looking for. Please try another search.</h2>
        `
}

searchBtn.addEventListener('click',apiSearch)



async function rearrangeData(){
    let titles = dataSearch.Search.map(item=> item.Title)
    console.log(titles)
    titlesData = []
    main.innerHTML=''
    for(let i=0; i<titles.length; i++){
        const res = await fetch(`http://www.omdbapi.com/?apikey=ab553d3f&t=${titles[i]}`)
        const movieData = await res.json()
        titlesData.push(movieData)
        renderSearchResults(movieData,i)
    }



}

function add(i){
    myWatchList.unshift(titlesData[i])

    localStorage.setItem('myList', JSON.stringify(myWatchList) )
    console.log(myWatchList)
    document.getElementById(`add-added${i}`).innerHTML = '<p class="Added">✔️ Added</p>'
}

function renderSearchResults(titleData,i){
    let inWatchlist = false
    for(movie of myWatchList) {
        if(movie.imdbID===titleData.imdbID){
            inWatchlist = true
            break
        }
    }
    let add
    inWatchlist? add = `<div id = "add-added${i}"><p class="Added">✔️ Added</p></div>` :
        add =`<div id = "add-added${i}"><button class="add-remove" id="add${i}" onclick ="add(${i})"><img src="./img/add.png" alt="plus"/> Watchlist</button></div>`
    
        main.innerHTML += `
            <div class="movie">
                <img src=${titleData.Poster} alt="" />
                <div class="info">
                    <div class="f-line">
                        <h2 class="movie-title">${titleData.Title}</h2>
                        <img src="./img/star.png" alt="star" />
                        <p class="rating">${titleData.imdbRating}</p>
                    </div>
                    <div class="s-line">
                        <p class="duration">${titleData.Runtime}</p>
                        <p class="genre">${titleData.Genre}</p>
                        ${add}
                    </div>
                    <p class="description">${titleData.Plot}</p>
                </div>
            </div>
        `
    
    return console.log('render done',i)
}

// console.log(myWatchList)