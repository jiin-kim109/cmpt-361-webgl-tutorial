export class ColorPreset {
    static color(name) {
        console.log(name);
        const colors = {
            none: [1, 1, 1, 0],
            red: [1, 0, 0, 1],
            green: [0, 1, 0, 1],
            blue: [0, 0, 1, 1],
            red: [1, 0, 0, 1],
            blue: [0, 0, 1, 1],
            purple: [1, 0, 1, 1],
            gray: [0.4, 0.4, 0.4, 1],
            lightgray: [0.8, 0.8, 0.8, 1]
        }
        return [ ...colors[name] ];
    }
}