import { render } from './render';
import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();

render(new UserRankView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterElement);

filmsPresenter.init(siteMainElement);
