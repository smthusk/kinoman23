export default class FiltersModel {
  #filters = null;
  #films = null;

  constructor(filmsModel) {
    this.#films = filmsModel.films;
    this.currentFilter = 'all';
  }

  get filters() {
    this.#filters = {
      all: 'all',
      watchlist: this.#films.filter((film) => film.userDetails.watchlist).length,
      alreadyWatched: this.#films.filter((film) => film.userDetails.alreadyWatched).length,
      favorite: this.#films.filter((film) => film.userDetails.favorite).length
    };

    return this.#filters;
  }
}
