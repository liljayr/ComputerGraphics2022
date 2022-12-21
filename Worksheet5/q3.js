// (function(root, factory) {  // eslint-disable-line
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return factory.call(root);
//     });
//   } else {
//     // Browser globals
//     root.webglLessonsUI = factory.call(root);
//   }
// }(this, function() {

//   const gopt = getQueryParams();

//   function setupSlider(selector, options) {
//     var parent = document.querySelector(selector);
//     if (!parent) {
//       return; // like jquery don't fail on a bad selector
//     }
//     if (!options.name) {
//       options.name = selector.substring(1);
//     }
//     return createSlider(parent, options);
//   }

//   function createSlider(parent, options) {
//     var precision = options.precision || 0;
//     var min = options.min || 0;
//     var step = options.step || 1;
//     var value = options.value || 0;
//     var max = options.max || 1;
//     var fn = options.slide;
//     var name = gopt["ui-" + options.name] || options.name;
//     var uiPrecision = options.uiPrecision === undefined ? precision : options.uiPrecision;
//     var uiMult = options.uiMult || 1;

//     min /= step;
//     max /= step;
//     value /= step;

//     parent.innerHTML = `
//       <div class="gman-widget-outer">
//         <div class="gman-widget-label">${name}</div>
//         <div class="gman-widget-value"></div>
//         <input class="gman-widget-slider" type="range" min="${min}" max="${max}" value="${value}" />
//       </div>
//     `;
//     var valueElem = parent.querySelector(".gman-widget-value");
//     var sliderElem = parent.querySelector(".gman-widget-slider");

//     function updateValue(value) {
//       valueElem.textContent = (value * step * uiMult).toFixed(uiPrecision);
//     }

//     updateValue(value);

//     function handleChange(event) {
//       var value = parseInt(event.target.value);
//       updateValue(value);
//       fn(event, { value: value * step });
//     }

//     sliderElem.addEventListener('input', handleChange);
//     sliderElem.addEventListener('change', handleChange);

//     return {
//       elem: parent,
//       updateValue: (v) => {
//         v /= step;
//         sliderElem.value = v;
//         updateValue(v);
//       },
//     };
//   }

//   function makeSlider(options) {
//     const div = document.createElement("div");
//     return createSlider(div, options);
//   }

//   var widgetId = 0;
//   function getWidgetId() {
//     return "__widget_" + widgetId++;
//   }

//   function makeCheckbox(options) {
//     const div = document.createElement("div");
//     div.className = "gman-widget-outer";
//     const label = document.createElement("label");
//     const id = getWidgetId();
//     label.setAttribute('for', id);
//     label.textContent = gopt["ui-" + options.name] || options.name;
//     label.className = "gman-checkbox-label";
//     const input = document.createElement("input");
//     input.type = "checkbox";
//     input.checked = options.value;
//     input.id = id;
//     input.className = "gman-widget-checkbox";
//     div.appendChild(label);
//     div.appendChild(input);
//     input.addEventListener('change', function(e) {
//        options.change(e, {
//          value: e.target.checked,
//        });
//     });

//     return {
//       elem: div,
//       updateValue: function(v) {
//         input.checked = !!v;
//       },
//     };
//   }

//   function makeOption(options) {
//     const div = document.createElement("div");
//     div.className = "gman-widget-outer";
//     const label = document.createElement("label");
//     const id = getWidgetId();
//     label.setAttribute('for', id);
//     label.textContent = gopt["ui-" + options.name] || options.name;
//     label.className = "gman-widget-label";
//     const selectElem = document.createElement("select");
//     options.options.forEach((name, ndx) => {
//       const opt = document.createElement("option");
//       opt.textContent = gopt["ui-" + name] || name;
//       opt.value = ndx;
//       opt.selected = ndx === options.value
//       selectElem.appendChild(opt);
//     });
//     selectElem.className = "gman-widget-select";
//     div.appendChild(label);
//     div.appendChild(selectElem);
//     selectElem.addEventListener('change', function(e) {
//        options.change(e, {
//          value: selectElem.selectedIndex,
//        });
//     });

//     return {
//       elem: div,
//       updateValue: function(v) {
//         selectedElem.selectedIndex = v;
//       },
//     };
//   }

//   function noop() {
//   }

//   function genSlider(object, ui) {
//     const changeFn = ui.change || noop;
//     ui.name = ui.name || ui.key;
//     ui.value = object[ui.key];
//     ui.slide = ui.slide || function(event, uiInfo) {
//       object[ui.key] = uiInfo.value;
//       changeFn();
//     };
//     return makeSlider(ui);
//   }

