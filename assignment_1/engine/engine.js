import WebGLUtils from './common/webgl-utils.js';
import Logger from './logger.js';
import { _argumentsToArray, flatten } from './common/MV.js';
import ObjectManager from './objectManager.js';


const logger = Logger.createLogger("engine");
const objectManager = new ObjectManager();
let prog;
let positionBuffer;
let colorBuffer;
let vertexArray;

function configureViewPort(gl, canvas) {
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = pixelRatio * canvas.clientWidth;
    canvas.height = pixelRatio * canvas.clientHeight;

    // Set the viewport size
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.lineWidth(1.0);
    //gl.enable(gl.DEPTH_TEST);
}

function configureShaders(gl) {
    let v_code = `#version 300 es
        layout(location = 0) in vec3 position;
        layout(location = 1) in vec4 color;
        smooth out vec4 vertexColor;
        uniform mat4 transform;
    
        void main() {
            gl_Position = transform*vec4(position, 1.0f);
            vertexColor = color;
        }
    `;
    let f_code = `#version 300 es
        in mediump vec4 vertexColor;
        out mediump vec4 outputColor;

        void main() {
            outputColor = vertexColor;
        }  
    `;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v_code);
    gl.compileShader(vs);
    gl.shaderSource(fs, f_code);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        logger.logError(gl.getShaderInfoLog(vs));
        gl.deleteShader(vs);
    }
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        logger.logError(gl.getShaderInfoLog(fs));
        gl.deleteShader(fs);
    }

    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        logger.logError(gl.getProgramInfoLog(prog));
    }

    logger.logMessage("Shader program compiled successfully.");

    return prog;
}

function createBuffers(gl) {
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        flatten(objectManager.allVertices()),
        gl.STATIC_DRAW);

    // Repeat for the color vertex data.
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        flatten(objectManager.allColors()),
        gl.STATIC_DRAW);

    logger.logMessage("Created buffers.");
}

const refreshBuffer = (gl) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        flatten(objectManager.allVertices()),
        gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        flatten(objectManager.allColors()),
        gl.STATIC_DRAW);
}

function createVertexArrayObjects(gl) {
    vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);

    var pos_idx = gl.getAttribLocation(prog, "position");
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(pos_idx, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(pos_idx);

    var col_idx = gl.getAttribLocation(prog, "color");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(col_idx, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(col_idx);

    logger.logMessage("Created VAOs.");
}

function setUniformVariables(gl, transformMatrix) {
    var transform_loc = gl.getUniformLocation(prog, "transform");
    gl.uniformMatrix4fv(transform_loc, false, flatten(transformMatrix));
}

function render(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(prog);

    //if (objectManager.vertexUpdateFlag) {
    refreshBuffer(gl);
    objectManager.setVertexUpdateFlag(false);
    //}

    const objectsToDraw = objectManager.allObjects();
    let idx = 0;
    for (const object of objectsToDraw) {
        setUniformVariables(gl, object.getTransformMatrix());
        gl.drawArrays(gl.TRIANGLES, idx, idx + object.numOfVertices());
        idx += object.numOfVertices();
    }

    // requestAnimationFrame(() => render(gl));
}

export default class Engine {
    gl;
    init() {
        const canvas = document.getElementById("gl-canvas");
        const gl = WebGLUtils.setupWebGL( canvas );
        this.gl = gl;
        if ( !gl ) { alert( "WebGL isn't available" ); }
    
        configureViewPort(gl, canvas);
        configureShaders(gl);
        createBuffers(gl);
        createVertexArrayObjects(gl);
    
        render(gl);
    
        logger.logMessage("WebGL Engine initialized.");
    }
    renderFrame() {
        render(this.gl);
    }
}