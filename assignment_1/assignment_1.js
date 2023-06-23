import Engine, { ObjectManager, Object2D, Vector2, ColorPreset } from './engine/index.js';

const WebGlEngine = new Engine();
const objectManager = new ObjectManager();
WebGlEngine.init();

function createBackground() {
    const background = Object2D.rectangle(0, 0, 1.4, 1.6);
    background.addSolidColor(ColorPreset.color("lightgray"));
    objectManager.instantiate(background);
}

function createBorders() {
    const leftTop = Object2D.rectangle(-0.325, 0.5, 0.5, 0.35);
    const rightTop = Object2D.rectangle(0.325, 0.5, 0.5, 0.35);
    const midLeft = Object2D.rectangle(-0.475, 0, 0.2, 0.4);
    const midRight = Object2D.rectangle(0.475, 0, 0.2, 0.4);
    const leftBottom = Object2D.rectangle(-0.325, -0.5, 0.5, 0.35);
    const rightBottom = Object2D.rectangle(0.325, -0.5, 0.5, 0.35);
    objectManager.instantiate([leftTop, rightTop, midLeft, midRight, leftBottom, rightBottom]);
}

function createGhostCage() {
    const dotted = [];
    dotted.push(Object2D.rectangle(0.0, 0.2, 0.025, 0.005));
    dotted.push(Object2D.rectangle(-0.05, 0.2, 0.025, 0.005));
    dotted.push(Object2D.rectangle(0.05, 0.2, 0.025, 0.005));
    dotted.push(Object2D.rectangle(-0.0, 0.05, 0.005, 0.025));
    objectManager.instantiate(dotted);
}

createBackground();
createBorders();
createGhostCage();

const triangle = Object2D.triangle(0.5, 0.5, 0.1, 0.1);
const rectangle = Object2D.rectangle(-0.5, -0.5, 0.1, 0.2);

objectManager.instantiate([triangle, rectangle]);

//triangle.rotate(190);

WebGlEngine.renderFrame();