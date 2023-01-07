function initResponsive(canvasId)
{
    canvas = document.getElementById(canvasId);
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
}

var x = 10;
var y = 10;
var shapeWidth = 100;
var shapeHeight = 100;
var xDir = true;
var yDir = true;
var colorIndex = 0;
var moveSpeed = 3;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
initResponsive("canvas");

colors = [
    '#0aa0f6',
    '#ff7272',
    '#04dead'
];

ctx.fillStyle = colors[colorIndex];
colorIndex++;

function draw() {
    if (xDir) {
        if (x < canvas.width - shapeWidth) {
            x += moveSpeed;
        } else {
            xDir = !xDir;
            colorIndex++;
            ctx.fillStyle = colors[colorIndex % 3];
        }
    } else {
        if(x > 0) {
            x -= moveSpeed;
        } else {
            xDir = !xDir;
            colorIndex++;
            ctx.fillStyle = colors[colorIndex % 3];
        }
    }
    if (yDir) {
        if (y < canvas.height - shapeWidth) {
            y += moveSpeed;
        } else {
            yDir = !yDir;
            colorIndex++;
            ctx.fillStyle = colors[colorIndex % 3];
        }
    } else {
        if(y > 0) {
            y -= moveSpeed;
        } else {
            yDir = !yDir;
            colorIndex++;
            ctx.fillStyle = colors[colorIndex % 3];
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, shapeWidth, shapeWidth);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();
