import { dlopen } from 'bun:ffi';

const raylib = dlopen("lib/raylib.dll", {
    InitWindow: {
        args: ['int', 'int', 'cstring'],
        returns: 'void'
    },
    CloseWindow: {
        returns: 'void'
    },
    BeginDrawing: {
        returns: 'void'
    },
    EndDrawing: {
        returns: 'void'
    },
    WindowShouldClose: {
        returns: 'bool'
    },
    IsMouseButtonPressed:{ 
        args: ['int'],
        returns: 'bool'
    },
    GetMouseX: {
        returns: 'int'
    },
    GetMouseY: {
        returns: 'int'
    },
    SetTargetFPS: {
        args: ['int'],
        returns: 'void'
    },
    IsKeyPressed: {
        args: ['int'],
        returns: 'bool'
    },
    IsKeyDown: {
        args: ['int'],
        returns: 'bool'
    },
    GetKeyPressed: {
        returns: 'int'
    }
})

const custom = dlopen("lib/custom.dll", {
    MakeColor: {
        args: ['int', 'int', 'int', 'int'],
        returns: 'pointer'
    },
    ClearBackground: {
        args: ['pointer'],
        returns: 'void'
    },
    LoadTexture: {
        args: ['cstring'],
        returns: 'pointer'
    },
    DrawTexture: {
        args: ['pointer', 'int', 'int', 'pointer'],
        returns: 'void'
    },
    DrawRectangle: {
        args: ['int', 'int', 'int', 'int', 'pointer'],
        returns: 'void'
    },
    DrawRectangleLines: {
        args: ['int', 'int', 'int', 'int', 'pointer'],
        returns: 'void'
    },
    DrawTextureEx:{ 
        args: ['pointer', 'float', 'float', 'float', 'float', 'pointer'],
        returns: 'void'
    },
    DrawTextureRec: {
        args: ['pointer', 'float', 'float', 'float', 'float', 'float', 'float', 'pointer'],
        returns: 'void'
    },
    MakeRect: {
        args: ['float', 'float', 'float', 'float'],
        returns: 'pointer'
    },
    MakeVector: {
        args: ['float', 'float'],
        returns: 'pointer'
    },
    DrawTexturePro: {
        args: ['pointer', 'pointer', 'pointer', 'pointer', 'float', 'pointer'],
        returns: 'void'
    },
    MakeCamera: {
        args: ['pointer', 'pointer', 'float', 'float'],
        returns: 'pointer'
    },
    BeginMode2D: {
        args: ['pointer'],
        returns: 'void'
    },
    EndMode2D: {
        returns: 'void'
    },
    LoadFont: {
        args: ['cstring'],
        returns: 'pointer'
    },
    PrintTextEx: {
        args: ['pointer', 'cstring', 'pointer', 'float', 'float', 'pointer'],
        returns: 'void'
    },
    PrintText: {
        args: ['cstring', 'int', 'int', 'int', 'pointer'],
        returns: 'void'
    },
    LoadFontEx: {
        args: ['cstring', 'int'],
        returns: 'pointer'
    },
    PrintTextPro: {
        args: ['pointer', 'cstring', 'pointer', 'pointer', 'float', 'float', 'float', 'pointer'],
        returns: 'void'
    }
})

export class Color {
    private pointer;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.pointer = custom.symbols.MakeColor(red, green, blue, alpha);
    }
}

export class Texture {
    private pointer;

    constructor(path: string) {
        this.pointer = custom.symbols.LoadTexture(Buffer.from(path + "\x00"));
    }
}

export class Camera2D {
    private pointer;

    constructor(offset: Vector2, target: Vector2, rotation: number, zoom: number) {
        const _offset = custom.symbols.MakeVector(offset.x, offset.y);
        const _target = custom.symbols.MakeVector(target.x, target.y);
        this.pointer = custom.symbols.MakeCamera(_offset, _target, rotation, zoom);
    }
}

export class Font {
    private pointer;

    constructor(path: string) {
        this.pointer = custom.symbols.LoadFontEx(Buffer.from(path + "\x00"), 128);
    }
}

export class Vector2 {
    public x;
    public y;

