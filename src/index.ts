import Raylib from "../raylib";
import Player from "./player";

console.log("Hello via Bun!");

const approach = (start: number, end: number, shift: number) => {
    if (start < end) {
        return Math.min(start + shift, end);
    } else {
        return Math.max(start - shift, end);
    }
}

Raylib.initWindow(640, 480, "Game");
Raylib.setTargetFPS(60);

const size = 16;
const world = Raylib.loadTexture("assets/world-packed.png");

const tree = new Raylib.Rectangle(12 * size, 0 * size, size, size);

const char = new Raylib.Rectangle(size, 7 * size, size, size);
const chardest = new Raylib.Rectangle(32,32,32, 32);
const player = new Player(char, chardest);
const origin = new Raylib.Vector2(16,16);

const white = new Raylib.Color(255,255,255,255);
const bg = new Raylib.Color(132, 184, 141, 255);


let rotation = 0;
let rotToRight = true;


while (!Raylib.windowShouldClose()) {
    Raylib.beginDrawing();

    Raylib.clearBackground(bg);

    const key = Raylib.getKeyPressed();

    if (key != 0) {
        switch (key) {
            case Raylib.keys.KEY_D:
            case Raylib.keys.KEY_A:
            case Raylib.keys.KEY_W:
            case Raylib.keys.KEY_S:
                if (rotToRight) {
                    rotation = 24;  
                } else {
                    rotation = -24;
                }
                rotToRight = !rotToRight;
                chardest.width = 38;
                chardest.height = 38;
                break;
        }
    }

    if (Raylib.isKeyPressed(Raylib.keys.KEY_D)) {
        chardest.x += 32;
        char.width = size;
    }

    if (Raylib.isKeyPressed(Raylib.keys.KEY_A)) {
        chardest.x -= 32;
        char.width = -size;
    }

    if (Raylib.isKeyPressed(Raylib.keys.KEY_W)) {
        chardest.y -= 32;
    }

    if (Raylib.isKeyPressed(Raylib.keys.KEY_S)) {
        chardest.y += 32;
    }

    

    rotation = approach(rotation, 0, 2);
    chardest.width = approach(chardest.width, 32, 1);
    chardest.height = approach(chardest.height, 32, 1);

    Raylib.drawTexturePro(world, char, chardest, origin, rotation);


    Raylib.endDrawing();
}

Raylib.closeWindow
