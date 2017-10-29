import { Board } from './board.js';

export class Game {
  constructor() {
    this.rows = 4;
    this.cols = 4;
    this.tileSize = 100;

    this.createInputField('Number of rows', 'rows', 4);
    this.createInputField('Number of columns', 'cols', 4);
    this.createInputField('Tile size (px)', 'tileSize', 100);

    this.board = new Board({
      numRows: this.rows,
      numCols: this.cols,
      tileSize: this.tileSize
    });
    var boardContainer = document.getElementById('15-puzzle');
    boardContainer.appendChild(this.board.element);
  }

  createInputField(label, prop, defaultVal) {
    const labelEl = document.createElement('label');
    labelEl.textContent = name;
    const input = document.createElement('input');
    input.type = 'number';
    input.value = defaultVal;
    input.onchange = (event) => {
      this[prop] = +event.target.value;
      this.board.setBoardConfig({
        numRows: this.rows,
        numCols: this.cols,
        tileSize: this.tileSize
      });
    }
    var boardContainer = document.getElementById('15-puzzle');
    boardContainer.appendChild(labelEl);
    boardContainer.appendChild(input);

  }


}