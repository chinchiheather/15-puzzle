export class Tile {
  constructor({number, size, onClickHandler, row, col}) {
    this.number = number;
    this.size = size;
    this._element = document.createElement('div');
    this._element.className = 'tile';
    this._element.style.width = `${size}px`;
    this._element.style.height = `${size}px`;
    this._element.innerHTML = `<p class="centre-align">${number}</p>`;
    this._element.onclick = () => {
      onClickHandler(number);
    };
    this._setGridPos(row, col);
  }

  slide(dir) {
    const left = parseInt(this._element.style.left);
    const top = parseInt(this._element.style.top);

    switch (dir) {
      case 'left':
        this._element.style.left = `${left - this.size - 10}px`;
      break;
      case 'right':
        this._element.style.left = `${left + this.size + 10}px`;
      break;
      case 'up':
        this._element.style.top = `${top - this.size - 10}px`;
      break;
      case 'down':
        this._element.style.top = `${top + this.size + 10}px`;
      break;
    }
  }

  _setGridPos(row, col) {
    this._element.style.top = `${(row - 1) * (this.size + 10)}px`;
    this._element.style.left = `${(col - 1) * (this.size + 10)}px`;
  }

  get element() {
    return this._element;    
  }
}