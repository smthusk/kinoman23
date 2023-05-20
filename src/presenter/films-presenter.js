import { render, RenderPosition } from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListView from '../view/films-list-view.js';
import EmptyFilmsListView from '../view/empty-films-list-view.js';
// import FilmsListRatedView from '../view/films-list-rated-view.js';
// import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';

// const FILMS_COMMENTED_COUNT = 2;
// const FILMS_RATED_COUNT = 2;
const bodyElement = document.body;
const footerElement = document.querySelector('.footer');
const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerElement = this.#filmsListComponent.element.querySelector('.films-list__container');
  #showMoreButtonComponent = new ShowMoreBtnView();
  #rederedFilmsCount = FILMS_COUNT_PER_STEP;
  // #filmsListRatedComponent = new FilmsListRatedView();
  // #filmsListCommentedComponent = new FilmsListCommentedView();

  constructor(filmsContainer, filmsModel, commentsModel) {
    this.#mainContainer = filmsContainer;
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

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
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
      bodyElement.classList.remove('hide-overflow');
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
      this.popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', closePopup);
      document.addEventListener('keydown', onEscKeyDown);
      render(this.popupComponent, footerElement, RenderPosition.AFTEREND);
      bodyElement.classList.add('hide-overflow');
    };

    this.filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
    });

    render(this.filmComponent, this.#filmsContainerElement);
  };

  #renderFilmsList = () => {
    if (this.listFilms.length) {
      render(new SortView(), this.#mainContainer);
      render(this.#filmsBoardComponent, this.#mainContainer);
      render(this.#filmsListComponent, this.#filmsBoardComponent.element);

      for (let i = 0; i < Math.min(this.#rederedFilmsCount, this.listFilms.length); i++) {
        this.#renderFilm(this.listFilms[i], this.listComments);
      }

      if (this.listFilms.length > FILMS_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    } else {
      render(this.#filmsBoardComponent, this.#mainContainer);
      render(new EmptyFilmsListView(), this.#filmsBoardComponent.element);
    }
  };

  // render(this.#filmsListRatedComponent, this.#filmsBoardComponent.element);

  // const filmsRatedContainerElement = this.#filmsListRatedComponent
  //   .element
  //   .querySelector('.films-list__container');

  // for (let i = 0; i < FILMS_RATED_COUNT; i++) {
  //   render(new FilmCardView(), filmsRatedContainerElement);
  // }

  // render(this.#filmsListCommentedComponent, this.#filmsBoardComponent.element);

  // const filmsCommentedContainerElement = this.#filmsListCommentedComponent
  //   .element
  //   .querySelector('.films-list__container');

  // for (let i = 0; i < FILMS_COMMENTED_COUNT; i++) {
  //   render(new FilmCardView(), filmsCommentedContainerElement);
  // }
}