//   function genCheckbox(object, ui) {
//     const changeFn = ui.change || noop;
//     ui.value = object[ui.key];
//     ui.name = ui.name || ui.key;
//     ui.change = function(event, uiInfo) {
//       object[ui.key] = uiInfo.value;
//       changeFn();
//     };
//     return makeCheckbox(ui);
//   }

//   function genOption(object, ui) {
//     const changeFn = ui.change || noop;
//     ui.value = object[ui.key];
//     ui.name = ui.name || ui.key;
//     ui.change = function(event, uiInfo) {
//       object[ui.key] = uiInfo.value;
//       changeFn();
//     };
//     return makeOption(ui);
//   }

//   const uiFuncs = {
//     slider: genSlider,
//     checkbox: genCheckbox,
//     option: genOption,
//   };

//   function setupUI(parent, object, uiInfos) {
//     const widgets = {};
//     uiInfos.forEach(function(ui) {
//       const widget = uiFuncs[ui.type](object, ui);
//       parent.appendChild(widget.elem);
//       widgets[ui.key] = widget;
//     });
//     return widgets;
//   }

//   function updateUI(widgets, data) {
//     Object.keys(widgets).forEach(key => {
//       const widget = widgets[key];
//       widget.updateValue(data[key]);
//     });
//   }

//   function getQueryParams() {
//     var params = {};
//     if (window.hackedParams) {
//       Object.keys(window.hackedParams).forEach(function(key) {
//         params[key] = window.hackedParams[key];
//       });
//     }
//     if (window.location.search) {
//       window.location.search.substring(1).split("&").forEach(function(pair) {
//         var keyValue = pair.split("=").map(function (kv) {
//           return decodeURIComponent(kv);
//         });
//         params[keyValue[0]] = keyValue[1];
//       });
//     }
//     return params;
//   }

//   return {
//     setupUI: setupUI,
//     updateUI: updateUI,
//     setupSlider: setupSlider,
//     makeSlider: makeSlider,
//     makeCheckbox: makeCheckbox,
//   };

// }));

var toggleTeapotButton = document.getElementById('toggle-teapot');
var toggleQuadsButton = document.getElementById('toggle-light');
var canvas = document.getElementById("gl-canvas", { alpha: false });
var gl = WebGLUtils.setupWebGL( canvas );
var groundImage = document.createElement('img');
groundImage.onload = init;
groundImage.src = 'nebula.png';

function initVertexBuffers(gl) {
        var o = new Object();
        o.vertexBuffer = createEmptyArrayBuffer(gl, gl.program.a_Position, 3, gl.FLOAT);
        o.normalBuffer = createEmptyArrayBuffer(gl, gl.program.a_Normal, 3, gl.FLOAT);
        o.colorBuffer = createEmptyArrayBuffer(gl, gl.program.a_Color, 4, gl.FLOAT);
        o.indexBuffer = gl.createBuffer();
  
        return o;
      }

      function createEmptyArrayBuffer(gl, a_attribute, num, type) {
               var buffer =  gl.createBuffer();  // Create a buffer object
        
               gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
               gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
               gl.enableVertexAttribArray(a_attribute);  // Enable the assignment
        
               return buffer;
             }