    private pointer;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.pointer = custom.symbols.MakeVector(x, y);
    }
}



export class Rectangle {
    public x;
    public y;
    public width;
    public height;

    private pointer;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.pointer = custom.symbols.MakeRect(x,y,width,height);
    }
}

const keys = {
    KEY_NULL            : 0,        // Key: NULL, used for no key pressed
    // Alphanumeric keys:
    KEY_APOSTROPHE      : 39,       // Key: '
    KEY_COMMA           : 44,       // Key: ,
    KEY_MINUS           : 45,       // Key: -
    KEY_PERIOD          : 46,       // Key: .
    KEY_SLASH           : 47,       // Key: /
    KEY_ZERO            : 48,       // Key: 0
    KEY_ONE             : 49,       // Key: 1
    KEY_TWO             : 50,       // Key: 2
    KEY_THREE           : 51,       // Key: 3
    KEY_FOUR            : 52,       // Key: 4
    KEY_FIVE            : 53,       // Key: 5
    KEY_SIX             : 54,       // Key: 6
    KEY_SEVEN           : 55,       // Key: 7
    KEY_EIGHT           : 56,       // Key: 8
    KEY_NINE            : 57,       // Key: 9
    KEY_SEMICOLON       : 59,       // Key: ;
    KEY_EQUAL           : 61,       // Key: =
    KEY_A               : 65,       // Key: A | a
    KEY_B               : 66,       // Key: B | b
    KEY_C               : 67,       // Key: C | c
    KEY_D               : 68,       // Key: D | d
    KEY_E               : 69,       // Key: E | e
    KEY_F               : 70,       // Key: F | f
    KEY_G               : 71,       // Key: G | g
    KEY_H               : 72,       // Key: H | h
    KEY_I               : 73,       // Key: I | i
    KEY_J               : 74,       // Key: J | j
    KEY_K               : 75,       // Key: K | k
    KEY_L               : 76,       // Key: L | l
    KEY_M               : 77,       // Key: M | m
    KEY_N               : 78,       // Key: N | n
    KEY_O               : 79,       // Key: O | o
    KEY_P               : 80,       // Key: P | p
    KEY_Q               : 81,       // Key: Q | q
    KEY_R               : 82,       // Key: R | r
    KEY_S               : 83,       // Key: S | s
    KEY_T               : 84,       // Key: T | t
    KEY_U               : 85,       // Key: U | u
    KEY_V               : 86,       // Key: V | v
    KEY_W               : 87,       // Key: W | w
    KEY_X               : 88,       // Key: X | x
    KEY_Y               : 89,       // Key: Y | y
    KEY_Z               : 90,       // Key: Z | z
    KEY_LEFT_BRACKET    : 91,       // Key: [
    KEY_BACKSLASH       : 92,       // Key: '\'
    KEY_RIGHT_BRACKET   : 93,       // Key: ]
    KEY_GRAVE           : 96,       // Key: `
    // Function keys
    KEY_SPACE           : 32,       // Key: Space
    KEY_ESCAPE          : 256,      // Key: Esc
    KEY_ENTER           : 257,      // Key: Enter
    KEY_TAB             : 258,      // Key: Tab
    KEY_BACKSPACE       : 259,      // Key: Backspace
    KEY_INSERT          : 260,      // Key: Ins
    KEY_DELETE          : 261,      // Key: Del
    KEY_RIGHT           : 262,      // Key: Cursor right
    KEY_LEFT            : 263,      // Key: Cursor left
    KEY_DOWN            : 264,      // Key: Cursor down
    KEY_UP              : 265,      // Key: Cursor up
    KEY_PAGE_UP         : 266,      // Key: Page up
    KEY_PAGE_DOWN       : 267,      // Key: Page down
    KEY_HOME            : 268,      // Key: Home
    KEY_END             : 269,      // Key: End
    KEY_CAPS_LOCK       : 280,      // Key: Caps lock
    KEY_SCROLL_LOCK     : 281,      // Key: Scroll down
    KEY_NUM_LOCK        : 282,      // Key: Num lock
    KEY_PRINT_SCREEN    : 283,      // Key: Print screen
    KEY_PAUSE           : 284,      // Key: Pause
    KEY_F1              : 290,      // Key: F1
    KEY_F2              : 291,      // Key: F2
    KEY_F3              : 292,      // Key: F3
    KEY_F4              : 293,      // Key: F4
    KEY_F5              : 294,      // Key: F5
    KEY_F6              : 295,      // Key: F6
    KEY_F7              : 296,      // Key: F7
    KEY_F8              : 297,      // Key: F8
    KEY_F9              : 298,      // Key: F9
    KEY_F10             : 299,      // Key: F10
    KEY_F11             : 300,      // Key: F11
    KEY_F12             : 301,      // Key: F12
    KEY_LEFT_SHIFT      : 340,      // Key: Shift left
    KEY_LEFT_CONTROL    : 341,      // Key: Control left
    KEY_LEFT_ALT        : 342,      // Key: Alt left
    KEY_LEFT_SUPER      : 343,      // Key: Super left
    KEY_RIGHT_SHIFT     : 344,      // Key: Shift right
    KEY_RIGHT_CONTROL   : 345,      // Key: Control right
    KEY_RIGHT_ALT       : 346,      // Key: Alt right
    KEY_RIGHT_SUPER     : 347,      // Key: Super right
    KEY_KB_MENU         : 348,      // Key: KB menu
    // Keypad keys
    KEY_KP_0            : 320,      // Key: Keypad 0
    KEY_KP_1            : 321,      // Key: Keypad 1
    KEY_KP_2            : 322,      // Key: Keypad 2
    KEY_KP_3            : 323,      // Key: Keypad 3
    KEY_KP_4            : 324,      // Key: Keypad 4
    KEY_KP_5            : 325,      // Key: Keypad 5
    KEY_KP_6            : 326,      // Key: Keypad 6
    KEY_KP_7            : 327,      // Key: Keypad 7
    KEY_KP_8            : 328,      // Key: Keypad 8
    KEY_KP_9            : 329,      // Key: Keypad 9
    KEY_KP_DECIMAL      : 330,      // Key: Keypad .
    KEY_KP_DIVIDE       : 331,      // Key: Keypad /
    KEY_KP_MULTIPLY     : 332,      // Key: Keypad *
    KEY_KP_SUBTRACT     : 333,      // Key: Keypad -
    KEY_KP_ADD          : 334,      // Key: Keypad +
    KEY_KP_ENTER        : 335,      // Key: Keypad Enter
    KEY_KP_EQUAL        : 336,      // Key: Keypad =
    // Android key butto:s
    KEY_BACK            : 4,        // Key: Android back button
    KEY_MENU            : 82,       // Key: Android menu button
    KEY_VOLUME_UP       : 24,       // Key: Android volume up button
    KEY_VOLUME_DOWN     : 25        // Key: Android volume down button
}

