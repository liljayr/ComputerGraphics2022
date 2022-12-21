// var vertices = [];
// var colors = [];
// var triangleVertices = [];
// var point_index = 1;

// // Bool values
// var points = true;
// var triangles = false;

// const colorCodes = {
//     0: vec3(0.0, 0.0, 0.0), // Black
//     1: vec3(1.0, 0.0, 0.0), // Red
//     2: vec3(1.0, 1.0, 0.0), // Yellow
//     3: vec3(0.0, 1.0, 0.0), // Green
//     4: vec3(0.0, 0.0, 1.0), // Blue
//     5: vec3(1.0, 0.0, 1.0), // Magenta
//     6: vec3(0.0, 1.0, 1.0), // Cyan
//     7: vec3(0.3921, 0.5843, 0.9294), // Cornflower
// }

// function render2() {
//     gl.clear( gl.COLOR_BUFFER_BIT );
//     // gl.drawArrays( gl.POINTS, 0, len);
//     for(var i = 0; i < points.length; i++){
//         gl.drawArrays(gl.POINTS, vertices[i],  1);
//     }

//     for (var i = 0; i < triangles.length; i++){
//         gl.drawArrays(gl.TRIANGLE_FAN, triangles[i], 3);
//     }

//     window.requestAnimFrame(render2);
// }

// function buffer(value_arr) {
//     var vBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, flatten(value_arr), gl.STATIC_DRAW);
//     return vBuffer;
// }

// function attrib(var_str) {
//     var vPos = gl.getAttribLocation(program, var_str);
//     gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(vPos);
// }

// function q2() {
//     var mousepos = vec2(0.0, 0.0);

//     // Get HTML elements
//     var clearMenu = document.getElementById("clearMenu");
//     var clearButton = document.getElementById("clearButton");
//     var canvas = document.getElementById("gl-canvas3");
//     var colorMenu = document.getElementById("colorMenu");
//     var drawPoints = document.getElementById("drawPoints");
//     var drawTriangles = document.getElementById("drawTriangles");

//     gl = WebGLUtils.setupWebGL(canvas);
//     // Only continue if WebGL is available and working
//     if (gl === null) {
//         alert("Unable to initialize WebGL. Your browser or machine may not support it.");
//         return;
//     }

//     gl.viewport(0, 0, canvas.width, canvas.height);
//     gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

//     program = initShaders(gl, "vertex-shader", "fragment-shader");
//     gl.useProgram(program);

//     // On click of draw points or triangles set the bool values
//     drawPoints.addEventListener("click", function(event) {
//         points = true;
//         triangles = false;
//     });

//     drawTriangles.addEventListener("click", function(event) {
//         points = false;
//         triangles = true;
//     });
    
//     // Draw Points
//     canvas.addEventListener("click", function (event){
//         console.log("Click!");
//         var bbox = event.target.getBoundingClientRect();
//         mousepos = vec2(2*(event.clientX - bbox.left)/canvas.width - 1, 2*(canvas.height - event.clientY + bbox.top - 1)/canvas.height - 1);

//         if(points) {
//             console.log("adding a point");
//             vertices.push(mousepos);
        
//             buffer(vertices);
//             attrib("a_Position");

//             colors.push(colorCodes[colorMenu.selectedIndex]);

//             buffer(colors);
//             attrib("a_Color");
    
//             // render2(vertices.length);
//         }
//         else if(triangles) {
//             console.log("adding a triangle");
//             //adding first two points of triangle to vertices array
//             if(point_index%3 != 0) {
//                 vertices.push(vec2(mousepos));
//                 buffer(vertices);
//                 attrib("a_Position");

//                 colors.push(colorCodes[colorMenu.selectedIndex]);

//                 buffer(colors);
//                 attrib("a_Color");

//                 point_index = point_index + 1;

//                 // render2(vertices.length);
//             }
//             else {
//                 var a = vertices.pop();
//                 var b = vertices.pop();
//                 var c = vec2(mousepos);

