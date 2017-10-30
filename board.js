import { Tile } from './tile.js';

export class Board {
  constructor({numRows, numCols, tileSize, onGameWin}) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.tileSize = tileSize;
    this.onGameWin = onGameWin;

    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'board-container';
    
    this.initBoard();
  }

  /**
   * Sets up board, creating tile arrays and adding tile elements to board
   */
  initBoard() {
    // contains tile class instances
    this.tiles = [];
    // contains which tile number is currently at which position on the board
    this.tileIdxs = [];
    const numTiles = this.numRows * this.numCols;

    // create array of numbers 1..n and then shuffle them
    this.tileIdxs = Array(numTiles).fill(0).map((el, idx) => idx);
    do {
      this.shuffle(this.tileIdxs);
    } while (!this.isSolvable());

    // add tiles to board
    let curRow = 1;
    let curCol = 1;
    for (let i = 0; i < numTiles; i++) {
      if (this.tileIdxs[i] !== 0) {
        const tile = new Tile({
          number: this.tileIdxs[i],
          size: this.tileSize,
          onClickHandler: (number) => {
            this.onTileClick(number)
          },
          row: curRow,
          col: curCol
        });
        this.tiles.push(tile);
        this.boardContainer.appendChild(tile.element);
      }
      
      if (curCol < this.numCols) {
        curCol++;
      } else {
        curCol = 1;
        curRow++;
      }
    }

    this.boardContainer.style.height = `${this.numRows * (this.tileSize + 10)}px`;
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
      // moves tile and update tileIdxs array with current board state
      const tile = this.tiles.find(tile => tile.number === number);
      tile.slide(dir);
      this.tileIdxs[tileIdx] = 0;
      this.tileIdxs[blankSpaceIdx] = number;

      this.calculateWin();
    }
  }
  
  /**
   * Taken from https://stackoverflow.com/a/34570524/521531
   * Using the logic specified in https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
   */
  isSolvable() {
    let inversions = 0;
    let row = 0;
    let blankSpaceRow = 0;
  
    for (let i = 0; i < this.tileIdxs.length; i++) {
      if (i % this.numCols == 0) {
        row++;
      }
      // the blank tile
      if (this.tileIdxs[i] == 0) {
        blankSpaceRow = row;
        continue;
      }
      for (let j = i + 1; j < this.tileIdxs.length; j++) {
          if (this.tileIdxs[i] > this.tileIdxs[j] && this.tileIdxs[j] != 0) {
            inversions++;
          }
      }
    }
  
    // if grid width is odd, need an odd number of inversions to be solvable
    // if grid width is even and the blank is on an even row, need an odd number of inversions to be solvable
    // if grid width is even, and the blank is on an odd row , need an even number of inversion to be solvable
    if (this.numCols % 2 == 0) {
      if (blankSpaceRow % 2 == 0) {
        return inversions % 2 == 0;
      } else {
        return inversions % 2 != 0;
      }
    } else {
      return inversions % 2 == 0;
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
    } else if (tileRow === blankSpaceRow - 1 && tileIdx === blankSpaceIdx - this.numCols) {
        return 'down';
    } else if (tileRow === blankSpaceRow + 1 && tileIdx === blankSpaceIdx + this.numCols) {
      return 'up';
    }
    return '';
  }

  calculateWin() {
    let won = true;
    // checks if numbers in tileIdxs array are in numeric order
    this.tileIdxs.find((el, idx) => {
      if (el !== idx + 1 && el > 0) {
        won = false;
        return false;
      }
    });

    if (won) {
      this.onGameWin();
    }
  }
  
  /**
   * Clears and rebuilds board using current rows, cols & tile size
   */
  setBoardConfig({numRows, numCols, tileSize}) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.tileSize = tileSize;
    this.boardContainer.innerHTML = '';
    this.initBoard();
  }  

  get element() {
    return this.boardContainer;
  }
}