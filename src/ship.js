const MovingObject = require("./moving_object.js");
const Util = require("./util.js");
const Bullet = require("./bullet.js");
const Explosion = require("./explosion.js");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

function Ship(options) {
  options.color = options.color || randomColor();
  options.radius = Ship.RADIUS;
  options.vel = options.vel || [0, 0];

  MovingObject.call(this, options);
};

Ship.RADIUS = 15;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.boom();
  let explosion = new Explosion({
    pos: this.pos,
    radius: this.radius,
    game: this.game
  })
  console.log(explosion.radius)
  this.game.add(explosion);
  this.vel = [0, 0];
  this.pos = this.game.randomPosition();
};

Ship.prototype.power = function(impulse) {
  let newVel = Util.vel(this.vel, impulse)
  this.vel[0] = newVel[0];
  this.vel[1] = newVel[1];
};

Ship.prototype.fireBullet = function() {
  const norm = Util.norm(this.vel);
  
  if (norm === 0) {
    return;
  }
  
  this.pew();

  const relVel = Util.scale(
    Util.dir(this.vel),
    Bullet.SPEED
  );

  const bulletVel = [
    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  ];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: "white",
    game: this.game
  });

  this.game.add(bullet);
};

Ship.prototype.pew = function() {
  let beat = new Audio('./laser.wav');
  beat.volume = 0.05;
  beat.play();
};

Ship.prototype.boom = function () {
  let beat = new Audio('./small_explosion.wav');
  beat.volume = 0.05;
  beat.play();
}

module.exports = Ship;