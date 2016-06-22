var minValue = 1,
	maxValue = 30;

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};

function getLines(){
	var data = $("#data").val().trim();

	return data.split(/\r*\n/);
}

function defineIndexFor(object){
	var index = 1;

	for(var i in object){
		object[i] = index++;
	}

	return object;
}

function getDimensions(lines){
	var dim = {
		x: {},
		y: {},
		z: {}
	};

	$.each(lines, function(index, line){
		var array = line.split(";");

		dim.x[array[0]] = array[0];
		dim.y[array[1]] = array[1];

		if(array.length == 4){
			dim.z[array[2]] = array[2];
		}
	});

	defineIndexFor(dim.x);
	defineIndexFor(dim.y);
	defineIndexFor(dim.z);

	return dim;
}

function getYRange(dimY){
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;

	for(var i in dimY){
		if(dimY[i] < min){
			min = dimY[i];
		}
		if(dimY[i] > max){
			max = dimY[i];
		}
	}

	return (min-1) + ":" + (max + 1);
}

function getXRange(dimX, dimZ){
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;

	for(var i in dimX){
		if(dimX[i] < min){
			min = dimX[i];
		}
		if(dimX[i] > max){
			max = dimX[i];
		}
	}

	for(var i in dimZ){
		if(dimZ[i] < min){
			min = dimZ[i];
		}
		if(dimZ[i] > max){
			max = dimZ[i];
		}
	}

	return (min-1) + ":" + (max + 1);
}

function getYTics(obj){
	var tics = "";

	for(var i in obj){
		tics += "\""+i+"\" " + obj[i] + ",";
	}

	return tics.substring(0, tics.length - 1);;
}

function getXTics(dimX, dimZ){
	var tics = "";

	for(var i in dimX){
		tics += "\""+i+"\" " + dimX[i] + ",";
	}

	for(var i in dimZ){
		tics += "\""+i+"\" -" + dimZ[i] + ",";
	}

	return tics.substring(0, tics.length - 1);;
}

function normalize(value, min, max){
	return (value - min) / (max - min);
}

function getDataForText(lines, dim){
	var data = "";

	$.each(lines, function(index, line){

		var array = line.split(";");

		data += dim.x[array[0]] + " "+dim.y[array[1]] + " " + array[2] + "\n";
	});

	return data;
}

function getDataForCircle(lines, dim){
	var data = "";

	$.each(lines, function(index, line){

		var array = line.split(";");

		var value = array[2]*(minValue/maxValue);

		data += dim.x[array[0]] + " "+dim.y[array[1]] + " " + value + "\n";
	});

	return data;
}

function generate(){

	var lines = getLines();

	var dim = getDimensions(lines);

	var model = $("#model").text();

	model = model.replaceAll("{Y_TICS}", getYTics(dim.y));
	model = model.replaceAll("{X_TICS}", getXTics(dim.x, dim.z));
	model = model.replaceAll("{X_RANGE}", getXRange(dim.x, dim.z));
	model = model.replaceAll("{Y_RANGE}", getYRange(dim.y));
	model = model.replaceAll("{SCALE}", 1);
	model = model.replaceAll("{DATA_CIRCLE}", getDataForCircle(lines, dim));
	model = model.replaceAll("{DATA_TEXT}", getDataForText(lines, dim));
	model = model.replaceAll("{CIRCLE_COLOR}", $("#color").val());
	model = model.replaceAll("{TEXT_COLOR}", $("#textcolor").val());
	model = model.replaceAll("{ROTATE}", $("#rotation").val());

	$("#script").text(model);

	$("#modal-result").modal('show');
}

function example(){

	var str = "";

	str += "A;D;10\n";
	str += "B;E;4\n";
	str += "A;E;8\n";
	str += "C;F;1\n";
	str += "C;D;15\n";

	$("#data").val(str);
}

$(function(){

	new Clipboard('#copy');

	$('#generate').click(function (event) {
		event.preventDefault();
		generate();
	});

	$("#example").click(function(event){
		example();
	});

	$("#export").click(function(event){
		var script = $("#script").val();
		$(this).attr("href","data:text/plain;charset=utf-8," + script);
	});
});
