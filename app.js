import { Board } from './board.js';
import { Game } from './game.js';

(() => {
  var game = new Game();
  var boardContainer = document.getElementById('15-puzzle');
  boardContainer.appendChild(game.element);
})();