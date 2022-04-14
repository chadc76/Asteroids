const Util = require("./utils");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

function Asteroid(options){
  this.pos = options.pos;
  MovingObject.call(this, options);
  this.radius = DEFAULTS.RADIUS;
  this.color = DEFAULTS.COLOR;
  this.vel = Util.randomVec(DEFAULTS.SPEED);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;