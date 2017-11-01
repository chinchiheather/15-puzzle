import { Game } from './components/game.js';

(() => {
  function init() {
    addGame();
    addNewBoardButton();
  }

  function addGame() {
    const game = new Game();
    const puzzleContainer = document.querySelector('#fifteen-puzzle .puzzles-container');
    puzzleContainer.appendChild(game.element);
  }

  function addNewBoardButton() {
    const addBoardBtn = document.createElement('button');
    addBoardBtn.className = 'add-board-btn';
    addBoardBtn.textContent = 'Add New Board';
    addBoardBtn.addEventListener('click', addGame);

    const buttonContainer = document.querySelector('#fifteen-puzzle .button-container');
    buttonContainer.appendChild(addBoardBtn);
  }

  init();
})();
