const Game = require("./game.js");

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  let game = this.game;
  let ctx = this.ctx;
  setInterval(function() {
    game.draw(ctx);
    game.moveObjects();
  }, 20);
};

module.exports = GameView;