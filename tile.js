export class Tile {
  constructor({number, size, onClickHandler, row, col}) {
    this.number = number;
    this.size = size;

    this.tileEl = document.createElement('div');
    this.tileEl.className = 'tile';
    this.tileEl.style.width = `${size}px`;
    this.tileEl.style.height = `${size}px`;
    this.tileEl.style.top = `${(row - 1) * (this.size + 10)}px`;
    this.tileEl.style.left = `${(col - 1) * (this.size + 10)}px`;
    this.tileEl.innerHTML = `<p class="centre-align">${number}</p>`;
    this.tileEl.onclick = () => {
      onClickHandler(number);
    };
  }

  slide(dir) {
    const left = parseInt(this.tileEl.style.left);
    const top = parseInt(this.tileEl.style.top);

    switch (dir) {
      case 'left':
        this.tileEl.style.left = `${left - this.size - 10}px`;
      break;
      case 'right':
        this.tileEl.style.left = `${left + this.size + 10}px`;
      break;
      case 'up':
        this.tileEl.style.top = `${top - this.size - 10}px`;
      break;
      case 'down':
        this.tileEl.style.top = `${top + this.size + 10}px`;
      break;
      default:
        console.log(`Tile.slide: invalid direction ${dir}`);
    }
  }

  get element() {
    return this.tileEl;    
  }
}