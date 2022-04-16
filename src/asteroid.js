const Util = require("./util.js");
const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");
const Ship = require("./ship");
const Explosion = require("./explosion.js");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

function Asteroid(options){
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet) {
    this.boom();
    let explosion = new Explosion({
      pos: this.pos,
      radius: this.radius,
      game: this.game
    })
    this.game.add(explosion);
    this.remove();
    otherObject.remove();
    return true;
  }

  return false;
}


Asteroid.prototype.boom = function () {
  let beat = new Audio('./explosion.wav');
  beat.volume = 0.05;
  beat.play();
}

module.exports = Asteroid;