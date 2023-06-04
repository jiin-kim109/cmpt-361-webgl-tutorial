var canvas;
// Three Vertices

var vertices = [
    vec2( -1, -1 ),
    vec2( 0, 0.5 ),
    vec2( 1, -1 ),
    vec2( -1, 0 ),
    vec2( 0, 1 ),
    vec2( 1, 0 )
];

window.onload = function init(){
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" ); 
    }

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // Load shaders
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Associate shader variables with data buffer
    var vPositionLoc = gl.getAttribLocation( program, "a_position" );

    // Load the data into the GPU and initialize attribute buffer
    var positionBuffer = gl.createBuffer();

    //bind a named buffer object; buffer for vertex attributes
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

    // Set the size of the currently bound buffer object for the passed target to the
    //size of the passed data, then write the contents of data to the buffer object
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 

    // specify how to interpret the attribute data in the buffer
    gl.vertexAttribPointer( vPositionLoc, 2, gl.FLOAT, false, 0, 0 ); // read from ARRAY_BUFFER
    gl.enableVertexAttribArray( vPositionLoc );
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}