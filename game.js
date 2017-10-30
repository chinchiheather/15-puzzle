import { Board } from './board.js';

export class Game {
  constructor() {
    this.rows = 4;
    this.cols = 4;
    this.tileSize = 100;

    this.gameContainer = document.createElement('div');
    this.gameContainer.className = 'game-container';

    this.createInputField('No. rows', 'rows', this.rows);
    this.createInputField('No. columns', 'cols', this.cols);
    this.createInputField('Tile size (px)', 'tileSize', this.tileSize);

    this.board = new Board({
      numRows: this.rows,
      numCols: this.cols,
      tileSize: this.tileSize
    });
    this.gameContainer.appendChild(this.board.element);
  }

  createInputField(label, prop, defaultVal) {
    const labelEl = document.createElement('label');
    labelEl.className = 'config-label';
    labelEl.textContent = label;
    this.gameContainer.appendChild(labelEl);

    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.value = defaultVal;
    inputEl.onchange = (event) => this.onInputChange(prop, +event.target.value);
    this.gameContainer.appendChild(inputEl);
  }

  onInputChange(prop, value) {
    this[prop] = value;
    this.board.setBoardConfig({
      numRows: this.rows,
      numCols: this.cols,
      tileSize: this.tileSize
    });
  }

  get element() {
    return this.gameContainer;
  }
}