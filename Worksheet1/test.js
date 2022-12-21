var betaLoc;
var a_Position;
var len;
var beta = 0.0;
var upper = 0.5;
var lower = -0.5;
var goUp = true;

function render4(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    tick()
    gl.uniform1f(betaLoc, beta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, len);
    requestAnimationFrame(render4);
}

function tick() {
    if(beta >= upper){
        console.log("change false");
        goUp = false;
    }
    else if(beta <= lower){
        console.log("change true");
        goUp = true;
    }
    if(goUp){
        beta += 0.01;
    }
    else{
        beta -= 0.01;
    }
}    

function q4() {
    var canvas = document.getElementById("gl-canvas5");
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

    var a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    betaLoc = gl.getUniformLocation(program, "beta");
    len = points.length;

    render4();
}

window.onload = function init()
{
    q4();
}