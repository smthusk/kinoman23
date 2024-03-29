import { generateFilm } from '../mock/films.js';

const FILMS_COUNT = 18;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_COUNT }, generateFilm);

  get films() {
    return this.#films;
  }
}
