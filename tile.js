export class Tile {
  constructor({number, size, onClickHandler, row, col}) {
    this.number = number;
    this.size = size;
    this.row = row;
    this.col = col;

    this.tileEl = document.createElement('div');
    this.tileEl.className = 'tile';
    this.tileEl.innerHTML = `<p class="centre-align">${number}</p>`;
    this.tileEl.onclick = () => {
      onClickHandler(number);
    };
    this.setSize(size);
  }

  slide(dir) {
    const left = parseInt(this.tileEl.style.left);
    const top = parseInt(this.tileEl.style.top);

    switch (dir) {
      case 'left':
        this.tileEl.style.left = `${left - this.size - 10}px`;
        this.col--;
      break;
      case 'right':
        this.tileEl.style.left = `${left + this.size + 10}px`;
        this.col++;
      break;
      case 'up':
        this.tileEl.style.top = `${top - this.size - 10}px`;
        this.row--;
      break;
      case 'down':
        this.tileEl.style.top = `${top + this.size + 10}px`;
        this.row++;
      break;
      default:
        console.log(`Tile.slide: invalid direction ${dir}`);
    }
  }

  setSize(size) {
    this.size = size;
    this.tileEl.style.width = `${size}px`;
    this.tileEl.style.height = `${size}px`;
    this.tileEl.style.top = `${(this.row - 1) * (size + 10)}px`;
    this.tileEl.style.left = `${(this.col - 1) * (size + 10)}px`;
  }

  get element() {
    return this.tileEl;    
  }
}