import { Tile } from './tile.js';
import { Helpers } from '../helpers.js';

export class Board {
  constructor({boardSize, tileSize, onGameWin}) {
    this.boardSize = boardSize;
    this.tileSize = tileSize;
    this.onGameWin = onGameWin;
    this.tileMargin = 0;
    this.tiles = [];
    this.tileOrder = [];

    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'board-container';

    this.setTileMargin();
    this.initBoard();
  }

  /**
   * Sets up board, creating tile arrays and adding tile elements to board
   */
  initBoard() {
    const numTiles = Math.pow(this.boardSize, 2);
    // contains Tile class instances
    this.tiles = [];
    // contains which tile number is currently at which position on the board (0 is the blank space)
    // initialise it with array of numbers 0..n-1
    this.tileOrder = Array(numTiles).fill(0).map((el, idx) => idx);

    // ensure game can be won and isnt already a winning game
    do {
      Helpers.shuffleArray(this.tileOrder);
    } while (!this.isSolvable() || this.hasWon());

    // add tiles to board
    let curRow = 1;
    let curCol = 1;
    for (let i = 0; i < numTiles; i++) {
      // 0 is the blank space
      if (this.tileOrder[i] !== 0) {
        const tile = new Tile({
          number: this.tileOrder[i],
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
    const tileIdx = this.tileOrder.findIndex(el => el === number);
    const blankSpaceIdx = this.tileOrder.findIndex(el => el === 0);
    const dir = this.getTileMoveDirection(tileIdx, blankSpaceIdx);

    if (dir) {
      // move tile and update tileOrder array
      const tile = this.tiles.find(tile => tile.number === number);
      tile.slide(dir);
      this.tileOrder[tileIdx] = 0;
      this.tileOrder[blankSpaceIdx] = number;

      if (this.hasWon()) {
        this.onGameWin();
      }
    }
  }

  /**
   * Taken from https://stackoverflow.com/a/34570524/521531
   * Using the logic specified in https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
   */
  isSolvable() {
    const blankSpaceIdx = this.tileOrder.findIndex(el => el === 0);
    const blankSpaceRow = Math.floor(blankSpaceIdx / this.boardSize);

    // An inversion is a when a tile is followed by a tile with a higher number
    // We loop over every tile, incrementing the inversions counter for every tile with a higher number
    // that comes after it in the board
    let inversions = 0;
    for (let i = 0; i < this.tileOrder.length; i++) {
      for (let j = i + 1; j < this.tileOrder.length; j++) {
        if (this.tileOrder[i] > this.tileOrder[j] && this.tileOrder[j] !== 0) {
          inversions++;
        }
      }
    }

    // if grid width is odd, need an odd number of inversions to be solvable
    // if grid width is even and the blank is on an even row, need an odd number of inversions to be solvable
    // if grid width is even, and the blank is on an odd row , need an even number of inversions to be solvable
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
   * (left, right, up or down), returns an empty string if the tile cannot move
   */
  getTileMoveDirection(tileIdx, blankSpaceIdx) {
    const tileRow = Math.floor(tileIdx / this.boardSize);
    const blankSpaceRow = Math.floor(blankSpaceIdx / this.boardSize);

    if (tileRow === blankSpaceRow) {
      if (tileIdx === blankSpaceIdx - 1) {
        return 'right';
      } else if (tileIdx === blankSpaceIdx + 1) {
        return 'left';
      }
    } else if (Math.abs(tileRow - blankSpaceRow) === 1) {
      if (tileIdx === blankSpaceIdx - this.boardSize) {
        return 'down';
      } else if (tileIdx === blankSpaceIdx + this.boardSize) {
        return 'up';
      }
    }
    return '';
  }

  hasWon() {
    // checks if numbers in tileOrder array are in numeric order, skipping the last tile
    // as this will have a number of 0 for the blank tile in a winning layout
    return this.tileOrder.every((number, i) => {
      return number === i + 1 || i === this.tiles.length
    });
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
    this.setTileMargin();
    this.tiles.forEach(tile => tile.setSize(this.tileSize, this.tileMargin));
    this.setBoardHeight();
  }

  setBoardHeight() {
    this.boardContainer.style.height = `${this.boardSize * (this.tileSize + this.tileMargin)}px`;
  }

  setTileMargin() {
    this.tileMargin = this.tileSize * 0.1;
  }

  get element() {
    return this.boardContainer;
  }
}
