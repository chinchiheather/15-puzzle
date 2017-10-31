import { Board } from './board.js';
import { ConfigInput } from './config-input.js';

export class Game {
  constructor() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.className = 'game-container';

    // default vals
    const boardSize = 4;
    const tileSize = 100;

    this.createInputField('Board size (no. rows/cols)', boardSize, 2, (value) => this.onBoardSizeChange(value));
    this.createInputField('Tile size (px)', tileSize, 25, (value) => this.onTileSizeChange(value));

    this.winMessageEl = document.createElement('div');
    this.winMessageEl.className = 'winner-message';
    this.winMessageEl.innerHTML = '<p>WINNER!!</p>';
    this.gameContainer.appendChild(this.winMessageEl);

    this.board = new Board({
      boardSize: boardSize,
      tileSize: tileSize,
      onGameWin: () => this.onGameWin()
    });
    this.gameContainer.appendChild(this.board.element);
  }

  createInputField(label, defaultVal, minVal, onInputChange) {
    const input = new ConfigInput(label, defaultVal, minVal, (value) => onInputChange(value));
    this.gameContainer.appendChild(input.element);
  }

  onBoardSizeChange(value) {
    this.board.setBoardSize(value);
  }

  onTileSizeChange(value) {
    this.board.setTileSize(value);
  }

  onGameWin() {
    this.gameContainer.className += ' won';
  }

  get element() {
    return this.gameContainer;
  }
}
