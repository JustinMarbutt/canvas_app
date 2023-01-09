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
var colorIndex = 0;
var moveSpeedX = 3;
var moveSpeedY = 3;

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
    // boundry check x direction or width
    if ((moveSpeedX > 0 && x > canvas.width - shapeWidth) ||
        (moveSpeedX < 0 && x < 0)) {
        moveSpeedX = moveSpeedX * -1;
        colorIndex++;
        ctx.fillStyle = colors[colorIndex % 3];
    }
    // boundry check y direction or height
    if ((moveSpeedY > 0 && y > canvas.height - shapeHeight) ||
        (moveSpeedY < 0 && y < 0)) {
        moveSpeedY = moveSpeedY * -1;
        colorIndex++;
        ctx.fillStyle = colors[colorIndex % 3];
    }

    // move object
    y += moveSpeedY;
    x += moveSpeedX;

    // clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, shapeWidth, shapeWidth);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();
