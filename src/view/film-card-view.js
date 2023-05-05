import { createElement } from '../render.js';
import { humanizeFilmReleaseDate, humanizeFilmDuration } from '../utils.js';

function getControls(controlsData) {
  const inWatchlist = controlsData.watchlist ? 'film-card__controls-item--active' : '';
  const isWatched = controlsData.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavorite = controlsData.favorite ? 'film-card__controls-item--active' : '';

  return `<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${inWatchlist}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
  </div>`;
}

const createFilmCardTemplate = (film) => {
  const { filmInfo, comments, userDetails } = film;
  const releaseDate = humanizeFilmReleaseDate(filmInfo.release.date);
  const duration = humanizeFilmDuration(filmInfo.duration);
  const genre = filmInfo.genre.join(', ');
  const description = filmInfo.description.substring(0, 139).concat('...');
  const controls = getControls(userDetails);

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
  ${controls}
  </article>`;
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
