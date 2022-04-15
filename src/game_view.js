function GameView(game, ctx, img) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
  this.img = img;
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0], 
  x: 0, 
}

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;

  Object.keys(GameView.MOVES).forEach(function(k) {
    const move = GameView.MOVES[k];
    key(k, function() { ship.power(move)});
  });

  key("space", function () { ship.fireBullet() });
};


GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.lastTime = 0;

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function() {

  this.game.step();
  this.game.draw(this.ctx, this.img);

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;