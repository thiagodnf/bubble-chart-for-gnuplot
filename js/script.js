var minValue = 1,
	maxValue = 30;

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};

function getLineNumber(data, str){
	var lines = data.trim().split(/\r*\n/)

	var foundLine = -1;

	$.each(lines, function(index, line){
		if(line.trim() == str.trim()){
			foundLine = index + 1;
		}
	});

	return foundLine;
}

function getLines(str){
	var lines = str.trim().split(/\r*\n/)

	if(lines.length == 0){
		throw Error("Lines cannot be empty");
	}

	return lines;
}

function getSize(isWidescreen){
	var option = $("#output").val();

	if(option == "pdf"){
		return (isWidescreen) ? "8,4" : "4,4";
	}

	return (isWidescreen) ? "800,400" : "400,400";
}

function getOutput(){
	var option = $("#output").val();

	if(option == "pdf"){
		return "set terminal pdf size {SIZE} enhanced\n set output 'out.pdf'";
	}else if(option == "jpg"){
		return "set terminal jpeg size {SIZE} enhanced\n set output 'out.jpg'";
	}else if(option == "png"){
		return "set terminal png size {SIZE} enhanced\n set output 'out.png'";
	}else{
		throw Error("The output cannot be identified");
	}
}

function getInformations(data){
	var informations = data.trim().split(/\#/);

	var size = informations.length;

	// Data validate

	if(size <= 0 || size >= 3){
		throw Error("You should to define 1 or 2 informations. You defined " + size + " informations");
	}

	$.each(informations, function(index, value){
		if(value.trim() == ""){
			throw Error("The dimension cannot be empty");
		}
	});

	return informations;
}


function getRange(obj){
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;

	for(var i in obj){
		if(obj[i] < min){
			min = obj[i];
		}
		if(obj[i] > max){
			max = obj[i];
		}
	}

	return (min-1) + ":" + (max + 1);
}

function getBottomMargim(obj){
	var margin = 2;

	var maxValue = 0;

	for(var i in obj){
		var value = i.split("\\n").length-1;

		if(value > maxValue){
			maxValue = value;
		}
	}

	return margin + maxValue;
}

function getTics(obj){
	var tics = "";

	for(var i in obj){
		tics += "\"" + i + "\" " + obj[i] + ",";
	}

	return tics.substring(0, tics.length - 1);;
}

function wrap(str){
	if($("#wrap-text").val() == "Yes"){
		return str.replaceAll(" ","\\n");
	}

	return str;
}

function generate(data){
	var dim = {
		x: {},
		y: {},
	};

	var dataCircle = "",
		dataText = "";

	var indexX = 1;
	var indexY = 1;

	var informations = getInformations(data);

	$.each(informations, function(informationIndex, information){
		var lines = getLines(information);

		$.each(lines, function(lineIndex, line){
			var arrays = line.split(";");

			if(arrays.length != 3){
				throw Error("A line should be 3 values separated by ';'. Line " + getLineNumber(data, line));
			}

			$.each(arrays, function(index, array){
				if( ! array.trim()){
					throw Error("Column " + (index + 1) + " cannot be empty. Line " + getLineNumber(data, line));
				}

				if(index == 2 && ! $.isNumeric(array)){
					throw Error("Column 3 should be a number. Line " + getLineNumber(data, line));
				}
			});

			if( ! dim.x[wrap(arrays[0])]){
				dim.x[wrap(arrays[0])] = (informationIndex == 0)? indexX++: --indexX;
			}
			if( ! dim.y[wrap(arrays[1])]){
				dim.y[wrap(arrays[1])] = indexY++;
			}

			var value = arrays[2] * (minValue / maxValue);

			dataCircle += dim.x[wrap(arrays[0])] + " " + dim.y[arrays[1]] + " " + value + "\n";
			dataText += dim.x[wrap(arrays[0])] + " " + dim.y[arrays[1]] + " " + arrays[2] + "\n";
		});

		indexX = 0;
	});

	var model = $("#model").text();

	model = model.replaceAll("{X_TICS}", getTics(dim.x));
	model = model.replaceAll("{Y_TICS}", getTics(dim.y));
	model = model.replaceAll("{X_RANGE}", getRange(dim.x));
	model = model.replaceAll("{Y_RANGE}", getRange(dim.y));
	model = model.replaceAll("{SCALE}", 1);
	model = model.replaceAll("{CIRCLE_COLOR}", $("#circle-color").val());
	model = model.replaceAll("{TEXT_COLOR}", $("#text-color").val());
	model = model.replaceAll("{ROTATE}", "0");
	model = model.replaceAll("{DATA_CIRCLE}", dataCircle);
	model = model.replaceAll("{DATA_TEXT}", dataText);
	model = model.replaceAll("{B_MARGIN}", getBottomMargim(dim.x));
	model = model.replaceAll("{OUTPUT}", getOutput());


	if(informations.length > 1){
		model = model.replaceAll("{Y_AXIS}", "set yzeroaxis \n set ytics axis \n set ytics center");
		model = model.replaceAll("{SIZE}", getSize(true));
	}else{
		model = model.replaceAll("{Y_AXIS}", "");
		model = model.replaceAll("{SIZE}", getSize(false));
	}

	$("#script").val(model);

	$("#modal-result").modal('show');
}

function getExampleOfOneInformation(){
	var str = "";

	str += "Red;Circle;10\n";
	str += "White;Triangle;4\n";
	str += "Red;Triangle;8\n";
	str += "Green;Ellipse;1\n";
	str += "Blue;Rectangle;15\n";

	return str;
}

function getExampleOfTwoInformations(){

	var str = getExampleOfOneInformation();

	str += "#\n";
	str += "Gold;Circle;6\n";
	str += "Silver;Rectangle;2\n";
	str += "Silver;Triangle;7\n";
	str += "Iron;Triangle;9\n";
	str += "Titanium;Rectangle;1\n";

	return str;
}

$(function(){

	new Clipboard('#btn-copy');

	$('#btn-generate').click(function (event) {
		event.preventDefault();

		var data = $("#data").val().trim();

		if(data){
			try{
				generate(data);
			}catch(error){
				alert(error);
			}
		}else{
			alert("Data field cannot be empty");
		}
	});

	$("#btn-example-one-information").click(function(event){
		$("#data").val(getExampleOfOneInformation());
	});

	$("#btn-example-two-informations").click(function(event){
		$("#data").val(getExampleOfTwoInformations());
	});

	$("#export").click(function(event){
		var script = $("#script").val();

		var blob = new Blob([script], {type: "text/plain;charset=utf-8"});

		var a = document.createElement("a");
		document.body.appendChild(a);
    	a.style = "display: none";
		a.href = window.URL.createObjectURL(blob);
		a.download = "script.gnu";
		a.click();


		//$(this).attr("href","data:text/plain;charset=utf-8," + script);
	});

	$('.select').selectpicker({
	  size: 8
	});
});
