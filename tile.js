export class Tile {
  constructor({number, size, onClickHandler, row, col}) {
    this.number = number;
    this.size = size;
    this._element = document.createElement('div');
    this._element.className = 'tile';
    // todo: set tile size dynamically
    // this.tile.style = `width: ${size}px; height: ${size}px;`;
    this._element.innerHTML = `<p>${number}</p>`;
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
        this._element.style.left = `${left - this.size}px`;
      break;
      case 'right':
        this._element.style.left = `${left + this.size}px`;
      break;
      case 'up':
        this._element.style.top = `${top - this.size}px`;
      break;
      case 'down':
        this._element.style.top = `${top + this.size}px`;
      break;
    }
  }

  _setGridPos(row, col) {
    this._element.setAttribute('style', `
      top: ${row * this.size}px;
      left: ${col * this.size}px;
    `);
  }

  get element() {
    return this._element;    
  }
}