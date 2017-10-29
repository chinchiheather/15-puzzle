import { Board } from './board.js';
import { Game } from './game.js';

(() => {
  var boardContainer = document.getElementById('15-puzzle');
  // var board = new Board({
  //   numRows: 4,
  //   numCols: 4,
  //   tileSize: 100
  // });
  // boardContainer.appendChild(board.element);

  var game = new Game();
  // boardContainer.appendChild(game);
})();