//                 triangles.push(b);

//                 point_index = point_index + 1;
//                 buffer(triangles);
//                 attrib("a_Position");

//                 colors.push(colorCodes[colorMenu.selectedIndex]);

//                 buffer(colors);
//                 attrib("a_Color");

//                 // render2(triangles.length);
//             }
//         }

//         // // Point Vertices
//         // vertices.push(mousepos);
        
//         // buffer(vertices);
//         // attrib("a_Position");

//         // // Point Color
//         // console.log(colorCodes[colorMenu.selectedIndex]);
//         // colors.push(colorCodes[colorMenu.selectedIndex]);

//         // buffer(colors);
//         // attrib("a_Color");

//         render2();
//         // render2();
//     });

//     // Clear Canvas
//     clearButton.addEventListener("click", function(event) {
//         var bgcolor = colorCodes[clearMenu.selectedIndex];
//         gl.clearColor(bgcolor[0], bgcolor[1], bgcolor[2], 1.0);
//         vertices = [];
//         colors = [];
//         points = true;
//         triangles = false;
//         render2(vertices.length);
//     });

//     // var vertices = [ vec2(0.0, 0.0), vec2(1.0, 1.0), vec2(1.0, 0.0) ];

//     // var vBuffer = gl.createBuffer();
//     // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
//     // gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

//     // var vPosition = gl.getAttribLocation(program, "a_Position");
//     // gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//     // gl.enableVertexAttribArray(vPosition);

//     render2(vertices.length);
// }

// window.onload = function init()
// {
//     q2();
// }

var gl;

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
  var cBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, sizeof['vec3']*max_verts, gl.STATIC_DRAW );

  // vertex color setup
  var vColor = gl.getAttribLocation( program, "vColor" );
  gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vColor );

  // vertex buffer setup
  var vBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, max_verts, gl.STATIC_DRAW );

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
  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

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

    // mode: true = points, false = triangles
    if(mode){
      console.log("[point mode] point added at mousepos: " + mousepos + ", at vBuffer-index: " + index);

    //  colors.push(index);
      t = vec3(baseColors[colorMenu.selectedIndex]);
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec3']*index, flatten(t));
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

      points.push(index);
      t1 = mousepos;
      gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t1));
      index++;

    } else {
      console.log(mousepos);

      if(first){
        console.log("[triangle mode] first point added at mousepos: " + mousepos + ", at vBuffer-index: " + index);

      //  colors.push(index);
        t = vec3(baseColors[colorMenu.selectedIndex]);
        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec3']*index, flatten(t));
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );


        points.push(index);
        t1 = vec2(mousepos);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t1));
        index++;

        first = false;
        second = true;

      } else if (second){
        console.log("[triangle mode] second point added at mousepos: " + mousepos + ", at vBuffer-index: " + index);


        colors.push(index);
        t = vec3(baseColors[colorMenu.selectedIndex]);
        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec3']*index, flatten(t));
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

        points.push(index);
        t2 = vec2(mousepos);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t2));
        index++;

        second = false;
        third = true;

      } else{
        // removes latest two points from point-array
        //  console.log("points size before pop: " + points.length);


        t = vec3(baseColors[colorMenu.selectedIndex]);
        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec3']*index, flatten(t));

        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

        points.pop();
        triangles.push(points.pop());
        //  console.log("points size after pop: " + points.length);
        //  console.log("[triangle mode] popped last two points in point-array");
        //  console.log("[triangle mode] triangle added at vertex index: " + index);


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

  // iterate thru all indexes of points-array and draw each point
    for(var i = 0; i < points.length; i++){
      gl.drawArrays(gl.POINTS, points[i],  1);
    }

  // iterate thru all indexes of triangle-array and draw each triangle
  for (var i = 0; i < triangles.length; i++){
    gl.drawArrays(gl.TRIANGLE_FAN, triangles[i], 3);
  }

  window.requestAnimFrame(render);
}
// ELEPHANT CHANGE THIS