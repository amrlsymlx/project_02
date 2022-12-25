let currentPage = 1;
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')

// Get initial movies
getMovies(DISCOVER_URL+'&page='+currentPage)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''
  
  movies.forEach((movie) => {
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

// -------------------------------------------------

// -----------------Fetch Genre List----------------
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`)
.then(response => response.json())
.then(data => {
	const genres = data.genres;
	const genreSelect = document.getElementById('list');

	genres.forEach(genre => {
	const option = document.createElement('option');
	option.value = genre.id;
	option.textContent = genre.name;
	genreSelect.appendChild(option);
	});
});

// ---------------------------------------------------------------------------------

// const GENRE_API = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US'

// getList (GENRE_API)

// async function getList(url) {
//     const res = await fetch(url)
//     const data = await res.json()

//     // const genres = data['genres'];
//     const genres = data.genres;
// 	const genreSelect = document.getElementById('list');

// 	genres.forEach(genre => {
// 	    const option = document.createElement('option');
// 	    option.value = genre.id;
// 	    option.textContent = genre.name;
// 	    genreSelect.appendChild(option);
// 	});
// }


// ---------------------------------------------------

// ------------------Increment Button for Initial List------------------

const incrementButton = document.getElementById('next');
const decrementButton = document.getElementById('previous');
const page = document.getElementById('current');

function pageIncrease() {
  currentPage+=1;
  page.textContent = currentPage;
}

function pageDecrease() {
  currentPage -= 1;

  if (currentPage < 1) {
    currentPage = 1;
  }

  page.textContent = currentPage;
}

incrementButton.addEventListener('click', () => {
  pageIncrease()
  getMovies(DISCOVER_URL+'&page='+currentPage);
  
});

decrementButton.addEventListener('click', () => {
  pageDecrease()
  getMovies(DISCOVER_URL+'&page='+currentPage);
  
});

// ------------------------------------------------

const searchInput = document.querySelector('#search')
const genreSelect = document.querySelector('#list');

const dispInput = () => {
  const genre = genreSelect.value;
  const genreOption = genreSelect.querySelector(`option[value="${genre}"]`);
  const title = searchInput.value
  
  console.log(genreOption.value)
  console.log(title)
}

searchInput.addEventListener('input', dispInput);
