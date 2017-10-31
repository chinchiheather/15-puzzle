export class Tile {
  constructor({number, size, margin, row, col, onClickHandler}) {
    this.number = number;
    this.row = row;
    this.col = col;

    this.tileEl = document.createElement('div');
    this.tileEl.className = 'tile';
    this.tileEl.innerHTML = `<p class="centre-align">${number}</p>`;
    this.tileEl.onclick = () => onClickHandler(number);
    this.setSize(size, margin);
    this.position();
  }

  setSize(size, margin) {
    this.size = size;
    this.margin = margin;
    this.tileEl.style.width = `${this.size}px`;
    this.tileEl.style.height = `${this.size}px`;
  }

  position() {
    this.tileEl.style.top = `${(this.row - 1) * (this.size + this.margin)}px`;
    this.tileEl.style.left = `${(this.col - 1) * (this.size + this.margin)}px`;
  }

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
    this.position();
  }

  get element() {
    return this.tileEl;
  }
}