function init() {
  gl = WebGLUtils.setupWebGL(canvas);
  gl.program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( gl.program );
  gl.program.a_Position = gl.getAttribLocation(gl.program, 'vPosition');
    gl.program.a_Normal = gl.getAttribLocation(gl.program, 'vNormal');
    gl.program.a_Color = gl.getAttribLocation(gl.program, 'fColor');
    var at = vec3(0, 0.5, 0);
    var eye = vec3(0, 2, 2);
    var up = vec3(0, 1, 0);
    var fovy = 45;
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 30;
    var light = vec3(0.0, 2.0, 2.0);
    
    var viewMatrix = lookAt(eye, at, up);
    var projectionMatrix = perspective(fovy, aspect, near, far);
    var a = FontFaceSetLoadEvent

    var model = initVertexBuffers(canvas);
    
    var teapotFile = readOBJFile(obj_filename, canvas, model, 0.2, true);//readOBJFile('./JuniperTheCatBat.obj');
    var teapot = new OBJDoc('JuniperTheCatBat.obj');
    teapot.parse(teapotFile, 0.25, false);

    var positions = [];
    var normals = [];
    
    for (var i = 0; i < teapot.objects[0].faces.length; i++) {
        var face = teapot.objects[0].faces[i];
        for (var j = 0; j < 3; j++) {
            var vertex = teapot.vertices[face.vIndices[j]];
            var normal = teapot.normals[face.nIndices[j]];
            positions.push(vec3(vertex.x, vertex.y, vertex.z));
            normals.push(vec3(normal.x, normal.y, normal.z));
        }
    }

    // gl = WebGLUtils.setupWebGL(canvas);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    // gl.enable(gl.CULL_FACE);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    var phongProgram = initShaders(gl, '/week5/phong1.vert', '/week5/phong1.frag');
    var program = initShaders(gl, '/week5/part1.vert', '/week5/part1.frag');
    
    // SETUP AND BUFFER PHONG SHADER    
    gl.useProgram(phongProgram);
    
    var phongInfo = {
        a_position_model: {
            location: gl.getAttribLocation(phongProgram, 'a_position_model'),
            buffer: gl.createBuffer()
        },
        a_normal_model: {
            location: gl.getAttribLocation(phongProgram, 'a_normal_model'),
            buffer: gl.createBuffer()
        },
        u_modelView: gl.getUniformLocation(phongProgram, 'u_modelView'),
        u_projection: gl.getUniformLocation(phongProgram, 'u_projection'),
        u_normal: gl.getUniformLocation(phongProgram, 'u_normal'),
        u_light_world: gl.getUniformLocation(phongProgram, 'u_light_world'),
        u_light_camera: gl.getUniformLocation(phongProgram, 'u_light_camera')
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, phongInfo.a_position_model.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, phongInfo.a_normal_model.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
    
    gl.uniformMatrix4fv(phongInfo.u_projection, false, flatten(projectionMatrix));
    
    var moveTeapot = true;
    var moveLight = true;
    var phi = 0;
    var theta = 0;
    
    toggleTeapotButton.addEventListener('click', function() {
        moveTeapot = !moveTeapot;
    });
    
    toggleQuadsButton.addEventListener('click', function() {
        moveLight = !moveLight;
    });
    
    requestAnimationFrame(function render() {
        phi += moveTeapot ? 0.02 : 0;
        theta += moveLight ? 0.02 : 0;
        
        light[0] = Math.sin(theta)*2;
        light[2] = Math.cos(theta)*2;
        
        var teapotModelMatrix = translate(0, 0.25 + 0.25 * Math.sin(phi), 0);
        var teapotModelViewMatrix = mult(viewMatrix, teapotModelMatrix);
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        gl.useProgram(phongProgram);
        enablePhongProgram(gl, phongInfo);
        gl.uniformMatrix4fv(phongInfo.u_modelView, false, flatten(teapotModelViewMatrix));
        gl.uniformMatrix4fv(phongInfo.u_normal, false, flatten(transpose(inverse4(teapotModelViewMatrix))));
        gl.uniform3fv(phongInfo.u_light_world, flatten(light));
        gl.uniform3fv(phongInfo.u_light_camera, flatten(matrixVectorMult(mult(projectionMatrix, viewMatrix), light)));
        
        gl.drawArrays(gl.TRIANGLES, 6, positions.length - 6);
        
        requestAnimationFrame(render);
    });
}

function matrixVectorMult(A, x) {
    var Ax = [];
    for (var i = 0; i < x.length; i++) {
        var sum = 0;
        for (var j = 0; j < x.length; j++) {
            sum += A[j][i] * x[i];
        }
        Ax.push(sum);
    }
    // AND MY
    return Ax;
}

function enablePhongProgram(gl, phongInfo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, phongInfo.a_position_model.buffer);
    gl.enableVertexAttribArray(phongInfo.a_position_model.location);
    gl.vertexAttribPointer(phongInfo.a_position_model.location, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, phongInfo.a_normal_model.buffer);
    gl.enableVertexAttribArray(phongInfo.a_normal_model.location);
    gl.vertexAttribPointer(phongInfo.a_normal_model.location, 3, gl.FLOAT, false, 0, 0);
}

// var canvas;
// var gl;

// var near = 0.1;
// var far = 5;
// var fovy = 45.0;

// var radius = 2;
// var theta  = 0.0;
// var scale = 0.2;

// var mvMatrix, pMatrix;
// var modelViewMatrixLoc, projection, normalMatrixLoc;


// // var orbit = true;

// var g_objDoc = null;      // The information of OBJ file
// var g_drawingInfo = null; // The information for drawing 3D model
// var model;

// function initObject(gl, obj_filename, scale){
//     console.log("IN THIS");
//     gl.program.a_Position = gl.getAttribLocation(gl.program, 'vPosition');
//     gl.program.a_Normal = gl.getAttribLocation(gl.program, 'vNormal');
//     gl.program.a_Color = gl.getAttribLocation(gl.program, 'fColor');
//     console.log("AAAAWHYYYYYY");

//     // Prepare empty buffer objects for vertex coordinates, colors, and normals
//     var model = initVertexBuffers(gl);

//     // Start reading the OBJ file
//     readOBJFile(obj_filename, gl, model, scale, true);

