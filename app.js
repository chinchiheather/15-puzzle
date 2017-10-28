import { Board } from './board.js';

(() => {
  var boardContainer = document.getElementById('15-puzzle');
  var board = new Board({
    numRows: 2,
    numCols: 2,
    tileSize: 140
  });
  boardContainer.appendChild(board.element);
})();