import { type Pointer } from 'bun:ffi';
import { sdl } from '../functions';

class Window {

  private readonly pointer: Pointer | null = null;
  private readonly renderer: Pointer | null = null;


  constructor(title: string, width: number, height: number) {
      const centered = 0x2FFF0000;
      this.pointer = sdl.symbols.SDL_CreateWindow(Buffer.from(title+'\x00'), centered, centered, width, height, 0);
      if (this.pointer == null) {
        console.error("Slifer: Failed to create window.");
        sdl.symbols.SDL_Quit();
      }

      this.renderer = sdl.symbols.SDL_CreateRenderer(this.pointer, -1, 0);
      if (this.renderer == null) {
        console.error("Slifer: Failed to create renderer");
        sdl.symbols.SDL_Quit();
      }
  }

  public quit() {
    sdl.symbols.SDL_DestroyRenderer(this.renderer);
    sdl.symbols.SDL_DestroyWindow(this.pointer);
  }
}

export default Window;