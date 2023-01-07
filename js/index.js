var canvasElement = document.querySelector("#canvas");
var context = canvasElement.getContext("2d");
var originX = 0;
var originY = 0;

function drawTriforce(x, y, context) {
    // ctx.fillRect(0, 0, 100, 100);
    // the fill color
    context.fillStyle = "#FFCC00";
    // the outline
    context.lineWidth = 10;
    context.strokeStyle = '#666666';

    // the top triangle
    context.beginPath();
    context.moveTo(x + 100, y + 65);
    context.lineTo(x + 200, y + 65);
    context.lineTo(x + 150, y + 15);

    context.closePath();
    context.stroke();
    context.fill();

    // the triangle 2
    context.beginPath();
    context.moveTo(x + 155, y + 120);
    context.lineTo(x + 255, y + 120);
    context.lineTo(x + 205, y + 70);

    context.closePath();
    context.stroke();
    context.fill();

    // the triangle 3
    context.beginPath();
    context.moveTo(x + 45, y + 120);
    context.lineTo(x + 145, y + 120);
    context.lineTo(x + 95, y + 70);

    context.closePath();
    context.stroke();
    context.fill();
    // originX += 0.01;
    // originY += 0.01;
    // requestAnimationFrame(drawTriforce(originX, originY, context));
}

// drawTriforce(0, 0, context);
requestAnimationFrame(drawTriforce(originX, originY, context))
