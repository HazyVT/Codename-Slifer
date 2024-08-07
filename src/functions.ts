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
  },
  SDL_DestroyWindow: {
    args: ['pointer'],
    returns: 'void'
  },
  SDL_DestroyRenderer: {
    args: ['pointer'],
    returns: 'void'
  },
  SDL_RenderClear: {
    args: ['pointer'],
    returns: 'void'
  },
  SDL_RenderPresent: {
    args: ['pointer'],
    returns: 'void'
  },
  SDL_RenderFillRect: {
    args: ['pointer', 'pointer'],
    returns: 'int'
  },
  SDL_SetRenderDrawColor: {
    args: ['pointer', 'uint8_t', 'uint8_t', 'uint8_t', 'uint8_t'],
    returns: 'int'
  },
  SDL_GetError: {
    returns: 'cstring'
  },
  SDL_GetPerformanceCounter: {
    returns: 'uint64_t'
  }

})