import { type Pointer } from 'bun:ffi';
import { sdl } from '../functions';

class Window {

  private readonly windowPointer: Pointer | null = null;
  private readonly rendererPointer: Pointer | null = null;


  constructor(title: string, width: number, height: number) {
      const centered = 0x2FFF0000;
      this.windowPointer = sdl.symbols.SDL_CreateWindow(Buffer.from(title+'\x00'), centered, centered, width, height, 0);
      if (this.windowPointer == null) {
        console.error("Slifer: Failed to create window.");
        sdl.symbols.SDL_Quit();
      }

      this.rendererPointer = sdl.symbols.SDL_CreateRenderer(this.windowPointer, -1, 0);
      if (this.rendererPointer == null) {
        console.error("Slifer: Failed to create renderer");
        sdl.symbols.SDL_Quit();
      }
  }

  public quit() {
    sdl.symbols.SDL_DestroyRenderer(this.rendererPointer);
    sdl.symbols.SDL_DestroyWindow(this.windowPointer);
  }
}

export default Window;