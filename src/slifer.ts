import Window from "./core/window";
import { image, sdl } from "./functions";
import { ptr } from "bun:ffi";
import Keyboard, { keys } from "./core/keyboard";
import Transform from "./core/transform";
import { Color, colors } from "./core/colors";
import Mouse, { buttons } from "./core/mouse";
import Drawable from "./core/drawable";

class Slifer {

  public static window: Window | null = null;
  public static running = false;

  public static keys = keys;
  public static buttons = buttons;
  public static colors = colors;

  private static now : number = Number(sdl.symbols.SDL_GetPerformanceCounter());
  private static last : number = 0;
  public static deltaTime = 0;
  private static time: number = 0;

  public static createWindow(
    title: string,
    width: number,
    height: number
  ): void {
    const init = sdl.symbols.SDL_Init(0x0000ffff);
    if (init != 0) {
      console.error("Slifer: Failed to initialize.");
      sdl.symbols.SDL_Quit();
    }

    const initImage = image.symbols.IMG_Init(3);
    if (initImage != 3) {
      console.error("Slifer: Imaging library failed to initialize");
      image.symbols.IMG_Quit();
      sdl.symbols.SDL_Quit();
    }

    if (this.window == null) {
      this.window = new Window(title, width, height);
    }

    this.running = true;
  }

  public static handleEvents(): boolean {
    // Delta time calculations
    this.last = this.now;
    this.now = Number(sdl.symbols.SDL_GetPerformanceCounter());
    this.deltaTime = ((this.now - this.last) * 100000 / Number(sdl.symbols.SDL_GetPerformanceCounter()));

    // Sets default color to white
    sdl.symbols.SDL_SetRenderDrawColor(
      (this.window as any).rendererPointer,
      0,
      0,
      0,
      255
    );
    // Clears the renderer cache
    sdl.symbols.SDL_RenderClear((Slifer.window as any).rendererPointer);

    // Get current events
    const eventArray = new Uint16Array(32);
    const isEvent = sdl.symbols.SDL_PollEvent(ptr(eventArray));

    if (isEvent == 1) {
      switch (eventArray[0]) {
        case 256:
          // Quit event
          this.running = false;
          break;
        case 771:
          // Keydown event
          Keyboard.setKeyDown(eventArray[6]);
          //console.log(eventArray);
          break;
        case 769:
          // Keyup event
          Keyboard.setKeyUp(eventArray[10]);
          break;
        case 1025:
          Mouse.setButtonDown(eventArray[8] - 256);
          break;
        case 1026:
          Mouse.setButtonUp(eventArray[8]);
          break;
      }
    }

    return Slifer.running;
  }

  public static isKeyDown(key: number): boolean {
    return Keyboard.getKey(key);
  }

  public static isKeyPressed(key: number): boolean {
    return Keyboard.isKeyPressed(key);
  }

  public static isMouseButtonDown(button: number) : boolean {
    return Mouse.isButtonDown(button);
  }

  public static isMouseButtonPressed(button: number) : boolean {
    return Mouse.isButtonPressed(button);
  }

  public static quit(): void {
    this.window?.quit();
    image.symbols.IMG_Quit();
    sdl.symbols.SDL_Quit();
  }

  public static flip(): void {
    sdl.symbols.SDL_RenderPresent((this.window as any).rendererPointer);
  }

  public static drawRect( mode: "line" | "fill", x: number, y: number, width: number, height: number, color: Color ) {
    const rectTransform = new Transform(x, y, width, height);

    sdl.symbols.SDL_SetRenderDrawColor( (this.window as any).rendererPointer, color.red, color.green, color.blue, color.alpha );

    if (mode == 'fill') {
      sdl.symbols.SDL_RenderFillRect(
        (this.window as any).rendererPointer,
        (rectTransform as any).pointer
      );
    } else if (mode == 'line') {
      sdl.symbols.SDL_RenderDrawRect(
        (this.window as any).rendererPointer,
        (rectTransform as any).pointer
      );
    }
  }

  public static loadImage(path: string) {
    return new Drawable(path);
  }

  public static drawImage(image: Drawable, x: number, y: number, width: number, height: number) {
    const destSrc = new Uint32Array(4);
    destSrc[0] = x;
    destSrc[1] = y;
    destSrc[2] = width;
    destSrc[3] = height;
    
    sdl.symbols.SDL_RenderCopy(
      (this.window as any).rendererPointer,
      (image as any).pointer,
      null,
      destSrc
    )
  }
}

export default Slifer;
