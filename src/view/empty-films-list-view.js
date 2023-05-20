import { createElement } from '../render.js';

const titles = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now'
};

const createEmptyFilmsListTemplate = (sortState = 'all') => {
  const state = sortState.toLowerCase();
  return `<section class="films-list">
  <h2 class="films-list__title">${titles[state]}</h2>
  </section>`;
};

export default class EmptyFilmsListView {
  #element = null;

  get template() {
    return createEmptyFilmsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
