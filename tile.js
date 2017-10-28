export class Tile {
  constructor({number, size, onClickHandler, row, col}) {
    this.number = number;
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
    switch (dir) {
      case 'left':
        this._moveGridPos('column', -1);
      break;
      case 'right':
        this._moveGridPos('column', +1);
      break;
      case 'up':
        this._moveGridPos('row', -1);
      break;
      case 'down':
        this._moveGridPos('row', +1);
      break;
    }
  }

  _setGridPos(row, col) {
    this._element.setAttribute('style', `
      grid-column-start: ${col};
      grid-column-end: ${col + 1};
      grid-row-start: ${row};
      grid-row-end: ${row + 1};`);
  }

  _moveGridPos(layout, amount) {
    const props = [`grid-${layout}-start`, `grid-${layout}-end`];
    props.forEach(prop => {
      this._element.style[prop] = +(this._element.style[prop]) + amount;      
    });
  }

  get element() {
    return this._element;    
  }
}