const Util = require("./util.js")
function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.move = function(timeDelta) {
  const normalFPS = 1000 / 60;

  const velX = (this.vel[0] * timeDelta) / normalFPS;
  const velY = (this.vel[1] * timeDelta) / normalFPS;

  this.pos = [this.pos[0] + velX, this.pos[1] + velY];

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};

MovingObject.prototype.isCollideWith = function (otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function(otherObject) {
};

MovingObject.prototype.remove = function() {
  this.game.remove(this);
}

module.exports = MovingObject;