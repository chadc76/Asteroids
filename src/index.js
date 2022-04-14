const Asteroid = require("./asteroid.js");
const Game = require("./game.js");
const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function() {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  let circle = new MovingObject({
    pos: [30, 30],
    vel: [10, 10],
    radius: 5,
    color: "#00FF00"
  });

  let game = new Game();

  let asteroid = new Asteroid({ pos: [65, 65] });

  game.draw(ctx);
  circle.draw(ctx);
});