import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';

// const FILMS_COMMENTED_COUNT = 2;
// const FILMS_RATED_COUNT = 2;

export default class FilmsPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();
  filmsListRatedComponent = new FilmsListRatedView();
  filmsListCommentedComponent = new FilmsListCommentedView();

  renderFilms(filmsList) {
    const filmsContainerElement = this.filmsListComponent.element.querySelector('.films-list__container');

    for (const film of filmsList) {
      render(new FilmCardView(film), filmsContainerElement);
    }

    render(new ShowMoreBtnView(), this.filmsListComponent.element);
    render(this.filmsListRatedComponent, this.filmsBoardComponent.element);

    // const filmsRatedContainerElement = this.filmsListRatedComponent
    //   .element
    //   .querySelector('.films-list__container');

    // for (let i = 0; i < FILMS_RATED_COUNT; i++) {
    //   render(new FilmCardView(), filmsRatedContainerElement);
    // }

    // render(
    //   this.filmsListCommentedComponent,
    //   this.filmsBoardComponent.element
    // );

    // const filmsCommentedContainerElement = this.filmsListCommentedComponent
    //   .element
    //   .querySelector('.films-list__container');

    // for (let i = 0; i < FILMS_COMMENTED_COUNT; i++) {
    //   render(new FilmCardView(), filmsCommentedContainerElement);
    // }
  }

  init = (filmsContainer, filmsModel) => {
    this.mainContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.listFilms = [...this.filmsModel.films];

    render(new SortView(), this.mainContainer);
    render(this.filmsBoardComponent, this.mainContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.element);

    this.renderFilms(this.listFilms);
  };
}
