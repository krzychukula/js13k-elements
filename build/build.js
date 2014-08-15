(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var raf = require('./raf');
var rng = require('./rng');
var fitCanvas = require('./fit-canvas');

var canvas = document.querySelector('#game');
var c = canvas.getContext('2d');

var rand = rng();

var firefightercolors = ['#FFFF4D']

var balls = [];
var colors = [
  '#FF0300', '#28CCC5',
];

for (var i = 0; i < 50; i++) {
  balls.push({
    x: rand.int(canvas.width),
    y: rand.int(canvas.height / 2),
    radius: rand.range(5, 10),
    dx: rand.range(-1, 1),
    dy: rand.range(-1, 1),
    color: rand.pick(colors)
  });
}

fitCanvas(canvas, window);
canvas.style.backgroundColor = '#99653D';


raf.start(function(elapsed) {
  // Clear the screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Update each balls
  balls.forEach(function(ball) {
    // Gravity
    //ball.dy += elapsed * 1500;

    // Handle collision against the canvas's edges
    if (ball.x - ball.radius < 0 && ball.dx < 0 || ball.x + ball.radius > canvas.width && ball.dx > 0) ball.dx = -ball.dx * 0.7;
    if (ball.y - ball.radius < 0 && ball.dy < 0 || ball.y + ball.radius > canvas.height && ball.dy > 0) ball.dy = -ball.dy * 0.7;

    // Update ball position
    ball.x += ball.dx * elapsed;
    ball.y += ball.dy * elapsed;

    // Render the ball
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    c.closePath();
    c.fillStyle = ball.color;
    c.fill();
  });
});
},{"./fit-canvas":2,"./raf":3,"./rng":4}],2:[function(require,module,exports){
module.exports = function fitCanvas(canvas, window){
	var cw = canvas.width;
	var ch = canvas.height;

	var ww = window.innerWidth;
	var wh = window.innerHeight;

	if(ww < cw){
		canvas.width = ww;
		canvas.height = ww * ch / cw;

	}else if(wh < ch){
		canvas.height = wh;
		canvas.width = wh * cw/ch;
	}

}
},{}],3:[function(require,module,exports){
// Holds last iteration timestamp.
var time = 0;

/**
 * Calls `fn` on next frame.
 *
 * @param  {Function} fn The function
 * @return {int} The request ID
 * @api private
 */
function raf(fn) {
  return window.requestAnimationFrame(function() {
    var now = Date.now();
    var elapsed = now - time;

    if (elapsed > 999) {
      elapsed = 1 / 60;
    } else {
      elapsed /= 1000;
    }

    time = now;
    fn(elapsed);
  });
}

module.exports = {
  /**
   * Calls `fn` on every frame with `elapsed` set to the elapsed
   * time in milliseconds.
   *
   * @param  {Function} fn The function
   * @return {int} The request ID
   * @api public
   */
  start: function(fn) {
    return raf(function tick(elapsed) {
      fn(elapsed);
      raf(tick);
    });
  },
  /**
   * Cancels the specified animation frame request.
   *
   * @param {int} id The request ID
   * @api public
   */
  stop: function(id) {
    window.cancelAnimationFrame(id);
  }
};
},{}],4:[function(require,module,exports){
module.exports = function(seed) {
  var random = whrandom(seed);
  var rng = {
    /**
     * Return an integer within [0, max).
     *
     * @param  {int} [max]
     * @return {int}
     * @api public
     */
    int: function(max) {
      return random() * ((max || 0xfffffff) + 1) | 0;
    },
    /**
     * Return a float within [0.0, 1.0).
     *
     * @return {float}
     * @api public
     */
    float: function() {
      return random();
    },
    /**
     * Return a boolean.
     *
     * @return {Boolean}
     * @api public
     */
    bool: function() {
      return random() > 0.5;
    },
    /**
     * Return an integer within [min, max).
     *
     * @param  {int} min
     * @param  {int} max
     * @return {int}
     * @api public
     */
    range: function(min, max) {
      return rng.int(max - min) + min;
    },
    /**
     * Pick an element from the source.
     *
     * @param  {mixed[]} source
     * @return {mixed}
     * @api public
     */
    pick: function(source) {
      return source[rng.range(0, source.length)];
    }
  };

  return rng;
};

/**
 * Generate a seeded random number using Python's whrandom implementation.
 * See https://github.com/ianb/whrandom for more information.
 *
 * @param  {int} [seed]
 * @return {Function}
 * @api private
 */
function whrandom(seed) {
  if (!seed) {
    seed = Date.now();
  }

  var x = (seed % 30268) + 1;
  seed = (seed - (seed % 30268)) / 30268;
  var y = (seed % 30306) + 1;
  seed = (seed - (seed % 30306)) / 30306;
  var z = (seed % 30322) + 1;
  seed = (seed - (seed % 30322)) / 30322;

  return function() {
    x = (171 * x) % 30269;
    y = (172 * y) % 30307;
    z = (170 * z) % 30323;
    return (x / 30269.0 + y / 30307.0 + z / 30323.0) % 1.0;
  };
}
},{}]},{},[1]);
