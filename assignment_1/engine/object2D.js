import { vec2, vec3 } from './common/MV.js';
import { GLObject, Vertex } from './objectManager.js';
import { Vector2 } from './vector.js';


class GLObject2D extends GLObject{
    constructor(initX, initY) {
        super(initX, initY, 0);
    }
    /**
     * Public
     */
    relocate(vector2) {
        Vector2.isInstance(vector2);
        super.relocate(vector2.toVector3());
    }
    rotate(degree) {
        super.rotate(degree, vec3(0, 0, 1));
    }
}

class Triangle extends GLObject2D {
    width;
    height;

    constructor(initX, initY, width=0.1, height=0.1) {
        super(initX, initY);
        this.width = width;
        this.height = height;
        this.createVertices();
        this.addSolidColor();
    }
    /**
     * Private
     */
    createVertices() {
        const [x, y] = this.location;
        const [w, h] = [this.width, this.height];
        this.vertices = [
            new Vertex(vec2( x-(w/2), y-(h/2) )),
            new Vertex(vec2( x, y+(h/2) )),
            new Vertex(vec2( x+(w/2), y-(h/2) ))
        ]
    }
    /**
     * Public
     */
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
}

class Rectangle extends GLObject2D {
    width;
    height;

    constructor(initX, initY, width=0.1, height=0.1) {
        super(initX, initY);
        this.width = width;
        this.height = height;
        this.createVertices();
        this.addSolidColor();
    }
    /**
     * Private
     */
    createVertices() {
        const [x, y] = this.location;
        const [w, h] = [this.width, this.height];
        this.vertices = [
            new Vertex(vec2( x-(w/2), y+(h/2) )), // right top triangle
            new Vertex(vec2(  x+(w/2), y+(h/2) )),
            new Vertex(vec2(  x+(w/2), y-(h/2) )), 
            new Vertex(vec2( x-(w/2), y+(h/2) )), // right top triangle
            new Vertex(vec2( x+(w/2), y-(h/2) )),
            new Vertex(vec2( x-(w/2), y-(h/2) ))
        ]
    }
    /**
     * Public
     */
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
}

class Circle extends GLObject2D {
    radius = 1;

    constructor(initX, initY, radius) {
        super(initX, initY);
        this.radius = radius;
    }
    /**
     * Private
     */
    createVertices() {

    }
    /**
     * Public
     */
    setRadius(radius) {
        this.radius = radius;
    }
}


export default class Object2D {
    static triangle(x, y, w, h) { return new Triangle(x, y, w, h) }
    static rectangle(x, y, w, h) { return new Rectangle(x, y, w, h) }
    static circle(x, y, r) { return new Circle(x, y, r) }
}