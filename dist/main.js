/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);
	const GameView = __webpack_require__(5);
	const MovingObject = __webpack_require__(3);

	document.addEventListener("DOMContentLoaded", function() {
	  let ctx = document.getElementById('game-canvas').getContext('2d');
	  let circle = new MovingObject({
	    pos: [30, 30],
	    vel: [10, 10],
	    radius: 5,
	    color: "#00FF00"
	  });
	  
	  let gameView = new GameView(new Game(), ctx);
	  gameView.start();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(8);
	const MovingObject = __webpack_require__(3);

	const DEFAULTS = {
	  COLOR: "#505050",
	  RADIUS: 25,
	  SPEED: 4
	};

	function Asteroid(options){
	  options = options || {};
	  options.color = DEFAULTS.COLOR;
	  options.pos = options.pos || options.game.randomPosition();
	  options.radius = DEFAULTS.RADIUS;
	  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

	  MovingObject.call(this, options);
	}

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);
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
	}

	MovingObject.prototype.move = function() {
	  let unwrapped = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

	  this.pos = this.game.wrap(unwrapped);
	}

	module.exports = MovingObject;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);
	const Util = __webpack_require__(8);

	function Game() {
	  this.asteroids = [];
	  
	  this.addAsteroids();
	};

	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 10;

	Game.prototype.addAsteroids = function() {
	  for (let i = 0; i <= Game.NUM_ASTEROIDS; i++) {
	    let asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
	    this.asteroids.push(asteroid);
	  }
	};

	Game.prototype.randomPosition = function() {
	  return [
	    Math.random() * Game.DIM_X,
	    Math.random() * Game.DIM_Y
	  ];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = "black";
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.asteroids.forEach(a => a.draw(ctx));
	};

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach(a => a.move());
	};

	Game.prototype.wrap = function(pos) {
	  return [
	    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
	  ];
	};

	module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	function GameView(game, ctx) {
	  this.game = game;
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

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    childClass.prototype = Object.create(parentClass.prototype);
	    childClass.prototype.constructor = childClass;
	  },
	  randomVec(length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },

	  wrap(pos, maxPos) {
	    if (pos < 0) {
	      return maxPos + (pos % maxPos);
	    } else if (pos > maxPos) {
	      return pos % maxPos;
	    } else {
	      return pos;
	    }
	  },

	  dist(pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  }
	}

	module.exports = Util;

/***/ })
/******/ ]);