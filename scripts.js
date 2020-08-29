const baseEndpoint = 'https://ghibliapi.herokuapp.com/films';
const moviesEl = document.querySelector(`.movies`);
async function fetchFilms(movie) {
    const response = await fetch(`${baseEndpoint}`);
    const data = await response.json();
    data.sort(function(a, b) {
        return b.rt_score - a.rt_score;
    })
    return data;
}
const handleSubmit = async movie => {
    const movies = await fetchFilms(movie);
    console.log(movies);
    displayFilms(movies);
}
function displayFilms(movies) {
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

handleSubmit();