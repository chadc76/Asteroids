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
      ((pos1[0] - pos2[0]) ** 2) + ((pos1[1] - pos2[1]) ** 2)
    );
  }
}

module.exports = Util;