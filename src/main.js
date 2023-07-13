import { render } from './render';
import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model';
import FiltersModel from './model/filters-model';

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel(filmsModel);
const filmsPresenter = new FilmsPresenter(mainElement, footerElement, filmsModel, commentsModel);

render(new UserRankView(), headerElement);
render(new FilterView(filtersModel), mainElement);
render(new FooterStatisticsView(), footerElement);

filmsPresenter.init();
