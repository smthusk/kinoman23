import { render, RenderPosition } from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListView from '../view/films-list-view.js';
import EmptyFilmsListView from '../view/empty-films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #mainContainer = null;
  #footerElement = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerElement = this.#filmsListComponent.element.querySelector('.films-list__container');
  #showMoreButtonComponent = new ShowMoreBtnView();
  #rederedFilmsCount = FILMS_COUNT_PER_STEP;
  #bodyElement = document.body;

  constructor(filmsContainer, footerElement, filmsModel, commentsModel) {
    this.#mainContainer = filmsContainer;
    this.#footerElement = footerElement;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.listFilms = [];
    this.listComments = [];
  }

  init = () => {
    this.listFilms = [...this.#filmsModel.films];
    this.listComments = [...this.#commentsModel.comments];

    this.#renderFilmsList();
  };

  #handleShowMoreButtonClick = () => {
    this.listFilms.slice(this.#rederedFilmsCount, this.#rederedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => this.#renderFilm(film, this.listComments));
    this.#rederedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#rederedFilmsCount >= this.listFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film, comments) => {
    this.filmComponent = new FilmCardView(film);
    this.popupComponent = null;

    const closePopup = () => {
      this.popupComponent.element.remove();
      this.popupComponent.removeElement();
      this.popupComponent = null;
      this.#bodyElement.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (this.popupComponent && (evt.key === 'Escape' || evt.key === 'Esc')) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openPopup = () => {
      this.popupComponent = new FilmPopupView(film, comments);
      this.popupComponent.setClickHandler(closePopup);
      document.addEventListener('keydown', onEscKeyDown);
      render(this.popupComponent, this.#footerElement, RenderPosition.AFTEREND);
      this.#bodyElement.classList.add('hide-overflow');
    };

    this.filmComponent.setClickHandler(openPopup);

    render(this.filmComponent, this.#filmsContainerElement);
  };

  #renderFilmsList = () => {
    if (this.listFilms.length === 0) {
      render(this.#filmsBoardComponent, this.#mainContainer);
      render(new EmptyFilmsListView(), this.#filmsBoardComponent.element);
      return;
    }

    render(new SortView(), this.#mainContainer);
    render(this.#filmsBoardComponent, this.#mainContainer);
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);

    const minFilmsCount = Math.min(this.#rederedFilmsCount, this.listFilms.length);

    for (let i = 0; i < minFilmsCount; i++) {
      this.#renderFilm(this.listFilms[i], this.listComments);
    }

    if (this.listFilms.length > FILMS_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

}
