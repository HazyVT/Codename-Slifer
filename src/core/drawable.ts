import { type Pointer } from 'bun:ffi';
import { image, sdl } from '../functions';
import Slifer from '../slifer';

class Drawable {
  private pointer: Pointer | null;

  constructor(path: string) {
    const imageSurface = image.symbols.IMG_Load(Buffer.from(path+"\x00"));
    this.pointer = sdl.symbols.SDL_CreateTextureFromSurface((Slifer.window as any).rendererPointer, imageSurface);
    if (this.pointer == null) {
      console.error("Slifer: Failed to load image at " + path);
      sdl.symbols.SDL_Quit();
    }
  }
}

export default Drawable;