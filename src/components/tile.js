export class Tile {
  constructor({number, size, margin, row, col, onClickHandler}) {
    this.number = number;
    this.size = size;
    this.margin = margin;
    this.row = row;
    this.col = col;
    this.onClickHandler = onClickHandler;

    this.createEl();
  }

  createEl() {
    this.tileEl = document.createElement('div');
    this.tileEl.className = 'tile';
    this.tileEl.innerHTML = `<p class="centre-align">${this.number}</p>`;
    this.tileEl.addEventListener('click', (event) => this.onClickHandler(this.number));
    this.setSize(this.size, this.margin);
  }

  setSize(size, margin) {
    this.size = size;
    this.margin = margin;
    this.tileEl.style.width = `${this.size}px`;
    this.tileEl.style.height = `${this.size}px`;
    this.updatePosition();
  }

  /**
   * Sets tile's position using row, col, size & margin properties
   */
  updatePosition() {
    this.tileEl.style.top = `${(this.row - 1) * (this.size + this.margin)}px`;
    this.tileEl.style.left = `${(this.col - 1) * (this.size + this.margin)}px`;
  }

  /**
   * Moves tile one space in specified direction
   */
  slide(dir) {
    switch (dir) {
      case 'left':
        this.col--;
      break;
      case 'right':
        this.col++;
      break;
      case 'up':
        this.row--;
      break;
      case 'down':
        this.row++;
      break;
      default:
        console.log(`Tile.slide: invalid direction ${dir}`);
    }
    this.updatePosition();
  }

  get element() {
    return this.tileEl;
  }
}
