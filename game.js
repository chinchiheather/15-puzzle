import { Board } from './board.js';
import { ConfigInput } from './config-input.js';

export class Game {
  constructor() {
    // default vals
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
    const input = new ConfigInput(label, prop, defaultVal, (prop, value) => this.onInputChange(prop, value));
    this.gameContainer.appendChild(input.element);
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