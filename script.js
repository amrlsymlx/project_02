let currentPage = 1;
const apik = '3fd2be6f0c70a2a598f084ddfb75487c';
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='+apik+'&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key='+apik+'&query='

const main = document.getElementById('main')
const genreSelect = document.getElementById('list');


// Get initial movies
getMovies(DISCOVER_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies, genreId) {
    main.innerHTML = ''

    movies.forEach((movie) => {

        if (genreId && !movie.genre_ids.includes(genreId)) {
            return;
        }

        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//----------------------Genre List Fetch ----------------------------------

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=`+apik+`&language=en-US`)
.then(response => response.json())
.then(data => {
	const genres = data.genres;
	// const genreSelect = document.getElementById('list');

	genres.forEach(genre => {
	const option = document.createElement('option');
	option.value = genre.id;
	option.textContent = genre.name;
	genreSelect.appendChild(option);
	});
});

//------------------------Search Function --------------------------------

const goButton = document.getElementById('go-button');
const search = document.getElementById('search')


goButton.addEventListener('click', (e) => {
    e.preventDefault()

    const genreVal = genreSelect.value;
    const genreOption = genreSelect.querySelector(`option[value="${genreVal}"]`);
    const searchTerm = search.value
    const genreID = genreOption.value

    console.log(genreID)
    console.log(searchTerm)

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm+'&with_genres='+genreID)

        search.value = ''
    } else {
        window.location.reload()
    }
})

// ------------------Increment Button for Initial List------------------

const incrementButton = document.getElementById('next');
const decrementButton = document.getElementById('previous');
const page = document.getElementById('current');

const updatePage = (newPage) => {
    currentPage = newPage;

    if (currentPage <= 0) {
        currentPage = 1
    }

    page.textContent = currentPage;
    getMovies(DISCOVER_URL + currentPage);
}

incrementButton.addEventListener('click', () => updatePage(currentPage + 1));
decrementButton.addEventListener('click', () => updatePage(currentPage - 1));

