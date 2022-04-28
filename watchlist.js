const mainWatchList = document.getElementById('main-watchlist')
let dataSearch
let titlesData 
let myWatchList = []

// localStorage.clear()
const moviesFromLocalStorage = JSON.parse(localStorage.getItem('myList'))
console.log("myList",moviesFromLocalStorage)
console.log(myWatchList.length)
console.log(moviesFromLocalStorage)

if(moviesFromLocalStorage){
    myWatchList = moviesFromLocalStorage
    renderWatchList()
    if (moviesFromLocalStorage.length<1) emptyList()
}



function remove(i){
    console.log('remove',i)
    myWatchList.splice(i,1)
    localStorage.setItem('myList', JSON.stringify(myWatchList) )
    myWatchList.length > 0? renderWatchList() : emptyList()
    
    console.log(myWatchList)
}

function emptyList(){
    mainWatchList.innerHTML=`
        <div class="starting-pag">
            <h2>Your watchlist is looking a little empty...</h2>
            <a href="./index.html"
            ><h3>
                <img src="./img/add.png" alt="plus" /> Let’s add some movies!
            </h3>
            </a>
        </div>`
}


function renderWatchList(){
    mainWatchList.innerHTML=''
    for (let i=0; i<myWatchList.length; i++) {
        const {Poster,Title,imdbRating,Runtime,Genre,Plot} = myWatchList[i]
        mainWatchList.innerHTML += `
            <div class="movie">
                <img src=${Poster} alt="" />
                <div class="info">
                    <div class="f-line">
                        <h2 class="movie-title">${Title}</h2>
                        <img src="./img/star.png" alt="star" />
                        <p class="rating">${imdbRating}</p>
                    </div>
                    <div class="s-line">
                        <p class="duration">${Runtime}</p>
                        <p class="genre">${Genre}</p>
                        <button class="add-remove" id="remove${i}" onclick ="remove(${i})"><img src="./img/remove.png" alt="plus"/> Remove</button>
                    </div>
                    <p class="description">${Plot}</p>
                </div>
            </div>
        `
    }
}
