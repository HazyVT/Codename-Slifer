import wordsListPath from "word-list";
import Raylib, { Camera2D, Color, Font, Vector2 } from "../raylib";
import Player from "./player";
import fs from 'node:fs';
import { approach } from "./util";

const words = fs.readFileSync(wordsListPath, 'utf8').split('\n');

Raylib.initWindow(640, 480, "Survivors");
Raylib.setTargetFPS(60);

const white = new Color(255,255,255,255);
const black = new Color(0,0,0,255);
const bg = new Color(60, 138, 78, 255);
const fontback = new Color(35, 92, 67, 255);

const font = new Font("assets/Kaph-Regular.ttf");
let fsize = 16;


/*
const panel = Raylib.loadTexture("assets/blank_panel.png");

var emptyString = "";
const constanants = "bcdfghjklmnpqrstvwxyz";
const vowels = "aeiou"

function addConstonant() {
    emptyString += constanants[Math.floor(Math.random() * constanants.length)];
};

function addVowel() {
    emptyString += vowels[Math.floor(Math.random() * vowels.length)];
}

function niceText(text: string, x: number, y: number) {
    Raylib.drawTextEx(font, text, new Vector2(x, y + 4), 24, 8, fontback);
    Raylib.drawTextEx(font, text, new Vector2(x, y), 24, 8, white);
}
*/


while (!Raylib.windowShouldClose()) {
    Raylib.beginDrawing();

    Raylib.clearBackground(bg);

    Raylib.drawTextPro(font, "Hello World!", new Vector2(100, 100), new Vector2(99,99), 0, fsize, 0, white);

    fsize = approach(fsize, 16, 0.5);

    if (Raylib.isKeyPressed(Raylib.keys.KEY_SPACE)) fsize = 24;

    Raylib.endDrawing();
}

Raylib.closeWindow();