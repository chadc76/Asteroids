function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
}

GameView.prototype.start = function() {
  let game = this.game;
  let ctx = this.ctx;
  setInterval(function() {
    game.draw(ctx);
    game.step();
  }, 20);
};

module.exports = GameView;