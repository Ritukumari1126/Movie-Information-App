const searchForm = document.querySelector('form')
const inputBox = document.querySelector(".inputBox")
const submitBtn = document.querySelector(".btn")
const movieContainer = document.querySelector(".movie-container")


const getMovieInfo = async(movie)=>{
    try{
        movieContainer.innerHTML = ''
        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=b9f43415&t=${movie}`
        const response = await fetch(url)

        if(!response.ok){
            throw new Error ("Unable to fetch movie data")
        }
        const data = await response.json()
        console.log(data)
        showMovieData(data)
    }
    catch(error){
        showErrorMessage("No Movie Found !!")
    }
}

const showMovieData = (data) => {
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;

    const movieElement = document.createElement('div')
    movieElement.classList.add('movie-info')
    movieElement.innerHTML = `<h2>${Title}</h2>
                             <p><strong> Rating : &#11088;</strong>${imdbRating}</p>`;


    const movieGenreElement = document.createElement('div')
    movieGenreElement.classList.add('movie-genre')

    Genre.split(",").forEach(element=>{
        const p = document.createElement('p')
        p.innerHTML = element;
        movieGenreElement.appendChild(p)
    })
    movieElement.appendChild(movieGenreElement)

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration :</strong>${Runtime}</p>
                                <p><strong>Cast :</strong>${Actors}</p>
                                <p><strong>Plot :</strong>${Plot}</p>`


    const moviePosterElement = document.createElement('div')
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src = "${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement)
    movieContainer.appendChild(movieElement)    

}

const showErrorMessage = (message)=>{
    movieContainer.innerHTML = `<strong>${message}</strong>`
}

// function to handel submit

const HandelFormSubmission = (e)=>{
    e.preventDefault()
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(movieName);
    }
    else{
       showErrorMessage("Enter Movie name to get Movie information")
    }
}

searchForm.addEventListener('submit' ,HandelFormSubmission)