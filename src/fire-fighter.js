module.exports = FireFighter;

function FireFighter(canvas, context, input){
	this.color = '#FFFF4D';
	this.radius = 10;
	this.hatRadius = 13;
	this.biggerColor = '#EEEE47';
	this.emblemColor = '#FF0300';
	this.emblemRadius = 2;
	this.canvas = canvas;
	this.c = context
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.input = input;
	this.rdx = 0;
	this.rdy = 0;
	this.rotation = 0;
	this.speed = 0;
}

FireFighter.prototype.update = function(elapsed) {
	this.rdx = this.input.x - this.x;
	this.rdy = this.input.y - this.y;

	this.rotation = Math.atan2(this.rdy, this.rdx) + Math.PI / 2;

	this.speed = 0;

	if(this.input.UP){

		this.speed = 100 * elapsed;
	}
	var angle = this.rotation - Math.PI / 2, //in radians
            ax = Math.cos(angle) * this.speed,
            ay = Math.sin(angle) * this.speed;

        var vx = ax;
        var vy = ay;
        this.x += vx;
        this.y += vy;
};

FireFighter.prototype.draw = function() {
	var c = this.c;
	var canvas = this.canvas;

	c.save();

 	c.lineWidth = 0;
	c.strokeStyle = 'black';

      c.translate(this.x, this.y);
      c.rotate(this.rotation);

      c.save();
	      c.scale(1, 1.3);
	      c.beginPath();
	      c.arc(0,+1, this.hatRadius, 0, 2 * Math.PI, false);
	      // apply styling
	      c.fillStyle = this.biggerColor;
	      c.fill();
	      c.lineWidth = 1;
	      c.stroke();
      c.restore();




      //top
      c.save()
		c.beginPath();
		c.arc(0, 0, this.radius, 0, Math.PI * 2, true);

		c.fillStyle = this.color;
		c.shadowColor = 'black';
	      c.shadowBlur = 7;
	      c.shadowOffsetX = 0;
	      c.shadowOffsetY = 0;
		c.fill();
		c.lineWidth = 1;
	      c.strokeStyle = 'black';
	      c.stroke();
	      c.closePath();
	      c.stroke();
      c.restore();



      c.save();
      	c.beginPath();
	      c.strokeStyle = 'black';
		c.lineWidth = 4;
	      c.moveTo(-7, -8);
	      c.lineTo(7, -8);
	      c.stroke();
	      c.closePath();
	c.restore();

      c.restore();
};