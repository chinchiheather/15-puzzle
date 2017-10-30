import { Board } from './board.js';
import { ConfigInput } from './config-input.js';

export class Game {
  constructor() {
    // default vals
    this.boardSize = 4;
    this.tileSize = 100;

    this.gameContainer = document.createElement('div');
    this.gameContainer.className = 'game-container';

    this.createInputField('Board size (no. rows/cols)', 'boardSize', this.boardSize, 2);
    this.createInputField('Tile size (px)', 'tileSize', this.tileSize, 50);

    this.winMessageEl = document.createElement('div');
    this.winMessageEl.className = 'winner-message';
    this.winMessageEl.innerHTML = '<p>WINNER!!</p>';
    this.gameContainer.appendChild(this.winMessageEl);

    this.board = new Board({
      boardSize: this.boardSize,
      tileSize: this.tileSize,
      onGameWin: () => this.onGameWin()
    });
    this.gameContainer.appendChild(this.board.element);
  }

  createInputField(label, prop, defaultVal, minVal) {
    const input = new ConfigInput(label, prop, defaultVal, minVal, (prop, value) => this.onInputChange(prop, value));
    this.gameContainer.appendChild(input.element);
  }

  onInputChange(prop, value) {
    this[prop] = value;
    this.board.setBoardConfig({
      boardSize: this.boardSize,
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