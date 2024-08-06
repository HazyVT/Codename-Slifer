import { dlopen } from 'bun:ffi';

//@ts-ignore
import libsdl from '../libs/libSDL2.dylib';

export const sdl = dlopen(libsdl, {
  SDL_Init: {
    args: ['uint32_t'],
    returns: 'int'
  },
  SDL_CreateWindow: {
    args: ['cstring', 'int', 'int', 'int', 'int', 'uint32_t'],
    returns: 'pointer'
  },
  SDL_CreateRenderer: {
    args: ['pointer', 'int', 'uint32_t'],
    returns: 'pointer'
  },
  SDL_Quit: {
    returns: 'void'
  },
  SDL_PollEvent: {
    args: ['pointer'],
    returns: 'int'
  }

})