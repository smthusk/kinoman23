import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListCommentedTemplate = () => `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
  </section>`;

export default class FilmsListCommentedView extends AbstractView {
  get template() {
    return createFilmsListCommentedTemplate();
  }
}
