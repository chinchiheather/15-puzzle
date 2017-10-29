import { Tile } from './tile.js';

export class Board {
  constructor({numRows, numCols, tileSize}) {
    this.tiles = [];
    this.tileIdxs = [];
    this.numRows = numRows;
    this.numCols = numCols;

    this._element = document.createElement('div');
    this._element.className = 'board-container';

    this.initGrid(numRows, numCols, tileSize);
  }

  initGrid(numRows, numCols, tileSize) {
    const numTiles = numRows * numCols;

    this.tileIdxs = Array(numTiles).fill(0).map((el, idx) => idx);
    this.shuffle(this.tileIdxs);

    let curRow = 1;
    let curCol = 1;
    for (let i = 0; i < numTiles; i++) {
      if (this.tileIdxs[i] !== 0) {
        const tile = new Tile({
          id: i,
          number: this.tileIdxs[i],
          size: tileSize,
          onClickHandler: (number) => {
            this.onTileClick(number)
          },
          row: curRow,
          col: curCol
        });
        this.tiles.push(tile);
        this._element.appendChild(tile.element);
      }
      
      if (curCol < numCols) {
        curCol++;
      } else {
        curCol = 1;
        curRow++;
      }
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

  onTileClick(number) {
    const tileIdx = this.tileIdxs.findIndex(el => el === number);
    const blankSpaceIdx = this.tileIdxs.findIndex(el => el === 0);
    const dir = this.canMove(tileIdx, blankSpaceIdx);
    
    if (dir) {
      // todo: maybe there is a better way than this?
      const tile = this.tiles.find(tile => tile.number === number);
      tile.slide(dir);
    
      this.tileIdxs[tileIdx] = 0;
      this.tileIdxs[blankSpaceIdx] = number;

      this.calculateWin();
    }
  }

  canMove(tileIdx, blankSpaceIdx) {
    const tileRow = Math.floor(tileIdx / this.numCols);
    const blankSpaceRow = Math.floor(blankSpaceIdx / this.numCols);

    if (tileRow === blankSpaceRow) {
      if (tileIdx === blankSpaceIdx - 1) {
        return 'right';
      } else if (tileIdx === blankSpaceIdx + 1) {
        return 'left';
      }
    } else if (tileRow === blankSpaceRow + 1 || tileRow === blankSpaceRow - 1) {
      if (tileIdx === blankSpaceIdx - this.numCols) {
        return 'down';
      } else if (tileIdx === blankSpaceIdx + this.numCols) {
        return 'up';
      }
    }
    return '';
  }

  calculateWin() {
    let won = true;
    this.tileIdxs.find((el, idx) => {
      if (el !== idx + 1 && el > 0) {
        won = false;
        return false;
      }
    });

    if (won) {
      console.log('WIN!');
    }
  }

  get element() {
    return this._element;
  }
}