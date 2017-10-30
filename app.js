import { Board } from './board.js';
import { Game } from './game.js';

(() => {
  function init() {
    addGame();

    const addBoardBtn = document.getElementsByClassName('add-board-btn')[0];
    addBoardBtn.onclick = addGame;
  }

  function addGame() {
    const game = new Game();
    const puzzleContainer = document.getElementById('15-puzzle');
    puzzleContainer.appendChild(game.element);
  }

  init();
})();