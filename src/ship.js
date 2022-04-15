const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

const DEFAULTS = {
  COLOR: "#00FF00",
  RADIUS: 15
};

function Ship(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || [0, 0];

  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;