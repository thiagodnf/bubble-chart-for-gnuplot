var minValue = 1,
    maxValue = 30;

const sorting ={
    ascending: ascending,
    descending: descending
}

String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};

function getLineNumber(data, str) {
    var lines = data.trim().split(/\r*\n/);

    var foundLine = -1;

    $.each(lines, function (index, line) {
        if (line.trim() == str.trim()) {
            foundLine = index + 1;
        }
    });

    return foundLine;
}

function getLines(str) {
    var lines = str.trim().split(/\r*\n/);

    if (lines.length == 0) {
        throw Error("Lines cannot be empty");
    }

    return lines;
}

function getSize(isWidescreen) {
    var option = $("#output").val();

    if (option == "pdf") {
        return (isWidescreen) ? "8,4" : "4,4";
    }

    return (isWidescreen) ? "800,400" : "400,400";
}

function getOutput() {
    var option = $("#output").val();

    if (option == "pdf") {
        return "set terminal pdf size @SIZE@ enhanced\n set output 'out.pdf'";
    } else if (option == "jpg") {
        return "set terminal jpeg size @SIZE@ enhanced\n set output 'out.jpg'";
    } else if (option == "png") {
        return "set terminal png size @SIZE@ enhanced\n set output 'out.png'";
    } else {
        throw Error("The output cannot be identified");
    }
}

function getBottomMargim(obj) {
    var margin = 2;

    var maxValue = 0;

    for (var i in obj) {
        var value = i.split("\\n").length - 1;

        if (value > maxValue) {
            maxValue = value;
        }
    }

    return margin + maxValue;
}

function wrap(str) {

    if ($("#wrap-text").val() == "Yes") {
        return str.replaceAll(" ", "\\n");
    }

    return str;
}

function getExampleOfOneInformation() {
    var str = "";

    str += "Red;Circle;10\n";
    str += "White;Triangle;4\n";
    str += "Red;Triangle;8\n";
    str += "Green;Ellipse;1\n";
    str += "Blue;Rectangle;15\n";

    return str;
}

function getExampleOfTwoInformation() {

    var str = getExampleOfOneInformation();

    str += "#\n";
    str += "Gold;Circle;6\n";
    str += "Silver;Rectangle;2\n";
    str += "Silver;Triangle;7\n";
    str += "Iron;Triangle;9\n";
    str += "Titanium;Rectangle;1\n";

    return str;
}

function getExampleOfFourInformation() {

    var str = getExampleOfTwoInformation();

    str += "#\n";
    str += getExampleOfTwoInformation();

    return str;
}

function generate(quadrants) {

    const xAxisPositiveSet = new Set();
    const xAxisNegativeSet = new Set();
    const yAxisPositiveSet = new Set();
    const yAxisNegativeSet = new Set();

    $.each(quadrants, function (quadrantIndex, quadrant) {

        $.each(quadrant, function (dataIndex, data) {

            if (quadrantIndex == 0) {
                xAxisPositiveSet.add(data.x);
                yAxisPositiveSet.add(data.y);
            }

            if (quadrantIndex == 1) {
                xAxisNegativeSet.add(data.x);
                yAxisPositiveSet.add(data.y);
            }

            if (quadrantIndex == 2) {
                xAxisNegativeSet.add(data.x);
                yAxisNegativeSet.add(data.y);
            }

            if (quadrantIndex == 3) {
                xAxisPositiveSet.add(data.x);
                yAxisNegativeSet.add(data.y);
            }
        });
    });

    let xAxisPositive = Array.from(xAxisPositiveSet);
    let xAxisNegative = Array.from(xAxisNegativeSet);
    let yAxisPositive = Array.from(yAxisPositiveSet);
    let yAxisNegative = Array.from(yAxisNegativeSet);

    xAxisPositive = xAxisPositive.sort(sorting[$("#positiveXAxis").val()]);
    xAxisNegative = xAxisNegative.sort(sorting[$("#negativeXAxis").val()]);
    yAxisPositive = yAxisPositive.sort(sorting[$("#positiveYAxis").val()]);
    yAxisNegative = yAxisNegative.sort(sorting[$("#negativeYAxis").val()]);

    const circleSizes = [];
    const circleTexts = [];

    $.each(quadrants, function (quadrantIndex, quadrant) {

        $.each(quadrant, function (dataIndex, data) {

            let x = 0;
            let y = 0;
            const value = data.value;
            const nValue = value * (minValue / maxValue);

            if (quadrantIndex == 0) {
                x = xAxisPositive.indexOf(data.x) + 1;
                y = yAxisPositive.indexOf(data.y) + 1;
            }

            if (quadrantIndex == 1) {
                x = xAxisNegative.indexOf(data.x) + 1;
                y = yAxisPositive.indexOf(data.y) + 1;
                x *= -1;
            }

            if (quadrantIndex == 2) {
                x = xAxisNegative.indexOf(data.x) + 1;
                y = yAxisNegative.indexOf(data.y) + 1;
                x *= -1;
                y *= -1;
            }

            if (quadrantIndex == 3) {
                x = xAxisPositive.indexOf(data.x) + 1;
                y = yAxisNegative.indexOf(data.y) + 1;
                y *= -1;
            }

            circleSizes.push(`${x} ${y} ${nValue}`);
            circleTexts.push(`${x} ${y} ${value}`);
        });
    });

    const circleSize = circleSizes.join("\n");
    const circleText = circleTexts.join("\n");

    const xTics = getAxis(xAxisPositive, xAxisNegative);
    const yTics = getAxis(yAxisPositive, yAxisNegative);

    const rangeX = getRange(xAxisPositive, xAxisNegative);
    const rangeY = getRange(yAxisPositive, yAxisNegative);

    generateModel(quadrants, circleSize, circleText, xTics, yTics, rangeX, rangeY);
}

