var gl;
var vBuffer;
var cBuffer;

var mode = true;
var first = true;
var second = false;
var third = false;

var max_triangles = 100000;
var max_verts = 3 * max_triangles;
var index = 0;

var t1 = [];
var t2 = [];
var t3 = [];
var t = [];

var points = [];
var triangles = [];
var colors = [];

var baseColors = [
    vec3(0.0, 0.0, 0.0),  // black
    vec3(1.0, 0.0, 0.0),  // red
    vec3(0.0, 1.0, 0.0),  // green
    vec3(0.0, 0.0, 1.0),  // blue
];


function buffer(length) {
    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, length, gl.STATIC_DRAW);
    return tBuffer;
}

function attrib(var_str, size, program) {
    var vPos = gl.getAttribLocation(program, var_str);
    gl.vertexAttribPointer(vPos, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPos);
}

function bind(){
    t = vec3(baseColors[colorMenu.selectedIndex]);
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec3']*index, flatten(t));
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
}

window.onload = function init(){
    canvas = document.getElementById("gl-canvas3");
    gl = WebGLUtils.setupWebGL(canvas);

    if(!gl){
        alert("WebGL not available");
    }

    gl.viewport(0,0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT );

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get HTML elements
    var clearMenu = document.getElementById("clearMenu");
    var clearButton = document.getElementById("clearButton");
    var addPoints = document.getElementById("drawPoints");
    var addTriangles = document.getElementById("drawTriangles");

    // color buffer setup
    cBuffer = buffer(sizeof['vec3']*max_verts);

    // vertex color setup
    attrib("a_Color", 3, program);

    // vertex buffer setup
    vBuffer = buffer(max_verts);

    // triangle-button clicked
    addTriangles.addEventListener("click", function(event){
        console.log("Triangle button clicked");
        mode = false;
    });

    // points-button clicked
    addPoints.addEventListener("click", function(event){
        console.log("Points button clicked");
        mode = true;
    });

    // vertex position setup
    attrib("a_Position", 2, program)

    // clear the canvas
    clearButton.addEventListener("click", function(event) {
        var bgcolor = baseColors[clearMenu.selectedIndex];
        gl.clearColor(bgcolor[0], bgcolor[1], bgcolor[2], bgcolor[3],bgcolor[4],bgcolor[5]);

        // reset everything
        triangles = [];
        points = [];
        colors = [];
        mode = true;
        first = true;
        second = false;
        third = false;
        index = 0;
        render();
    });

    // get mouseclick and draw points/triangles
    canvas.addEventListener("click", function (ev) {
    // set boundaries
    var bbox = ev.target.getBoundingClientRect();
    mousepos = vec2(2*(ev.clientX - bbox.left)/canvas.width - 1, 2*(canvas.height - ev.clientY + bbox.top - 1)/canvas.height - 1);

    if(mode){
        bind();

        points.push(index);
        t1 = mousepos;
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t1));
        index++;

    } else {
        console.log(mousepos);

        if(first){
            bind();

            points.push(index);
            t1 = vec2(mousepos);
            gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t1));
            index++;

            first = false;
            second = true;

        } else if (second) {
            colors.push(index);
            bind();

            points.push(index);
            t2 = vec2(mousepos);
            gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t2));
            index++;

            second = false;
            third = true;

        } else{
            bind();

            points.pop();
            triangles.push(points.pop());

            t3 = vec2(mousepos);

            gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t3));
            index++;

            first = true;
            third = false;
        }
    }
    });
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT);

    for(var i = 0; i < points.length; i++){
        gl.drawArrays(gl.POINTS, points[i],  1);
    }

    for (var i = 0; i < triangles.length; i++){
        gl.drawArrays(gl.TRIANGLE_FAN, triangles[i], 3);
    }

    window.requestAnimFrame(render);
}