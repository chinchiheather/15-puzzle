import { Tile } from './tile.js';

export class Board {
  constructor({numRows, numCols, tileSize}) {
    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'board-container';

    this.setGridLayout(numRows, numCols);
    this.generateTiles(numRows * numCols - 1, tileSize);
  }

  setGridLayout(numRows, numCols) {
    this.boardContainer.setAttribute('style', 
      `grid-template-columns: repeat(${numCols}, 1fr);
       grid-template-rows: repeat(${numRows}, 1fr);`);
  }

  generateTiles(numTiles, tileSize) {
    for (let i = 0; i < numTiles; i++) {
      const tile = new Tile({number: i, size: tileSize})
      this.boardContainer.appendChild(tile.element);
    }
  }

  get element() {
    return this.boardContainer;
  }
}