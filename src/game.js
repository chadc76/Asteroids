const Asteroid = require("./asteroid.js");
const Bullet = require("./bullet.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

function Game() {
  this.asteroids = [];
  this.ships = [];
  this.bullets = [];

  this.addAsteroids();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 7;

Game.prototype.add = function add(object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else if(object instanceof Bullet) {
    this.bullets.push(object);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.add(new Asteroid({ game: this }));
  }
};

Game.prototype.addShip = function() {
  const ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });

  this.add(ship);

  return ship;
};

Game.prototype.randomPosition = function() {
  return [
    Math.random() * Game.DIM_X,
    Math.random() * Game.DIM_Y
  ];
};

Game.prototype.draw = function(ctx, img) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(img, 0, 0, 1000, 600);
  this.allObjects().forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(obj => obj.move());
};

Game.prototype.wrap = function(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.checkCollisions = function () {
  const allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length; i++) {
    let object1 = allObjects[i];
    for (let j = i + 1; j < allObjects.length; j++) {
      let object2 = allObjects[j];
      if (object1.isCollideWith(object2)) {
        const collision = object1.collideWith(object2);
        if (collision) return;
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  } else if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Ship) {
    this.ships.splice(this.ships.indexOf(object), 1);
  } else {
    throw new Error("unknown type of object");
  };
};

Game.prototype.allObjects = function() {
  return [].concat(this.asteroids, this.ships, this.bullets);
}

Game.prototype.isOutOfBounds = function(pos) {
  return (pos[0] < 0) || (pos[1] < 0) || 
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
}

module.exports = Game;