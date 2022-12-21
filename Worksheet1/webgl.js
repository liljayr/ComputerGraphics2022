function render()
{
    var numVertices = 3;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.SQUARE, 0, numVertices);
    // gl.drawArrays(gl.TRIANGLE, 0, numVertices);
}

window.onload = function init()
{
    // const numPoints = 5000
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
    alert("WebGL isn’t available");
    }
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [ vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5) ];
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    render();
}