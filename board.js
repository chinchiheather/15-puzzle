import { Tile } from './tile.js';

export class Board {
  constructor({numRows, numCols, tileSize}) {
    this.tiles = [];

    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'board-container';

    this.initGrid(numRows, numCols, tileSize);
  }

  initGrid(numRows, numCols, tileSize) {
    this.boardContainer.setAttribute('style', 
    `grid-template-columns: repeat(${numCols}, 1fr);
     grid-template-rows: repeat(${numRows}, 1fr);`);

    const numTiles = numRows * numCols - 1;

    const tileIdxs = Array(numTiles).fill(0).map((el, idx) => idx + 1);
    this.shuffle(tileIdxs);

    let curRow = 1;
    let curCol = 1;
    for (let i = 0; i < numTiles; i++) {
      if (curCol < numCols) {
        curCol++;
      } else {
        curCol = 1;
        curRow++;
      }

      const tile = new Tile({number: tileIdxs[i], size: tileSize});
      tile.element.setAttribute('style', `
        grid-column-start: ${curCol};
        grid-column-end: ${curCol + 1};
        grid-row-start: ${curRow};
        grid-row-end: ${curRow + 1};`);
      this.tiles.push(tile);
      this.boardContainer.appendChild(tile.element);      
    }
  }

  /**
   * Taken from https://stackoverflow.com/a/6274381/521531
   * Shuffles array in place
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
  }

  get element() {
    return this.boardContainer;
  }
}