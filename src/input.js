module.exports = Input;

function Input(canvas){
	this.canvas = canvas;
	this.x = 0;
	this.y = 0;
	this.keycode = {
		//arrows
		37: 'LEFT',
		38: 'UP',
		39: 'RIGHT',
		40: 'DOWN'
	};
	this.LEFT = false;
	this.UP = false;
	this.RIGHT = false;
	this.DOWN = false;
	canvas.addEventListener('mousemove',this.getMousePos.bind(this), false);
      window.addEventListener('keydown', this.onKeyboardEvent.bind(this), false);
      window.addEventListener('keyup', this.onKeyboardEvent.bind(this), false);
}

Input.prototype.getMousePos = function(evt) {
	var rect = this.canvas.getBoundingClientRect();
	this.x = evt.clientX - rect.left;
	this.y = evt.clientY - rect.top;
};

Input.prototype.onKeyboardEvent = function(evt) {

	var direction = this.keycode[evt.keyCode];
	//console.log(evt.type, evt.keyCode, direction, this[direction]);
	if(direction){
		if(evt.type == 'keyup'){
			this[direction] = false;
		}
		if(evt.type == 'keydown'){
			this[direction] = true;
		}
	}
	//console.log(evt.type, evt.keyCode, direction, this[direction]);
};
