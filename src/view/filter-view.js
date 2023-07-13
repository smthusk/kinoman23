import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (currentFilter, {watchlist, alreadyWatched, favorite}) => {
  const allActive = currentFilter === 'all' ? 'main-navigation__item--active' : '';
  const watchlistActive = currentFilter === 'watchlist' ? 'main-navigation__item--active' : '';
  const historyActive = currentFilter === 'history' ? 'main-navigation__item--active' : '';
  const favoritesActive = currentFilter === 'favorites' ? 'main-navigation__item--active' : '';

  return `<nav class="main-navigation">
<a href="#all" class="main-navigation__item ${allActive}">All movies</a>
<a href="#watchlist" class="main-navigation__item ${watchlistActive}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
<a href="#history" class="main-navigation__item ${historyActive}">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
<a href="#favorites" class="main-navigation__item ${favoritesActive}">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
</nav>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filterModel) {
    super();
    this.#filters = filterModel;
  }

  get template() {
    return createFilterTemplate(this.#filters.currentFilter, this.#filters.filters);
  }
}
