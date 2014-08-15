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