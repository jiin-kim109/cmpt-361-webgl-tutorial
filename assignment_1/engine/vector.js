import { vec2, vec3 } from './common/MV.js';

class Vector {
    vector = vec3(0, 0);
    toArray() {
        return this.vector;
    }
}

export class Vector3 extends Vector {
    constructor(x, y, z) {
        super();
        this.vector = vec3(x, y, z);
    }
    toVector2() {
        const [x, y, z] = this.vector;
        return new Vector2(x, y);
    }
    static isInstance(obj) {
        if (!(obj instanceof Vector3))
            throw new Error("expected Vector 3");
        return true;
    }
}

export class Vector2 extends Vector {
    constructor(x, y) {
        super();
        this.vector = vec2(x, y);
    }
    toVector3() {
        const [x, y] = this.vector;
        return new Vector3(x, y, 0);
    }
    static isInstance(obj) {
        if (!(obj instanceof Vector2))
            throw new Error("expected Vector 3");
        return true;
    }
}