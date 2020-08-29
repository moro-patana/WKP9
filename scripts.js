// Grab the url where we fetch the data
const baseEndpoint = 'https://ghibliapi.herokuapp.com/films';

// Grab the element which we want to put the html
const moviesEl = document.querySelector(`.movies`);

// Use async function to wait for the response
async function fetchFilms(movie) {
    const response = await fetch(`${baseEndpoint}`);

// Turn the object into string
    const data = await response.json();
// Sort the data from the high score to the lower
    data.sort(function(a, b) {
        return b.rt_score - a.rt_score;
    })
    return data;
}
const handleMovies = async movie => {
    const movies = await fetchFilms(movie);
    console.log(movies);
    displayFilms(movies);
}
function displayFilms(movies) {
    // Map through the movies tocreate an html
    const html = movies.map(movie => {
        return `
           <div class="movie">
              <div class="heading">
                <h2>${movie.title}</h2>
                <span class="release_date">${movie.release_date}</span>
                <span class="score">${movie.rt_score}</span>
                </div>
                <p class="description">
                 ${movie.description}
                </p>
                <ul class="more">
                    <li>${movie.director}</li>
                    <li>${movie.producer}</li>
                </ul>
           </div>
        `;
    });
    moviesEl.innerHTML = html.join('');
};

handleMovies();