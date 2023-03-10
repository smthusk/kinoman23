import { render, RenderPosition } from './render';
import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmPopupView from './view/film-popup-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();

render(new UserRankView(), headerElement);
render(new FilterView(), mainElement);
render(new FooterStatisticsView(), footerElement);
render(new FilmPopupView(), footerElement, RenderPosition.AFTEREND);

filmsPresenter.init(mainElement);
