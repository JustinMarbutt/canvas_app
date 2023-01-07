// Author: Justin Marbutt
// This code was adapted from a tutorial by Mt. Ford Studios. I've edited the code but used
// some of the origional source. Espcially the POINT3D and rotation functions.
// Origional Source: https://drive.google.com/file/d/1JYGqFOyOmspxPdsfQe46a5yPqbbPM70z/view
// Origional Author: Mt. Ford Studios (https://twitter.com/MtFordStudios) (youtube.com/MtFordStudios)
// Video Link: https://www.youtube.com/watch?v=gx_Sx5FeTAk

const COLOR_BG = "#343a40";
const COLOR_STROKE = "#0aa0f6";
const ROTATION_SPEED = 0.04;
const POINT3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };

// set up the canvas and context
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// dimensions
var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

// colours and lines
ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = COLOR_STROKE;
ctx.lineWidth = 2;
ctx.lineCap = "round";

// cube parameters
var cx = w / 2;
var cy = h / 2;
var cz = 0;
var size = h / 10;

var cubeVertices = function(cx, cy, cz) {
    return [
        new POINT3D(cx - size, cy - size, cz - size),
        new POINT3D(cx + size, cy - size, cz - size),
        new POINT3D(cx + size, cy + size, cz - size),
        new POINT3D(cx - size, cy + size, cz - size),
        new POINT3D(cx - size, cy - size, cz + size),
        new POINT3D(cx + size, cy - size, cz + size),
        new POINT3D(cx + size, cy + size, cz + size),
        new POINT3D(cx - size, cy + size, cz + size)
    ];
}
var cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
];

// tetrahedron parameters
var tx = w / 5.5;
var ty = h / 2;
var tz = 0;

var tetraVertices = function(tx, ty, tz) {
    return [
        new POINT3D(tx - size, ty + size, tz - size),
        new POINT3D(tx + size, ty + size, tz - size),
        new POINT3D(tx, ty + size, tz + size),
        new POINT3D(tx - size/20, ty - size, tz - size/6)
    ]
};

var tetraEdges = [
    [0, 1], [0, 2], [1, 2], // bottom
    [0, 3], [1, 3], // front
    [1, 3], [2, 3], // back
];

// pyramid parameters
var px = w / 1.17;
var py = h / 2;
var pz = 0;

var pyramidVertices  = function(px, py, pz) {
    return [
        new POINT3D(px - size, py + size, pz - size),
        new POINT3D(px + size, py + size, pz - size),
        new POINT3D(px - size, py + size, pz + size),
        new POINT3D(px, py - size, pz),
        new POINT3D(px + size, py + size, pz + size),
    ]
}

var pyramidEdges = [
    [0, 1], [0, 2], [1, 4], // bottom
    [0, 3], [1, 3], // front
    [2, 3], // back
    [4, 2], [4, 3], //side
];

var shapes = [
    {
        color: COLOR_STROKE,
        v: cubeVertices(cx, cy, cz), 
        e: cubeEdges,
        x: cx,
        y: cy,
        z: cz,
        xSpeed: 0,
        ySpeed: -0.4,
        rotSpeed: 0.045,
        getVerts: cubeVertices,
    },
    {
        color: '#ff7272',
        v: tetraVertices(tx, ty, tz),
        e: tetraEdges,
        x: tx,
        y: ty,
        z: tz,
        xSpeed: .4,
        ySpeed: 0.1,
        rotSpeed: 0.081,
        getVerts: tetraVertices,
    },
    {
        color: '#04dead',
        v: pyramidVertices(px, py, pz),
        e: pyramidEdges,
        x: px,
        y: py,
        z: pz,
        xSpeed: -0.4,
        ySpeed: -0.1,
        rotSpeed: 0.022,
        getVerts: pyramidVertices,
    },
];

// movement vars
var zoomFactor = -0.04;
var movingAway = true;

// set up the animation loop
var timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function draw(edges, verticies, color = COLOR_STROKE) {
    ctx.strokeStyle = color;
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(verticies[edge[0]].x, verticies[edge[0]].y);
        ctx.lineTo(verticies[edge[1]].x, verticies[edge[1]].y);
        ctx.stroke();
    }
}

function rotateZ(v, angle, rx, ry) {
    let dx = v.x - rx;
    let dy = v.y - ry;
    let x = dx * Math.cos(angle) - dy * Math.sin(angle);
    let y = dx * Math.sin(angle) + dy * Math.cos(angle);
    // [x, y]
    return [x + rx, y + ry];
}

function rotateX(v, angle, ry, rz) {
    let dy = v.y - ry;
    let dz = v.z - rz;
    let y = dy * Math.cos(angle) - dz * Math.sin(angle);
    let z = dy * Math.sin(angle) + dz * Math.cos(angle);
    // [y, z]
    return [y + ry, z + rz];
}

function rotateY(v, angle, rx, rz) {
    let dx = v.x - rx;
    let dz = v.z - rz;
    let x = dz * Math.sin(angle) + dx * Math.cos(angle);
    let z = dz * Math.cos(angle) - dx * Math.sin(angle);
    // [x, z]
    return [x + rx, z + rz];
}

function loop(timeNow) {
    // calculate the time difference
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;
    // console.log(timeDelta);

    // background
    ctx.fillRect(0, 0, w, h);

    // control zoom min max effect
    if ((zoomFactor > 0 && size > h / 8) ||
        (zoomFactor < 0 && size < 30)) {
        zoomFactor = zoomFactor * -1;
    }

    // scale tranform
    size += zoomFactor;

    shapes.forEach(function(s) {
        // Bounce effect
        if ((s.x > w - size && s.xSpeed > 0) ||
            (s.x < size && s.xSpeed < 0)) {
            s.xSpeed = s.xSpeed * -1;
        }

        if ((s.y > h - size && s.ySpeed > 0) ||
            (s.y < size && s.ySpeed < 0)) {
            s.ySpeed = s.ySpeed * -1;
        }

        // move transforms
        s.x += s.xSpeed;
        s.y += s.ySpeed;

        // apply move and scale transforms
        s.v = s.getVerts(s.x, s.y, s.z);

        // rotation transform
        var angle = timeNow * 0.001 * s.rotSpeed * Math.PI * 2;
        angle = angle % 3.1415;
        s.v.forEach(function(verticies, i) {
            let result = rotateZ(verticies, angle, s.x, s.y);
            s.v[i].x = result[0];
            s.v[i].y = result[1];
            result = rotateY(verticies, angle, s.x, s.z);
            s.v[i].x = result[0];
            s.v[i].z = result[1];
            result = rotateX(verticies, angle, s.y, s.z);
            s.v[i].y = result[0];
            s.v[i].z = result[1];
        });
        

        // center of shape dot for refrence
        // ctx.fillStyle = s.color;
        // ctx.fillRect(s.x - 2, s.y + 2, 2,2);
        // ctx.fillStyle = COLOR_BG;

        // draw each edge
        draw(s.e, s.v, s.color);
    });

    // call the next frame
    requestAnimationFrame(loop);
}