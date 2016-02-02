$.widget("custom.sliderEx", $.ui.slider, {
	_create: function() {
    this.options.title = this.options.title || this.element.attr("title");
    
    this.options._valueDiv = $("<div class='slider-val'></div>");
    
    var title = this.options.title;
    var parent = $("<div class='slider-comp'></div>");
	
  	parent.insertBefore(this.element);
    parent.append("<div class='slider-title'>"+title+"</div>");
    
    this.element.addClass("slider");

    parent.append(this.element.detach());
    parent.append(this.options._valueDiv);
    
    this.options._valueDiv.text(this.options.value);
    
    return this._super();
  },
  _slide: function() {
  	this._superApply(arguments);
    
  	this.options._valueDiv.text(this.options.value);
  }
});

function getRandomColor() {
  var letters = '0123456789abcdef'.split('');
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function toRadians(degrees) {
	return degrees * (Math.PI/180);
}

var canvas = $("#tree-canvas");
var w = canvas.width();
var h = canvas.height();

canvas.attr("width", w);
canvas.attr("height", h);

var ctx = canvas[0].getContext("2d");

function randomRange(min, max) {
  return min+(Math.random()*(max-min));
}

function drawTree(x, y, radius, startAngle, incAngle, randomAngle, startLength, lengthMod, startLineWidth, lineWidthMod, trunkColor, leafColor, leafColorStartRadius, curRadius) {
  if (curRadius < radius) {
    var nx = x+(Math.sin(startAngle)*startLength);
    var ny = y-(Math.cos(startAngle)*startLength);

    if (curRadius < leafColorStartRadius) {
      ctx.strokeStyle = trunkColor;
    } else if (curRadius >= leafColorStartRadius) {
      ctx.strokeStyle = leafColor;
    }

    ctx.lineWidth = startLineWidth;
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    ctx.beginPath();
    drawTree(nx, ny, radius, startAngle-incAngle+randomRange(-randomAngle, randomAngle), incAngle, randomAngle, startLength*lengthMod, lengthMod, startLineWidth*lineWidthMod, lineWidthMod, trunkColor, leafColor, leafColorStartRadius, curRadius+1);
    ctx.closePath();

    ctx.beginPath();
    drawTree(nx, ny, radius, startAngle+incAngle+randomRange(-randomAngle, randomAngle), incAngle, randomAngle, startLength*lengthMod, lengthMod, startLineWidth*lineWidthMod, lineWidthMod, trunkColor, leafColor, leafColorStartRadius, curRadius+1);
    ctx.closePath();
  }
}

//drawTree(140, 220, 14, 0, Math.PI*(1/8), Math.PI*(1/13), 40, 0.8, 10, 0.8, getRandomColor(), getRandomColor(), 8, 0);

$("#generate").click(function() {
	var x = $("#x-slider").sliderEx("value");
  var y = $("#y-slider").sliderEx("value");
  
  var segments = $("#segment-slider").sliderEx("value");
  var startAngle = toRadians($("#start-angle-slider").sliderEx("value"));
  var incAngle = toRadians($("#inc-angle-slider").sliderEx("value"));
  var randomAngle = toRadians($("#random-angle-slider").sliderEx("value"));
  var trunkLength = $("#trunk-length-slider").sliderEx("value");
  var startLineWidth = $("#start-line-width-slider").sliderEx("value");
  var leafColourStart = $("#leaf-colour-start-slider").sliderEx("value");
  
  var leafColour = $("#leaf-colour-box").val();
  var trunkColour = $("#trunk-colour-box").val();
  
  drawTree(x, y, segments, startAngle, incAngle, randomAngle, trunkLength, 0.8, startLineWidth, 0.8, "#"+trunkColour, "#"+leafColour, leafColourStart, 0);
});

$("#clear").click(function() {
	ctx.clearRect(0, 0, w, h);
});

$(".button").button();

$("#x-slider").sliderEx({
		title:"X",
		value:w/2,
		min:0,
    max:w
});

$("#y-slider").sliderEx({
		title:"Y",
		value:h/2,
		min:0,
    max:h
});

$("#segment-slider").sliderEx({
		title:"Segments",
		value:14,
		min:1,
    max:50
});

$("#start-angle-slider").sliderEx({
		title:"Start angle",
		value:0,
		min:0,
    max:360
});

$("#inc-angle-slider").sliderEx({
		title:"Increment angle",
		value:33,
		min:0,
    max:360
});

$("#random-angle-slider").sliderEx({
		title:"Random deviation angle",
		value:14,
		min:0,
    max:360
});

$("#trunk-length-slider").sliderEx({
		title:"Trunk length",
		value:50,
		min:0,
    max:200
});

$("#start-line-width-slider").sliderEx({
		title:"Start line width",
		value:10,
		min:0,
    max:50
});

$("#leaf-colour-start-slider").sliderEx({
		title:"Leaf colour start",
		value:10,
		min:0,
    max:50
});

$(".colour-box").each(function() {
	$(this).val(getRandomColor());
});

$('.colour-box').colorpicker();
