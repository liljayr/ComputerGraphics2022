var vertices = [];
var colors = [];

var gl;

const colorCodes = {
    0: vec3(0.0, 0.0, 0.0), // Black
    1: vec3(1.0, 0.0, 0.0), // Red
    2: vec3(1.0, 1.0, 0.0), // Yellow
    3: vec3(0.0, 1.0, 0.0), // Green
    4: vec3(0.0, 0.0, 1.0), // Blue
    5: vec3(1.0, 0.0, 1.0), // Magenta
    6: vec3(0.0, 1.0, 1.0), // Cyan
    7: vec3(0.3921, 0.5843, 0.9294), // Cornflower
}

function render2(len) {
    gl.clear( gl.COLOR_BUFFER_BIT );
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

function q2() {
    var offset = vec2(0.0, 0.0); // v_t
    var velocity = vec2(0.0, 0.0); // w_t
    var mousepos = vec2(0.0, 0.0);
    var canvas = document.getElementById("gl-canvas2");
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

    // var max_verts = 1000;
    // var index = 0; var numPoints = 0;
    // var vBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, max_verts*sizeof['vec2'], gl.STATIC_DRAW);

    // gl.bufferSubData(gl.ARRAY_BUFFER, index*sizeof['vec2'], flatten(vertices));
    // numPoints = Math.max(numPoints, ++index); index %= max_verts;

    canvas.addEventListener("click", function (event){
        var bbox = event.target.getBoundingClientRect();
        mousepos = vec2(2*(event.clientX - bbox.left)/canvas.width - 1, 2*(canvas.height - event.clientY + bbox.top - 1)/canvas.height - 1);
        // velocity = vec2((mousepos[0] - offset[0])*speed, (mousepos[1] - offset[1])*speed);
        // vertices.push(vec2(event.clientX, event.clientY));

        // Point Vertices
        vertices.push(mousepos);

        // var vBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
        buffer(vertices);

        // var vPos = gl.getAttribLocation(program, "a_Position");
        // gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
        // gl.enableVertexAttribArray(vPos);
        attrib("a_Position");

        // Point Color
        console.log(colorCodes[colorMenu.selectedIndex]);
        colors.push(colorCodes[colorMenu.selectedIndex]);

        // var colorBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
        buffer(colors);

        // var vColor = gl.getAttribLocation(program, "a_Color");
        // gl.vertexAttribPointer(vColor, 2, gl.FLOAT, false, 0, 0);
        // gl.enableVertexAttribArray(vColor);
        attrib("a_Color");

        render2(vertices.length);
    });

    // Get HTML elements
    var clearMenu = document.getElementById("clearMenu");
    var clearButton = document.getElementById("clearButton");

    // Clear Canvas
    clearButton.addEventListener("click", function(event) {
        var bgcolor = colorCodes[clearMenu.selectedIndex];
        gl.clearColor(bgcolor[0], bgcolor[1], bgcolor[2], 1.0);
        vertices = [];
        colors = [];
        render2(vertices.length);
    });

    // var vertices = [ vec2(0.0, 0.0), vec2(1.0, 1.0), vec2(1.0, 0.0) ];

    // var vBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // var vPosition = gl.getAttribLocation(program, "a_Position");
    // gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vPosition);

    render2(vertices.length);
}

window.onload = function init()
{
    q2();
}