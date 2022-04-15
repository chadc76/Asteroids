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

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(6);

	document.addEventListener("DOMContentLoaded", function() {
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;

	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Bullet = __webpack_require__(7);
	const Ship = __webpack_require__(5);
	const Util = __webpack_require__(3);

	function Game() {
	  this.asteroids = [];
	  this.ships = [];
	  this.bullets = [];

	  this.addAsteroids();
	};

	Game.BG_COLOR = "#000000";
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 7;

	Game.prototype.add = function add(object) {
	  if (object instanceof Asteroid) {
	    this.asteroids.push(object);
	  } else if (object instanceof Ship) {
	    this.ships.push(object);
	  } else if(object instanceof Bullet) {
	    this.bullets.push(object);
	  } else {
	    throw new Error("unknown type of object");
	  }
	};

	Game.prototype.addAsteroids = function addAsteroids() {
	  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.add(new Asteroid({ game: this }));
	  }
	};

	Game.prototype.addShip = function() {
	  const ship = new Ship({
	    pos: this.randomPosition(),
	    game: this
	  });

	  this.add(ship);

	  return ship;
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
	  this.allObjects().forEach(obj => obj.draw(ctx));
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects().forEach(obj => obj.move());
	};

	Game.prototype.wrap = function(pos) {
	  return [
	    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
	  ];
	};

	Game.prototype.checkCollisions = function () {
	  const allObjects = this.allObjects();
	  for (let i = 0; i < allObjects.length; i++) {
	    let object1 = allObjects[i];
	    for (let j = i + 1; j < allObjects.length; j++) {
	      let object2 = allObjects[j];
	      if (object1.isCollideWith(object2)) {
	        const collision = object1.collideWith(object2);
	        if (collision) return;
	      }
	    }
	  }
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.remove = function (object) {
	  if (object instanceof Asteroid) {
	    this.asteroids.splice(this.asteroids.indexOf(object), 1);
	  } else if (object instanceof Bullet) {
	    this.bullets.splice(this.bullets.indexOf(object), 1);
	  } else if (object instanceof Ship) {
	    this.ships.splice(this.ships.indexOf(object), 1);
	  } else {
	    throw new Error("unknown type of object");
	  };
	};

	Game.prototype.allObjects = function() {
	  return [].concat(this.asteroids, this.ships, this.bullets);
	}

	Game.prototype.isOutOfBounds = function(pos) {
	  return (pos[0] < 0) || (pos[1] < 0) || 
	    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	}

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	const Bullet = __webpack_require__(7);
	const Ship = __webpack_require__(5);

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

	Asteroid.prototype.collideWith = function(otherObject) {
	  if (otherObject instanceof Ship) {
	    otherObject.relocate();
	    return true;
	  } else if (otherObject instanceof Bullet) {
	    this.remove();
	    otherObject.remove();
	    return true;
	  }

	  return false;
	}


	module.exports = Asteroid;

/***/ }),
/* 3 */
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
	      return maxPos - (pos % maxPos);
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
	  },

	  norm(vec) {
	    return Util.dist([0, 0], vec);
	  },

	  dir(vec) {
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  }
	}

	module.exports = Util;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3)
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

	MovingObject.prototype.move = function() {
	  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(3);
	const Bullet = __webpack_require__(7);

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
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};

	Ship.prototype.power = function(impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};

	Ship.prototype.fireBullet = function() {
	  const norm = Util.norm(this.vel);

	  if (norm === 0) {
	    // Can't fire unless moving.
	    return;
	  }

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
	    color: this.color,
	    game: this.game
	  });

	  this.game.add(bullet);
	}

	module.exports = Ship;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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
	  let game = this.game;
	  let ctx = this.ctx;
	  setInterval(function() {
	    game.step();
	    game.draw(ctx);
	  }, 20);
	};

	module.exports = GameView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

	function Bullet(options) {
	  options.radius = Bullet.RADIUS;

	  MovingObject.call(this, options);
	};

	Bullet.RADIUS = 2;
	Bullet.SPEED = 15;

	Util.inherits(Bullet, MovingObject);

	Bullet.prototype.isWrappable = false;

	module.exports = Bullet;

/***/ })
/******/ ]);