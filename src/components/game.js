import { Board } from './board.js';
import { ConfigInput } from './config-input.js';

export class Game {
  constructor() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.className = 'game-container';

    // default vals
    const boardSize = 4;
    const tileSize = 100;

    this.addInputField('Board size (no. rows/cols)', boardSize, 2, (value) => this.onBoardSizeChange(value));
    this.addInputField('Tile size (px)', tileSize, 25, (value) => this.onTileSizeChange(value));
    this.addWinMessageEl('WINNER!!');

    this.board = new Board({
      boardSize,
      tileSize,
      onGameWin: () => this.onGameWin()
    });
    this.gameContainer.appendChild(this.board.element);
  }

  addInputField(label, defaultVal, minVal, onInputChange) {
    const input = new ConfigInput(label, defaultVal, minVal, (value) => onInputChange(value));
    this.gameContainer.appendChild(input.element);
  }

  addWinMessageEl(winText) {
    this.winMessageEl = document.createElement('div');
    this.winMessageEl.className = 'winner-message';
    this.winMessageEl.innerHTML = `<p>${winText}</p>`;
    this.gameContainer.appendChild(this.winMessageEl);
  }

  onBoardSizeChange(value) {
    this.board.setBoardSize(value);
  }

  onTileSizeChange(value) {
    this.board.setTileSize(value);
  }

  onGameWin() {
    this.gameContainer.classList.add('won');
  }

  get element() {
    return this.gameContainer;
  }
}
