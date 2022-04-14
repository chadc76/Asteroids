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

	const Asteroid = __webpack_require__(3);
	const Game = __webpack_require__(4);
	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(2);

	window.MovingObject = MovingObject;

	document.addEventListener("DOMContentLoaded", function() {
	  let ctx = document.getElementById('game-canvas').getContext('2d');
	  let circle = new MovingObject({
	    pos: [30, 30],
	    vel: [10, 10],
	    radius: 5,
	    color: "#00FF00"
	  });

	  let game = new Game();

	  let asteroid = new Asteroid({ pos: [65, 65] });

	  game.draw(ctx);
	  circle.draw(ctx);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
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
	  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
	}

	module.exports = MovingObject;

/***/ }),
/* 2 */
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
	  }
	}

	module.exports = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const MovingObject = __webpack_require__(1);

	const DEFAULTS = {
	  COLOR: "#505050",
	  RADIUS: 25,
	  SPEED: 4
	};

	function Asteroid(options){
	  this.pos = options.pos;
	  MovingObject.call(this, options);
	  this.radius = DEFAULTS.RADIUS;
	  this.color = DEFAULTS.COLOR;
	  this.vel = Util.randomVec(DEFAULTS.SPEED);
	}

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);

	function Game() {
	  this.asteroids = [];
	  
	  this.addAsteroids();
	};

	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 10;

	Game.prototype.addAsteroids = function() {
	  for (let i = 0; i <= Game.NUM_ASTEROIDS; i++) {
	    this.asteroids.push(new Asteroid({ pos: this.randomPosition() }));
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
	}

	module.exports = Game;

/***/ })
/******/ ]);