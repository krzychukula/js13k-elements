var raf = require('./raf');
var fitCanvas = require('./fit-canvas');
var FireFighter = require('./fire-fighter');
var Balls = require('./balls');
var Input = require('./input');

var canvas = document.querySelector('#game');
var c = canvas.getContext('2d');

var input = new Input(canvas);
var fighter = new FireFighter(canvas, c, input);
var balls = new Balls(canvas, c);




fitCanvas(canvas, window);
canvas.style.backgroundColor = '#99653D';


raf.start(function(elapsed) {
  // Clear the screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.update(elapsed);
  balls.draw();

  fighter.update(elapsed)
  fighter.draw();
});