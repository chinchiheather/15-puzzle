import { Board } from './board.js';
import { ConfigInput } from './config-input.js';

export class Game {
  constructor() {
    // default vals
    this.numRows = 4;
    this.numCols = 4;
    this.tileSize = 100;

    this.gameContainer = document.createElement('div');
    this.gameContainer.className = 'game-container';

    this.createInputField('No. rows', 'numRows', this.numRows);
    this.createInputField('No. columns', 'numCols', this.numCols);
    this.createInputField('Tile size (px)', 'tileSize', this.tileSize);

    this.winMessageEl = document.createElement('div');
    this.winMessageEl.className = 'winner-message';
    this.winMessageEl.innerHTML = '<p>WINNER!!</p>';
    this.gameContainer.appendChild(this.winMessageEl);

    this.board = new Board({
      numRows: this.numRows,
      numCols: this.numCols,
      tileSize: this.tileSize,
      onGameWin: () => this.onGameWin()
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
      numRows: this.numRows,
      numCols: this.numCols,
      tileSize: this.tileSize
    });
  }

  onGameWin() {
    this.gameContainer.className += ' won';    
  }

  get element() {
    return this.gameContainer;
  }
}