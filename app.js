import { Board } from './board.js';

(() => {
  var boardContainer = document.getElementById('15-puzzle');
  var board = new Board({
    numRows: 4,
    numCols: 4,
    tileSize: 140
  });
  boardContainer.appendChild(board.element);
})();