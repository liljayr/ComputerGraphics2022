var obj_filename = "./JuniperTheCatBat.obj";
var a_Position;
var a_Normal;
var a_Color;
var g_objDoc = null; // Info parsed from OBJ file
var g_drawingInfo = null; // Info for drawing the 3D model with WebGL
var model;
var pMat;
var vMat;
var eye;
const at = vec3(1.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 5.0);
var  fovy = 45.0;
var  aspect;

var near = 10;
var far = 1;
var scale = 0.6;

var modelLocation, loc;
var mvMatrix, pMatrix;
var modelView, projection;

// Create a buffer object and perform the initial configuration
function initVertexBuffers(gl) {
    var o = new Object();
    o.vertexBuffer = createEmptyArrayBuffer(gl, a_Position, 3, gl.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer(gl, a_Normal, 3, gl.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl, a_Color, 4, gl.FLOAT);
    o.indexBuffer = gl.createBuffer();
    return o;
}

function createEmptyArrayBuffer(gl, vAttribute, num, type) {
    var buffer = gl.createBuffer(); // Create a buffer object

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(vAttribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(vAttribute); // Enable the assignment

    return buffer;
}

// Asynchronous file loading (request, parse, send to GPU buffers)
function readOBJFile(fileName, gl, model, scale, reverse) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile(request.responseText, fileName, gl, model, scale, reverse);
        }
    }
    request.open('GET', fileName, true); // Create a request to get file
    request.send(); // Send the request
}

function onReadOBJFile(fileString, fileName, gl, o, scale, reverse) {
    console.log("getting obj");
    console.log(fileName);
    var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
    console.log(objDoc);
    var result = objDoc.parse(fileString, scale, reverse);
    console.log(result);
    if (!result) {
        g_objDoc = null; g_drawingInfo = null;
        console.log("OBJ file parsing error.");
        return;
    }
    g_objDoc = objDoc;
    console.log("adding value");
    console.log(g_objDoc);
}

function onReadComplete(gl, model, objDoc) {
    // Acquire the vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);

    // Write the indices to the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

    return drawingInfo;
}

function render() {//(gl, view, model)
    console.log(g_drawingInfo);
    console.log(g_objDoc);
    // console.log(g_objDoc.isMTLComplete());
    if (!g_drawingInfo && g_objDoc && g_objDoc.isMTLComplete()) {
        // OBJ and all MTLs are available
        console.log("What is up");
        g_drawingInfo = onReadComplete(gl, model, g_objDoc);
    }
    if (!g_drawingInfo) {
        console.log("wrong");
        return;
    }

    // ...
    eye = vec3(6.0,0.0,6.0);
    mvMatrix = lookAt(eye, at , up);
    pMatrix = perspective(fovy, aspect, near, far);
    loc = translate(0.0, 0.0, 0.0);

    gl.uniformMatrix4fv(modelLocation, false, flatten(loc));
    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    console.log(g_drawingInfo.indices.length);
    gl.drawElements(gl.TRIANGLES, g_drawingInfo.indices.length, gl.UNSIGNED_BYTE, 0);
}

function funcInit() {
    canvas = document.getElementById("gl-canvas2");
    gl = WebGLUtils.setupWebGL(canvas);

    if(gl === null){
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect =  canvas.width/canvas.height;

    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

    gl.program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(gl.program);

    modelView = gl.getUniformLocation( gl.program, "modelView" );
    projection = gl.getUniformLocation( gl.program, "projection" );
    modelLocation = gl.getUniformLocation(gl.program, "modelLocation");

    // Prepare empty buffer objects for vertex coordinates, colors, and normals
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
	a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    model = initVertexBuffers(gl);

    // Start reading the OBJ file
    readOBJFile(obj_filename, gl, model, scale, true);

    var eye = vec3(0, 0, 6);
	var at = vec3(0, 0, 0);
	var up = vec3(0, 1, 0);

    pMat = perspective(9, 1, 0.5, 10);
	vMat = lookAt(eye, at, up);
    console.log("RENDER");
    // render();
	setInterval(render, 1000);
}

window.onload = function init() {
    funcInit();
}