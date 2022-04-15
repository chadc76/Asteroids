function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
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


GameView.prototype.start = function(img) {
  this.bindKeyHandlers();
  let game = this.game;
  let ctx = this.ctx;
  setInterval(function() {
    game.step();
    game.draw(ctx, img);
  }, 20);
};

module.exports = GameView;