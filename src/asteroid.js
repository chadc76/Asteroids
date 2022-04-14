const Util = require("./utils");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25
};

function Asteroid(pos){
  MovingObject.call(this, pos);
  this.radius = DEFAULTS["RADIUS"];
  this.color = DEFAULTS["COLOR"];
  this.vel = Util.randomVec(4);
}

Util.inherits(Asteroid, MovingObject);