import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';

const FILMS_COMMENTED_COUNT = 2;
const FILMS_RATED_COUNT = 2;

export default class FilmsPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();
  filmsListRatedComponent = new FilmsListRatedView();
  filmsListCommentedComponent = new FilmsListCommentedView();

  renderFilms(listFilms) {
    const filmsContainerElement = this.filmsListComponent
      .getElement()
      .querySelector('.films-list__container');

    for (let i = 0; i < listFilms.length; i++) {
      render(new FilmCardView(listFilms[i]), filmsContainerElement);
    }

    render(new ShowMoreBtnView(), this.filmsListComponent.getElement());
    render(this.filmsListRatedComponent, this.filmsBoardComponent.getElement());

    const filmsRatedContainerElement = this.filmsListRatedComponent
      .getElement()
      .querySelector('.films-list__container');

    // for (let i = 0; i < FILMS_RATED_COUNT; i++) {
    //   render(new FilmCardView(), filmsRatedContainerElement);
    // }

    render(
      this.filmsListCommentedComponent,
      this.filmsBoardComponent.getElement()
    );

    const filmsCommentedContainerElement = this.filmsListCommentedComponent
      .getElement()
      .querySelector('.films-list__container');

    // for (let i = 0; i < FILMS_COMMENTED_COUNT; i++) {
    //   render(new FilmCardView(), filmsCommentedContainerElement);
    // }
  }

  init = (filmsContainer, filmsModel) => {
    this.mainContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.listFilms = [...this.filmsModel.getFilms()];

    render(new SortView(), this.mainContainer);
    render(this.filmsBoardComponent, this.mainContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());

    this.renderFilms(this.listFilms);
  };
}
