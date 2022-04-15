const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

function Game() {
  this.asteroids = [];
  this.ships = [];
  
  this.addAsteroids();
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 7;

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.addShip = function() {
  const ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });

  this.ships.push(ship);
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
  this.allObjects.forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects.forEach(obj => obj.move());
};

Game.prototype.wrap = function(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allObjects.length; i++) {
    let object1 = this.allObjects[i];
    for (let j = i + 1; j < this.allObjects.length; j++) {
      let object2 = this.allObjects[j];
      if (object1.isCollideWith(object2)) {
        object1.collideWith(object2);
        alert("COLLISION");
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

Game.prototype.allObjects = function() {
  return [...this.asteroids, ...this.ships];
}

module.exports = Game;