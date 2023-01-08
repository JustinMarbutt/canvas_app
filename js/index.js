var canvasElement = document.querySelector("#canvas");
var context = canvasElement.getContext("2d");
var originX = 0;
var originY = 0;
var POINT2D = function(x, y) {this.x = x; this.y = y;};

function drawTriangle(triangleVerts, context) {
    var fistVert = triangleVerts.pop();

    context.beginPath();
    context.moveTo(fistVert.x, fistVert.y);

    triangleVerts.forEach(function(v) {
        context.lineTo(v.x, v.y);
    });

    context.closePath();
    context.stroke();
    context.fill();
    return true;
}

function drawTriforce(x, y, scale, context) {
    // the fill color
    context.fillStyle = "#FFCC00";
    // the outline
    context.lineWidth = 10;
    context.strokeStyle = '#666666';

    // the top triangle
    drawTriangle([
        new POINT2D(x + 100 * scale, y + 65 * scale),
        new POINT2D(x + 200 * scale, y + 65 * scale),
        new POINT2D(x + 150 * scale, y + 15 * scale)
    ], context);

    // the right bottom triangle
    drawTriangle([
        new POINT2D(x + 155 * scale, y + 120 * scale),
        new POINT2D(x + 255 * scale, y + 120 * scale),
        new POINT2D(x + 205 * scale, y + 70 * scale)
    ], context);

    // the left bottom triangle
    drawTriangle([
        new POINT2D(x + 45 * scale, y + 120 * scale),
        new POINT2D(x + 145 * scale, y + 120 * scale),
        new POINT2D(x + 95 * scale, y + 70 * scale)
    ], context);
}

drawTriforce(0, 0, 1, context);
