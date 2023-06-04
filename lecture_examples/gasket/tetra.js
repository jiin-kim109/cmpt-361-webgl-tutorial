var points = [];
var colors = [];
var NumTimesToSubdivide = 5;
/* initial triangle */
var vertices = [
    vec3( 0.0000, 0.0000, -1.0000 ),
    vec3( 0.0000, 0.9428, 0.3333 ),
    vec3( -0.8165, -0.4714, 0.3333 ),
    vec3( 0.8165, -0.4714, 0.3333 ) 
];

var baseColors = [
    vec3( 0.0, 0.0,0.0),
    vec3( 1.0, 0.0, 0.0),
    vec3( 0.0, 1.0, 0.0),
    vec3( 0.0, 0.0, 1.0)
];

divideTetra( vertices[0],vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);

function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}

/* add one triangle */
function triangle( a, b, c, color ){
    colors.push(baseColors[color]);
    points.push(a);
    colors.push(baseColors[color]);
    points.push(b);
    colors.push(baseColors[color]);
    points.push(c);
}

function divideTetra( a, b, c, d, count )
{
    // check for end of recursion
    if ( count === 0 ) {
        tetra( a, b, c, d );
    }
    // find midpoints of sides; divide four smaller tetrahedra
    else {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );
        --count;
        divideTetra( a, ab, ac, ad, count );
        divideTetra( ab, b, bc, bd, count );
        divideTetra( ac, bc, c, cd, count );
        divideTetra( ad, bd, cd, d, count );
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

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors),
    gl.STATIC_DRAW);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points),
    gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program,"vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( vPosition );

    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}