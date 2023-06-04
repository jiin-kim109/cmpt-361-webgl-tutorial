var points = [];
var NumTimesToSubdivide = 5;
/* initial triangle */
var vertices = [
    vec2( -1, -1 ),
    vec2( 0, 1 ),
    vec2( 1, -1 )
];

divideTriangle( vertices[0],vertices[1], vertices[2], NumTimesToSubdivide);

/* add one triangle */
function triangle( a, b, c ){
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count ){
    // check for end of recursion
    if ( count === 0 ) {
        triangle( a, b, c );
    }
    else {
        //bisect the sides
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );
        --count;
        // divide three new triangles
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    var program=initShaders(gl,"vertex-shader","fragment-shader");
    gl.useProgram( program );

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program,"vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( vPosition );

    render();
}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}