function generateModel(quadrants, circleSize, circleText, xTics, yTics, rangeX, rangeY){

    var model = $("#model").text();

    model = model.replaceAll("@X_TICS@", xTics);
    model = model.replaceAll("@Y_TICS@", yTics);
    model = model.replaceAll("@X_RANGE@", rangeX);
    model = model.replaceAll("@Y_RANGE@", rangeY);
    model = model.replaceAll("@SCALE@", $("#scale").val());
    model = model.replaceAll("@CIRCLE_COLOR@", $("#circle-color").val());
    model = model.replaceAll("@TEXT_COLOR@", $("#text-color").val());
    model = model.replaceAll("@ROTATE@", "0");
    model = model.replaceAll("@DATA_CIRCLE@", circleSize);
    model = model.replaceAll("@DATA_TEXT@", circleText);
    model = model.replaceAll("@B_MARGIN@", 2);
    model = model.replaceAll("@OUTPUT@", getOutput());

    var isWidescreen = false;

    if ($("#widescreen").val() == 1) {
        isWidescreen = true;
    }

    if (quadrants.length == 1) {
        model = model.replaceAll("@Y_AXIS@", "");
    } else if (quadrants.length >= 2) {
        model = model.replaceAll("@Y_AXIS@", "set yzeroaxis \n set ytics axis \n set ytics center");
    }

    model = model.replaceAll("@SIZE@", getSize(isWidescreen));

    $("#script").val(model);

    $("#modal-result").modal("show");
}

function getAxis(positiveArray, negativeArray) {

    const tics = [];

    $.each(positiveArray, function (i, value) {
        tics.push(`"${value}" ${i + 1}`);
    });

    $.each(negativeArray, function (i, value) {
        tics.push(`"${value}" -${i + 1}`);
    });

    return tics.join(",");
}

function getRange(positiveArray, negativeArray) {

    let min = -negativeArray.length;
    let max = positiveArray.length;

    if (min !== 0) {
        min--;
    }

    max++;

    return `${min}:${max}`;
}

function ascending(a, b) {

    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0;
}

function descending(a, b) {

    if (a < b) {
        return 1;
    }

    if (a > b) {
        return -1;
    }

    return 0;
}

function parse(data) {

    if (!data) {
        throw new Error("Data field cannot be empty")
    }

    var quadrants = data.trim().split(/\#/);

    if (quadrants.length < 1 || quadrants.length > 4) {
        throw Error(`You should to define 1 or 2 quadrants but you defined ${quadrants.length}`);
    }

    const output = [];

    $.each(quadrants, function (i, quadrant) {

        quadrant = quadrant.trim();

        if (!quadrant) {
            throw Error("Quadrant cannot be empty");
        }

        const lines = quadrant.trim().split(/\r*\n/);

        if (lines.length == 0) {
            throw Error("Lines cannot be empty");
        }

        const data = [];

        $.each(lines, function (lineIndex, line) {

            var columns = line.split(";");

            if (columns.length != 3) {
                throw Error("A line should be 3 values separated by ';'. Line " + getLineNumber(data, line));
            }

            const x = columns[0].trim();
            const y = columns[1].trim();
            const value = columns[2].trim();

            if (!x) {
                throw Error(`Column 1 cannot be empty. Line ${lineIndex} `);
            }

            if (!y) {
                throw Error(`Column 2 cannot be empty. Line ${lineIndex} `);
            }

            if (isNaN(value)) {
                throw Error(`Column 3 should be a number.. Line ${lineIndex} `);
            }

            data.push({
                x: x,
                y: y,
                value: parseFloat(value)
            });
        });

        output.push(data);
    });

    return output;
}

$(function () {

    window.onerror = function (msg, url, line) {
        alert(msg);
    }

    new ClipboardJS(".btn");

    $("#form-generate").submit((event) => {

        event.preventDefault();

        var data = $("#data").val().trim();

        generate(parse(data));

        return false;
    });

    $("#btn-example-one-quadrant").click(function (event) {
        $("#data").val(getExampleOfOneInformation());
    });

    $("#btn-example-two-quadrants").click(function (event) {
        $("#data").val(getExampleOfTwoInformation());
    });

    $("#btn-example-four-quadrants").click(function (event) {
        $("#data").val(getExampleOfFourInformation());
    });

    $("#btn-invert").click(function (event) {

        const data = $("#data").val().trim();

        if (!data) {
            return;
        }

        const lines = data.split("\n");

        const output = [];

        lines.forEach(line => {

            line = line.trim();

            if (line !== "#") {

                const columns = line.split(";");

                const aux = columns[0];
                columns[0] = columns[1];
                columns[1] = aux;

                output.push(columns.join(';'));

            } else {
                output.push(line);
            }
        });

        $("#data").val(output.join('\n'));
    });

    $("#export").click(function (event) {
        event.preventDefault();

        var script = $("#script").val();

        var blob = new Blob([script], { type: "text/plain;charset=utf-8" });

        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = window.URL.createObjectURL(blob);
        a.download = "script.gnu";
        a.click();

        return false;
    });
});
