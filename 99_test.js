`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&with_genres=${genreId}`


// Get the list of movie genres
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const genres = data.genres;
    // Find the genre id for "Action" movies
    const actionGenre = genres.find(genre => genre.name === 'Action');
    if (actionGenre) {
      const genreId = actionGenre.id;
      // Search for movies with the "Action" genre
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&with_genres=${genreId}`)
        .then(response => response.json())
        .then(data => {
          // Filter the movie list to only include movies with the "Action" genre
          const actionMovies = data.results.filter(movie => movie.genre_ids.includes(genreId));
          // Display the list of action movies
          actionMovies.forEach(movie => {
            // create an element for each movie and append it to the DOM
          });
        });
    }
  });





  // Get the list of movie genres
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const movieTitle = 'Top'

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const genres = data.genres;
    // Find the genre id for "Action" movies
    const actionGenre = genres.find(genre => genre.name === 'Action');
    if (actionGenre) {
      const genreId = actionGenre.id;
      // Search for movies with the "Action" genre
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&with_genres=${genreId}`)
        .then(response => response.json())
        .then(data => {
          // Filter the movie list to only include movies with the "Action" genre
          const actionMovies = data.results.filter(movie => movie.genre_ids.includes(genreId));
          // Display the list of action movies
          document.getElementById("movies").innerHTML = actionMovies
          console.log(actionMovies);
          actionMovies.forEach(movie => {
            // create an element for each movie and append it to the DOM
          });
        });
    }
});