const buttons = {
    MOUSE_BUTTON_LEFT    : 0,       // Mouse button left
    MOUSE_BUTTON_RIGHT   : 1,       // Mouse button right
    MOUSE_BUTTON_MIDDLE  : 2,       // Mouse button middle (pressed wheel)
    MOUSE_BUTTON_SIDE    : 3,       // Mouse button side (advanced mouse device)
    MOUSE_BUTTON_EXTRA   : 4,       // Mouse button extra (advanced mouse device)
    MOUSE_BUTTON_FORWARD : 5,       // Mouse button forward (advanced mouse device)
    MOUSE_BUTTON_BACK    : 6,       // Mouse button back (advanced mouse device)
}

class Raylib {

    public static keys = keys;
    public static buttons = buttons;

    static initWindow(width: number, height: number, title: string) {
        raylib.symbols.InitWindow(width, height, Buffer.from(title + "\x00"));
    }

    static closeWindow() {
        raylib.symbols.CloseWindow();
    }

    static windowShouldClose() {
        return raylib.symbols.WindowShouldClose();
    }

    static beginDrawing() {
        raylib.symbols.BeginDrawing();
    }

    static endDrawing() {
        raylib.symbols.EndDrawing();
    }

    static clearBackground(color: Color) {
        custom.symbols.ClearBackground((color as any).pointer);
    }

