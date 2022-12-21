var betaLoc;
var len;
var beta = 0.0;

function render4(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, len);

    beta += 0.1;
    gl.uniform1f(betaLoc, beta);
    window.requestAnimFrame(render4);
}

function q4() {
    var canvas = document.getElementById("gl-canvas4");
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

    var vertices = [vec2(-0.5, 0.5), vec2(0.5, 0.5), vec2(0.5, -0.5), vec2(-0.5, -0.5),];
    var points = vertices;

    var pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    betaLoc = gl.getUniformLocation(program, "beta");
    len = points.length;

    render4();
}

window.onload = function init()
{
    q4();
}