//     // return model;
// }

// // Create a buffer object and perform the initial configuration
//     function initVertexBuffers(gl) {
//       var o = new Object();
//       o.vertexBuffer = createEmptyArrayBuffer(gl, gl.program.a_Position, 3, gl.FLOAT);
//       o.normalBuffer = createEmptyArrayBuffer(gl, gl.program.a_Normal, 3, gl.FLOAT);
//       o.colorBuffer = createEmptyArrayBuffer(gl, gl.program.a_Color, 4, gl.FLOAT);
//       o.indexBuffer = gl.createBuffer();

//       return o;
//     }

//   // Create a buffer object, assign it to attribute variables, and enable the assignment
//    function createEmptyArrayBuffer(gl, a_attribute, num, type) {
//        var buffer =  gl.createBuffer();  // Create a buffer object

//        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
//        gl.enableVertexAttribArray(a_attribute);  // Enable the assignment

//        return buffer;
//      }

// //   // Read a file
// //   function readOBJFile(fileName, gl, model, scale, reverse) {
// //       console.log("readOBJFILE");
// //       var request = new XMLHttpRequest();

// //       request.onreadystatechange = function() {
// //         if (request.readyState === 4 && request.status !== 404) {
// //           onReadOBJFile(request.responseText, fileName, gl, model, scale, reverse);
// //         }
// //       }
// //       request.open("GET", fileName, true); // Create a request to get file
// //       request.send();                      // Send the request
// //     }



// //   // OBJ File has been read
// //    function onReadOBJFile(fileString, fileName, gl, o, scale, reverse) {
// //        var objDoc = new OBJDoc(fileName);  // Create a OBJDoc object
// //        var result  = objDoc.parse(fileString, scale, reverse);
// //        if (!result) {
// //          g_objDoc = null; g_drawingInfo = null;
// //          console.log("OBJ file parsing error.");
// //          return;
// //        }
// //        g_objDoc = objDoc;
// //      }

// //   // OBJ File has been read compreatly
// //    function onReadComplete(gl, model, objDoc) {
// //        // Acquire the vertex coordinates and colors from OBJ file
// //        var drawingInfo = objDoc.getDrawingInfo();

// //        // Write date into the buffer object
// //        gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
// //        gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices,gl.STATIC_DRAW);

// //        gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
// //        gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

// //        gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
// //        gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);

// //        // Write the indices to the buffer object
// //        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
// //        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

// //        return drawingInfo;
// //      }


// window.onload = function init() {
//     console.log("yay");

//     canvas = document.getElementById( "gl-canvas3" );
//     gl = WebGLUtils.setupWebGL( canvas );

//     if ( !gl ){
//       alert("WebGL not available");
//     }

//     gl.viewport(0,0,canvas.width, canvas.height);
//     aspect = canvas.width / canvas.height;
//     gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);


//     gl.enable(gl.DEPTH_TEST);
//     gl.enable(gl.CULL_FACE);

//     gl.program = initShaders( gl, "vertex-shader", "fragment-shader" );
//     gl.useProgram( gl.program );

//     gl.nBuffer = null;
//     gl.vBuffer = null;

//     console.log("Getting the stuff");

//     model = initObject(gl, "JuniperTheCatBat.obj", scale);

//     // modelViewMatrixLoc = gl.getUniformLocation( gl.program, "modelView" );
//     // projection = gl.getUniformLocation( gl.program, "projection" );

//     // // var orbitBtn = document.getElementById("orbit");
//     // // orbitBtn.onclick = function(){ orbit = !orbit; };

//     // render();

// }

// // var render = function(){
// //     gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// //     // if (orbit){ theta += 0.02;  }

// //     var eye = vec3(radius * Math.sin(theta), 0, radius * Math.cos(theta));

// //     var at = vec3(0.0, 0.0, 0.0);
// //     var up = vec3(0.0, 1.0, 0.0);

// //     mvMatrix = lookAt(eye, at , up);
// //     pMatrix = perspective(fovy, 1.0, near, far);

// //     nMatrix = normalMatrix(mvMatrix,true);

// //     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mvMatrix) );
// //     gl.uniformMatrix4fv(projection, false, flatten(pMatrix) );


// //     if (!g_drawingInfo && g_objDoc && g_objDoc.isMTLComplete()) {
// //       // OBJ and all MTLs are available
// //       g_drawingInfo = onReadComplete(gl, model, g_objDoc);
// //     }
// //     if (!g_drawingInfo){
// //       requestAnimationFrame(render);
// //       return;
// //     } else {
// //         gl.drawElements(gl.TRIANGLES, g_drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
// //         requestAnimationFrame(render);
// //     }
// // }
