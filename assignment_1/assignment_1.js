import Engine, { ObjectManager, Object2D, Vector2, ColorPreset } from './engine/index.js';

const WebGlEngine = new Engine();
WebGlEngine.init();

const objectManager = new ObjectManager();

const background = Object2D.rectangle(0, 0, 1.6, 1.6);
background.addSolidColor(ColorPreset.color("lightgray"));

const triangle = Object2D.triangle(0.5, 0.5, 0.1, 0.1);
const rectangle = Object2D.rectangle(-0.5, -0.5, 0.1, 0.2);

objectManager.instantiate([background, triangle, rectangle]);

//triangle.rotate(190);

WebGlEngine.renderFrame();