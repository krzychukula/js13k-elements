var rng = require('./rng');
var rand = rng();

module.exports = Balls;

function Balls(canvas, context){
	this.balls = [];
	this.colors = [
	  '#FF0300', '#28CCC5',
	];
	this.canvas = canvas;
	this.context = context;

	for (var i = 0; i < 50; i++) {
		this.balls.push({
			x: rand.int(canvas.width),
			y: rand.int(canvas.height / 2),
			radius: rand.range(5, 10),
			dx: rand.range(-1, 1),
			dy: rand.range(-1, 1),
			color: rand.pick(this.colors)
			});
		}
}

Balls.prototype.update = function(elapsed) {
	var canvas = this.canvas;
	// Update each balls
	this.balls.forEach(function(ball) {
		// Gravity
		//ball.dy += elapsed * 1500;

		// Handle collision against the canvas's edges
		if (ball.x - ball.radius < 0 && ball.dx < 0 || ball.x + ball.radius > canvas.width && ball.dx > 0) ball.dx = -ball.dx * 0.7;
		if (ball.y - ball.radius < 0 && ball.dy < 0 || ball.y + ball.radius > canvas.height && ball.dy > 0) ball.dy = -ball.dy * 0.7;

		// Update ball position
		ball.x += ball.dx * elapsed;
		ball.y += ball.dy * elapsed;
	});
};

Balls.prototype.draw = function(elapsed) {
	var c = this.context;
	// Update each balls
	this.balls.forEach(function(ball) {
		// Render the ball
		c.beginPath();
		c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
		c.closePath();
		c.fillStyle = ball.color;
		c.fill();
	});
};