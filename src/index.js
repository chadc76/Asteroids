const Game = require("./game.js");
const GameView = require("./game_view.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");

document.addEventListener("DOMContentLoaded", function() {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  let circle = new MovingObject({
    pos: [30, 30],
    vel: [10, 10],
    radius: 5,
    color: "#00FF00"
  });
  
  let gameView = new GameView(new Game(), ctx);
  gameView.start();
});