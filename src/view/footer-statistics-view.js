import AbstractView from '../framework/view/abstract-view.js';

const footerStatisticsTemplate = () => `<p>
130 291 movies inside
</p>`;

export default class FooterStatisticsView extends AbstractView {
  get template() {
    return footerStatisticsTemplate();
  }
}
