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