import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreBtnTemplate = () => `<button class="films-list__show-more">
Show more
</button>`;

export default class ShowMoreBtnView extends AbstractView {
  get template() {
    return createShowMoreBtnTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#handleClick);
  };

  #handleClick = () => this._callback.click();
}
