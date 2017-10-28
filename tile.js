export class Tile {
  constructor({number, size}) {
    this.tile = document.createElement('div');
    this.tile.className = 'tile';
    // todo: set tile size dynamically
    // this.tile.style = `width: ${size}px; height: ${size}px;`;
    this.tile.innerHTML = `<p>${number}</p>`;
  }

  get element() {
    return this.tile;    
  }
}