var vertices = [];
var gl;

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
    var a_Position = gl.getAttribLocation(program, var_str);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
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

    var max_verts = 1000;
    var index = 0; var numPoints = 0;
    // var vBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, max_verts*sizeof['vec2'], gl.STATIC_DRAW);

    // gl.bufferSubData(gl.ARRAY_BUFFER, index*sizeof['vec2'], flatten(vertices));
    // numPoints = Math.max(numPoints, ++index); index %= max_verts;

    canvas.addEventListener("click", function (event){
        var bbox = event.target.getBoundingClientRect();
        mousepos = vec2(2*(event.clientX - bbox.left)/canvas.width - 1, 2*(canvas.height - event.clientY + bbox.top - 1)/canvas.height - 1);
        // velocity = vec2((mousepos[0] - offset[0])*speed, (mousepos[1] - offset[1])*speed);
        vertices.push(vec2(event.clientX, event.clientY));

        // Point vertices
        vertices.push(mousepos);

        buffer(vertices);
        attrib("a_Position");
        render2(vertices.length);
    });

    render2(vertices.length);
}

window.onload = function init()
{
    q2();
}