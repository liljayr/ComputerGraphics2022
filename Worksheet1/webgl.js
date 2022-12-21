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

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    render();


    // var vertices = [
    // vec2(-1, -1),
    // vec2(0, 1),
    // vec2(1, -1)
    // ];
    // var u = add(vertices[0], vertices[1]);
    // var v = add(vertices[0], vertices[2]);
    // var p = scale(0.5, add(u, v));
    // points = [ p ];
    // for (var i = 0; points.length < numPoints; ++i) {
    // var j = Math.floor(Math.random() * 3);
    // p = add(points[i], vertices[j]);
    // p = scale(0.5, p);
    // points.push(p);
    // }
    // var vBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    // render();

// var canvas = document.getElementById("gl-canvas");
// var gl = canvas.getContext("gl-canvas");
// gl.clearColor(1.0, 0.0, 0.0, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT);
}