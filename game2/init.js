var vertices = [];
var colors = [];

var gl;
var canvas;
var bbox;
var ctx;

var score = 0;
var scoreX = 30;
var scoreY = 140;

var near = 10;
var far = 1;
var  fovy = 45.0;
var  aspect;

var mvMatrix, pMatrix;
var modelView, projection;
var modelLocation, loc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

var cubeVertices = [
    vec3( -0.5, -0.5,  0.5 ),
    vec3( -0.5,  0.5,  0.5 ),
    vec3(  0.5,  0.5,  0.5 ),
    vec3(  0.5, -0.5,  0.5 ),
    vec3( -0.5, -0.5, -0.5 ),
    vec3( -0.5,  0.5, -0.5 ),
    vec3(  0.5,  0.5, -0.5 ),
    vec3(  0.5, -0.5, -0.5 )
];

var indices = [
  1,0,1,2,3,0,3,2,  // face 1
  2,6,6,5,5,1,      // face 2
  0,4,4,5,          // face 3
  6,7,7,3,          // face 4
  4,7               // face 5
];
var numVertices = indices.length;

const colorCodes = {
    0: vec3(0.0, 0.0, 0.0), // Black
    1: vec3(1.0, 0.0, 0.0), // Red
    2: vec3(1.0, 1.0, 0.0), // Yellow
    3: vec3(0.0, 1.0, 0.0), // Green
    4: vec3(0.0, 0.0, 1.0), // Blue
    5: vec3(1.0, 0.0, 1.0), // Magenta
    6: vec3(0.0, 1.0, 1.0), // Cyan
    7: vec3(0.3921, 0.5843, 0.9294), // Cornflower
};

function renderCube() {
    eye = vec3(0.0,0.0,-6.0);
    mvMatrix = lookAt(eye, at , up);
    pMatrix = perspective(fovy, aspect, near, far);
    loc = translate(0.0, 0.0, 0.0);

    gl.uniformMatrix4fv(modelLocation, false, flatten(loc));
    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements( gl.LINES, numVertices, gl.UNSIGNED_BYTE, 0 );
}

function render(len) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gl.clear( gl.COLOR_BUFFER_BIT );

    ctx.font = "50px serif";
    ctx.fillText("Score: " + score, scoreX, scoreY);
    gl.drawArrays( gl.POINTS, 0, len);
}

function buffer(value_arr) {
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(value_arr), gl.STATIC_DRAW);
}

function attrib(var_str) {
    var vPos = gl.getAttribLocation(program, var_str);
    gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPos);
}

function randomCoord() {
    let max = 1;
    let min = -1;
    let x = Math.random()* (max - min) + min;
    let y = Math.random()* (max - min) + min;
    return vec2(x,y);
}

function newPoint() {
    vertices.pop();

    // bbox = event.target.getBoundingClientRect();
    coord = randomCoord();
    
    vertices.push(coord);
    console.log("hhhh");
    console.log(coord);

    buffer(vertices);
    attrib("a_Position");
}

function q2() {
    var offset = vec2(0.0, 0.0); // v_t
    var velocity = vec2(0.0, 0.0); // w_t
    var mousepos = vec2(0.0, 0.0);
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var colorMenu = document.getElementById("colorMenu");
    aspect =  canvas.width/canvas.height;

    coord = randomCoord();
    vertices.push(coord);

    // rotating square from worksheet1 main4 TODO

    // buffer(vertices);

    // var iBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // var cBuffer = gl.createBuffer();
    // gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // var vColor = gl.getAttribLocation( program, "a_Color" );
    // gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vColor );

    // buffer(cubeVertices);
    buffer(vertices);
    attrib("a_Position");

    modelView = gl.getUniformLocation( program, "modelView" );
    projection = gl.getUniformLocation( program, "projection" );
    modelLocation = gl.getUniformLocation(program, "modelLocation");

    var textCanvas = document.querySelector("#text");
    ctx = textCanvas.getContext("2d");

    // buffer(colors);
    // attrib("a_Color");

    render(vertices.length);
    // renderCube();
    console.log("aaaa");

    canvas.addEventListener("click", function (event){
        bbox = event.target.getBoundingClientRect();
        var clickX = 2*(event.clientX - bbox.left)/canvas.width - 1;
        var clickY = 2*(canvas.height - event.clientY + bbox.top - 1)/canvas.height - 1;
        // console.log("Coords");
        // console.log(coord[0], coord[1]);
        // console.log("x Y");
        // console.log(clickX, clickY);
        var newClickX = vec2(clickX-0.04, clickX+0.04);
        var newClickY = vec2(clickY-0.04, clickY+0.04);
        // console.log("ggggg");
        // console.log(newClickX, newClickY);
        // console.log(newClickX[0] <= coord[0]);
        // console.log(coord[0] <= newClickX[1]);
        // console.log();
        // console.log();
        if((newClickX[0] <= coord[0] && coord[0] <= newClickX[1]) && (newClickY[0] <= coord[1] && coord[1] <= newClickY[1])){
            console.log("yay");
        
            newPoint();

            score = score + 1;
            console.log(score);

            render(vertices.length);
        }
    });

    // Get HTML elements
    // var clearMenu = document.getElementById("clearMenu");
    // var clearButton = document.getElementById("clearButton");

    // // Clear Canvas
    // clearButton.addEventListener("click", function(event) {
    //     var bgcolor = colorCodes[clearMenu.selectedIndex];
    //     gl.clearColor(bgcolor[0], bgcolor[1], bgcolor[2], 1.0);
    //     vertices = [];
    //     colors = [];
    //     render(vertices.length);
    // });

    // render(vertices.length);
}

window.onload = function init()
{
    q2();
}