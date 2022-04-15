const Asteroid = require("./asteroid.js");
const Util = require("./util.js");

function Game() {
  this.asteroids = [];
  
  this.addAsteroids();
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 2;

Game.prototype.addAsteroids = function() {
  for (let i = 0; i <= Game.NUM_ASTEROIDS; i++) {
    let asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.randomPosition = function() {
  return [
    Math.random() * Game.DIM_X,
    Math.random() * Game.DIM_Y
  ];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(a => a.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(a => a.move());
};

Game.prototype.wrap = function(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length; i++) {
    let asteroid1 = this.asteroids[i];
    for (let j = i + 1; j < this.asteroids.length; j++) {
      let asteroid2 = this.asteroids[2];
      if (asteroid1.isCollideWith(asteroid2)) {
        alert("COLLISON");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

module.exports = Game;