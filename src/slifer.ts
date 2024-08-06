import Window from "./core/window";
import { sdl } from "./functions";
import { ptr } from 'bun:ffi';
import { EmptyEvent, Event, QuitEvent } from "./core/events";

export enum eventTypes {
  quit = "QUIT",
  keydown = "KEYDOWN",
  keyup = "KEYUP",
  noevent = "NOEVENT"

}

class Slifer {

  public static window: Window | null = null;
  public static running = false;
  
  public static createWindow(title: string, width: number, height: number) : void {
    const init = sdl.symbols.SDL_Init(0x0000FFFF);
    if (init != 0) {
      console.error("Slifer: Failed to initialize.");
      sdl.symbols.SDL_Quit();
    }

    if (this.window == null) {
      this.window = new Window(title, width, height);
    }

    this.running = true;
  
  }

  public static getEvents() : Event {
    const eventArray = new Uint16Array(32);
    const isEvent = sdl.symbols.SDL_PollEvent(ptr(eventArray));

    if (isEvent == 1) {
      switch (eventArray[0]) {
        case 256:
          return new QuitEvent();
          break;
      }
    }

    return new EmptyEvent();
  }

  public static quit() : void {
    this.window?.quit();
    sdl.symbols.SDL_Quit();
  }

}

export default Slifer;