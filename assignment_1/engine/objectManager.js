import { vec2, mat4, rotate, translate, scale, mult } from './common/MV.js';
import { ColorPreset } from './preset.js';
import { Vector3 } from './vector.js';


export class Vertex {
    vertex = vec2(0, 0);
    color = ColorPreset.color("red");
    constructor(vertex) {
        this.setVertex(vertex);
    }
    getVertex() { return this.vertex; }
    getColor() { return this.color; }
    setVertex(vec) { 
        if (!Array.isArray(vec))
            throw new Error("should be given vertex vector");
        this.vertex = vec; 
    }
    setColor(color) { 
        if (!Array.isArray(color) || color.length != 4)
            throw new Error("should be given color vector");
        this.color = color; 
    } 
}

export class GLObject {
    objectId = '';
    vertices = [];
    location = [0, 0, 0];
    transform = mat4();

    constructor(initX, initY, initZ) {
        this.location = [initX, initY, initZ];
        this.generateId();
    }
    /**
     * Private
     */
    generateId() {
        this.objectId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    createVertices() {}
    addSolidColor(color=ColorPreset.color("red")) {
        for (const vertex of this.vertices) {
            vertex.setColor(color);
        }
    }
    /**
     * Public
     */
    relocate(vector3) {
        Vector3.isInstance(vector3);
        this.location = [x, y, z];
        this.createVertices();
        (new ObjectManager()).setVertexUpdateFlag(true);
    }
    rotate(degree, axis) {
        this.transform = mult(this.transform, rotate(degree, axis));
    }
    numOfVertices() { return this.vertices.length; }
    getId() { return this.objectId; }
    getX() { return this.location[0]; }
    getY() { return this.location[1]; }
    getZ() { return this.location[2]; }
    getTransformMatrix() { return this.transform; }
    getVertices() { return this.vertices; }
    getColor() { return this.colors; }
}


const singletonSymbol = Symbol('singleton');
export default class ObjectManager {
    objects = {};
    vertexUpdateFlag = false;

    constructor() {
        if (ObjectManager[singletonSymbol]) {
            return ObjectManager[singletonSymbol];
        }
        ObjectManager[singletonSymbol] = this;
    }
    instantiate(objs) {
        const objList = Array.isArray(objs) ? objs : [objs];

        for (const obj of objList) {
            const id = obj.getId();
            if (this.objects[id])
                throw new Error(`object with id ${id} already exists`);
            this.objects[id] = obj;
        }
        this.setVertexUpdateFlag(true);
    }
    destroy(objs) {
        const objList = Array.isArray(objs) ? objs : [objs];

        for (const obj of objList) {
            const id = obj.getId();
            if (!this.objects[id])
                throw new Error(`object id ${id} does not exist`);
            delete this.objects[id];
        }
        this.setVertexUpdateFlag(true);
    }
    setVertexUpdateFlag(flag) {
        if (typeof flag != "boolean")
            throw new Error("Flag must be boolean");
        this.vertexUpdateFlag = flag;
    }
    allObjects() { return Object.values(this.objects); }
    allObjectsWithKeys() { return this.objects; }
    allVertices() {
        let vertices = [];
        for (const obj of this.allObjects()) {
            for (const v of obj.getVertices()) {
                vertices = [ ...vertices, v.getVertex() ];
            }
        }
        return vertices;
    }
    allColors() {
        let colors = [];
        for (const obj of this.allObjects()) {
            for (const v of obj.getVertices()) {
                colors = [ ...colors, v.getColor() ];
            }
        }
        return colors;
    }
}