    static loadTexture(path: string) {
        return new Texture(path);
    }

    static drawTexture(texture: Texture, x: number, y: number) {
        const white = new Color(255,255,255,255);
        custom.symbols.DrawTexture((texture as any).pointer, x, y, (white as any).pointer);
    }

    static drawTextureEx(texture: Texture, position: Vector2, rotation: number, scale: number) {
        const white = new Color(255,255,255,255);
        custom.symbols.DrawTextureEx((texture as any).pointer, position.x, position.y, rotation, scale, (white as any).pointer);
    }

    static drawTextureRec(texture: Texture, src: Rectangle, position: Vector2) {
        const white = new Color(255,255,255,255);
        custom.symbols.DrawTextureRec(
            (texture as any).pointer, 
            src.x, src.y, src.width, src.height,
            position.x, position.y,
            (white as any).pointer
        );
    }

    static drawTexturePro(texture: Texture, src: Rectangle, dest: Rectangle, origin: Vector2, rotation: number) {
        const white = new Color(255,255,255,255);
        custom.symbols.DrawTexturePro(
            (texture as any).pointer,
            (src as any).pointer, 
            (dest as any).pointer, 
            (origin as any).pointer, 
            rotation, 
            (white as any).pointer
        );
    }

    static drawRectangle(x: number, y: number, width: number, height: number, color: Color) {
        custom.symbols.DrawRectangle(x, y, width, height, (color as any).pointer);
    }

    static drawRectangleLines(x: number, y: number, width: number, height: number, color: Color) {
        custom.symbols.DrawRectangleLines(x, y, width, height, (color as any).pointer);
    }

    static isMousePressed(button: 'MOUSE_LEFT_BUTTON' | 'MOUSE_RIGHT_BUTTON' | 'MOUSE_MIDDLE_BUTTON') {
        switch(button) {
            case 'MOUSE_LEFT_BUTTON':
                return raylib.symbols.IsMouseButtonPressed(0);
            case 'MOUSE_MIDDLE_BUTTON':
                return raylib.symbols.IsMouseButtonPressed(2);
            case 'MOUSE_RIGHT_BUTTON':
                return raylib.symbols.IsMouseButtonPressed(1);
        }
    }

    static setTargetFPS(fps: number) {
        raylib.symbols.SetTargetFPS(fps);
    }

    static getMouseX() {
        return raylib.symbols.GetMouseX();
    }

    static getMouseY() {
        return raylib.symbols.GetMouseY();
    }

    static isKeyPressed(key: number) {
        return raylib.symbols.IsKeyPressed(key);
    }

    static getKeyPressed() {
        return raylib.symbols.GetKeyPressed();
    }
    
    static isKeyDown(key: number) {
        return raylib.symbols.IsKeyDown(key);
    }

    static beginMode2D(camera: Camera2D) {
        custom.symbols.BeginMode2D((camera as any).pointer);
    }

    static endMode2D() {
        custom.symbols.EndMode2D();
    }

    static drawTextEx(font: Font, text: string, position: Vector2, size: number, spacing: number, color: Color) {
        custom.symbols.PrintTextEx(
            (font as any).pointer, 
            Buffer.from(text + "\x00"),
            (position as any).pointer, 
            size, 
            spacing, 
            (color as any).pointer
        );
    }
    
    static drawText(text: string, x: number, y: number, size: number, color: Color) {
        custom.symbols.PrintText(
            Buffer.from(text + "\x00"),
            x, y,
            size,
            (color as any).pointer
        )
    }

    static drawTextPro(font: Font, text: string, position: Vector2, origin: Vector2, rotation: number, size: number, spacing: number, color: Color) {
        custom.symbols.PrintTextPro(
            (font as any).pointer,
            Buffer.from(text + "\x00"),
            (position as any).pointer,
            (origin as any).pointer,
            rotation,
            size,
            spacing,
            (color as any).pointer
        )
    }

    static isMouseButtonPressed(button: number) {
        return raylib.symbols.IsMouseButtonPressed(button);
    }

}

export default Raylib;