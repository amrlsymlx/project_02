function showMovies(movies, genreId) {
    main.innerHTML = ''
  
    movies.forEach((movie) => {
      // Check if the movie's genre IDs array includes the selected genre ID
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
  