export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItems(cardsElement) {
    this._container.prepend(cardsElement)
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item))
  }
}