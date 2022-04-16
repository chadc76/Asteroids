const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

function Explosion(options) {
  options.pos = options.pos
  options.radius = options.radius;
  options.vel = [0, 0];
  this.timeCreated = Date.now();

  MovingObject.call(this, options);
}

Util.inherits(Explosion, MovingObject);

Explosion.prototype.draw = function(ctx) {
  const explodedImg = new Image();
  explodedImg.src = "explosion.png";

  if (Date.now() - this.timeCreated > 300) {
    this.remove();
    return;
  }
  ctx.drawImage(explodedImg, this.pos[0], this.pos[1], 75, 75);
}

module.exports = Explosion;