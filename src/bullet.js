const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

function Bullet(options) {
  options = options || {};
  this.pos = options.pos;
  options.color = options.color;
  options.radius = 1;
  options.vel = options.vel;

  MovingObject.call(this, options);
};

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;