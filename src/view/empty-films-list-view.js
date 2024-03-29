import AbstractView from '../framework/view/abstract-view.js';

const titles = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now'
};

const createEmptyFilmsListTemplate = (sortState) => {
  const state = sortState.toLowerCase();
  return `<section class="films-list">
  <h2 class="films-list__title">${titles[state]}</h2>
  </section>`;
};

export default class EmptyFilmsListView extends AbstractView {
  #sortState = 'all';

  constructor(sortState) {
    super();
    this.#sortState = sortState;
  }

  get template() {
    return createEmptyFilmsListTemplate(this.#sortState);
  }
}
