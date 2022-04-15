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
  },

  vel(vel, impulse) {
    if (impulse === 0) {
      return [0, 0];
    }

    if ((vel[0] < 0 && impulse[0] > 0) || (vel[0] > 0 && impulse[0] < 0) ) {
      vel[0] = impulse[0];
    } else {
      vel[0] += impulse[0];
    };

    if ((vel[1] < 0 && impulse[1] > 0) || (vel[1] > 0 && impulse[1] < 0)) {
      vel[1] = impulse[1];
    } else {
      vel[1] += impulse[1];
    };

    return vel;
  }
}

module.exports = Util;