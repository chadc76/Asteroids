const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

function Bullet(options) {
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
};

Bullet.RADIUS = 2;
Bullet.SPEED = 15;

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;