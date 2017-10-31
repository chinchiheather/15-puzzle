import { Tile } from './tile.js';

export class Board {
  constructor({boardSize, tileSize, onGameWin}) {
    this.boardSize = boardSize;
    this.tileSize = tileSize;
    this.onGameWin = onGameWin;
    this.tileMargin = 0;

    // contains Tile class instances
    this.tiles = [];
    // contains which tile number is currently at which position on the board, 0 is the blank space
    this.tileIdxs = [];

    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'board-container';

    this.calcTileMargin();
    this.initBoard();
  }

  /**
   * Sets up board, creating tile arrays and adding tile elements to board
   */
  initBoard() {
    const numTiles = Math.pow(this.boardSize, 2);
    this.tiles = [];
    // create array of numbers 0..n-1
    this.tileIdxs = Array(numTiles).fill(0).map((el, idx) => idx);

    // ensure game can be won and isnt already a winning game
    do {
      this.shuffle(this.tileIdxs);
    } while (!this.isSolvable() || this.isWin());

    // add tiles to board
    let curRow = 1;
    let curCol = 1;
    for (let i = 0; i < numTiles; i++) {
      // 0 is the blank space
      if (this.tileIdxs[i] !== 0) {
        const tile = new Tile({
          number: this.tileIdxs[i],
          size: this.tileSize,
          margin: this.tileMargin,
          row: curRow,
          col: curCol,
          onClickHandler: (number) => this.onTileClick(number)
        });
        this.tiles.push(tile);
        this.boardContainer.appendChild(tile.element);
      }

      if (curCol < this.boardSize) {
        curCol++;
      } else {
        curCol = 1;
        curRow++;
      }
    }

    this.setBoardHeight();
  }

  onTileClick(number) {
    const tileIdx = this.tileIdxs.findIndex(el => el === number);
    const blankSpaceIdx = this.tileIdxs.findIndex(el => el === 0);
    const dir = this.canMove(tileIdx, blankSpaceIdx);

    if (dir) {
      // move tile and update tileIdxs array
      const tile = this.tiles.find(tile => tile.number === number);
      tile.slide(dir);
      this.tileIdxs[tileIdx] = 0;
      this.tileIdxs[blankSpaceIdx] = number;

      if (this.isWin()) {
        this.onGameWin();
      }
    }
  }

  /**
   * Taken from https://stackoverflow.com/a/6274381/521531
   * Uses the Fisher-Yates algorithm to shuffle array in place
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  /**
   * Taken from https://stackoverflow.com/a/34570524/521531
   * Using the logic specified in https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
   */
  isSolvable() {
    const blankSpaceIdx = this.tileIdxs.findIndex(el => el === 0);
    const blankSpaceRow = Math.floor(blankSpaceIdx / this.boardSize);

    let inversions = 0;
    for (let i = 0; i < this.tileIdxs.length; i++) {
      for (let j = i + 1; j < this.tileIdxs.length; j++) {
        if (this.tileIdxs[i] > this.tileIdxs[j] && this.tileIdxs[j] != 0) {
          inversions++;
        }
      }
    }

    // if grid width is odd, need an odd number of inversions to be solvable
    // if grid width is even and the blank is on an even row, need an odd number of inversions to be solvable
    // if grid width is even, and the blank is on an odd row , need an even number of inversion to be solvable
    if (this.boardSize % 2 === 0) {
      if (blankSpaceRow % 2 !== 0) {
        return inversions % 2 === 0;
      } else {
        return inversions % 2 !== 0;
      }
    } else {
      return inversions % 2 === 0;
    }
  }

  /**
   * Calculates whether the tile at tileIdx can move into blankSpaceIdx and if so what direction that would be in
   * (left, right, up or down), returns empty string if tile cannot move
   */
  canMove(tileIdx, blankSpaceIdx) {
    const tileRow = Math.floor(tileIdx / this.boardSize);
    const blankSpaceRow = Math.floor(blankSpaceIdx / this.boardSize);

    if (tileRow === blankSpaceRow) {
      if (tileIdx === blankSpaceIdx - 1) {
        return 'right';
      } else if (tileIdx === blankSpaceIdx + 1) {
        return 'left';
      }
    } else if (tileRow === blankSpaceRow - 1 && tileIdx === blankSpaceIdx - this.boardSize) {
      return 'down';
    } else if (tileRow === blankSpaceRow + 1 && tileIdx === blankSpaceIdx + this.boardSize) {
      return 'up';
    }
    return '';
  }

  isWin() {
    let won = true;
    // checks if numbers in tileIdxs array are in numeric order
    this.tileIdxs.find((el, idx) => {
      if (el !== idx + 1 && el > 0) {
        won = false;
        return true;
      }
    });

    return won;
  }

  /**
   * Clears and rebuilds board
   */
  setBoardSize(size) {
    this.boardSize = size;
    this.boardContainer.innerHTML = '';
    this.initBoard();
  }

  setTileSize(size) {
    this.tileSize = size;
    this.calcTileMargin();
    this.tiles.forEach(tile => {
      tile.setSize(this.tileSize, this.tileMargin);
      tile.position();
    });
    this.setBoardHeight();
  }

  setBoardHeight() {
    this.boardContainer.style.height = `${this.boardSize * (this.tileSize + this.tileMargin)}px`;
  }

  calcTileMargin() {
    this.tileMargin = this.tileSize * 0.1;
  }

  get element() {
    return this.boardContainer;
  }
}
