import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFilmReleaseDate, humanizeFilmDuration } from '../utils.js';

const FILM_DESCRIPTION_MAX_LENGTH = 139;

function getControls(userDetails) {
  const isInWatchlist = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const isWatched = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavorite = userDetails.favorite ? 'film-card__controls-item--active' : '';

  return `<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isInWatchlist}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
  </div>`;
}

const createFilmCardTemplate = (film) => {
  const { filmInfo, comments, userDetails } = film;
  const releaseDate = humanizeFilmReleaseDate(filmInfo.release.date);
  const duration = humanizeFilmDuration(filmInfo.duration);
  const genre = filmInfo.genre.join(', ');
  const description = filmInfo.description.substring(0, FILM_DESCRIPTION_MAX_LENGTH).concat('...');

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  ${getControls(userDetails)}
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#handleClick);
  }

  #handleClick = () => this._callback.click();
}
