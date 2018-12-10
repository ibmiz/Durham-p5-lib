var offset = 300;
var noiseX;
var noiseY;
var noiseF;
var ofs = 0.0;

var sliderx;
var slidery;

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(255, 150);
  strokeWeight(1.5);
  noFill();
  noiseX = random(200);
  noiseY = random(200);
  noiseF = random(200);
  
  sliderx = createSlider(0, width, 100);
  sliderx.position(10, 10);
  sliderx.style('width', '80px');
  
  slidery = createSlider(0, height, 100);
  slidery.position(10, 30);
  slidery.style('width', '80px');
  
  slidercolour1 = createSlider(0, 255, 100);
  slidercolour1.position(10, 50);
  slidercolour1.style('width', '80px');
  
  slidercolour2 = createSlider(0, 255, 100);
  slidercolour2.position(10, 70);
  slidercolour2.style('width', '80px');
}


function draw() {
	background('black');
  ofs += 0.015;
  var waveH = map(sliderx.value(), 0, width, 100, 500);
  for (var h = slidery.value(); h < height + 100; h += 4) {
		line = new Line (slidery.value(), sliderx.value(), noiseX, noiseY, noiseF, ofs, h, waveH,slidercolour1.value(), slidercolour2.value());
		line.drawLine();
	}
}


class Line {
	constructor (ysliderval, xsliderval, noiseX, noiseY, noiseF, ofs, h, waveH, colour1, colour2){
		this.ysliderval=ysliderval;
		this.xsliderval=xsliderval;
		this.noiseX= noiseX;
		this.noiseY= noiseY;
		this.noiseF= noiseF;
		this.ofs = ofs;
		this.h = h;
		this.waveH = waveH;
		this.colour1 = colour1;
		this.colour2 = colour2;
	}
	
	drawLine(){
    beginShape();
		stroke(this.colour1, this.colour2, map(this.h, this.ysliderval, height, 0, 255));
											
		var x = 0;
    var y = this.h + this.waveH * noise(this.noiseX, this.noiseY + this.h * 0.01, this.noiseF + this.ofs);
    curveVertex(x, y);

		for (var w = 0; w <= width; w += 20) {
      x = w;
      y = this.h + this.waveH * noise(this.noiseX + w * 0.001, this.noiseY + this.h * 0.01, this.noiseF + this.ofs)
      curveVertex(x, y);
    }
		
		x = width;
    y = this.h + this.waveH * noise(this.noiseX + width, this.noiseY + this.h * 0.01, this.noiseF + this.ofs);
    curveVertex(x, y);
    endShape();
	
	}

}