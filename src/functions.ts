import { dlopen } from 'bun:ffi';

//@ts-ignore
import libsdl from '../libs/libSDL2.dylib';

//@ts-ignore
import libsdlwin from '../libs/libSDL2.dll';

//@ts-ignore
import libimage from '../libs/libSDL2_image.dylib';

//@ts-ignore
import libimagewin from '../libs/libSDL2_image.dll';

let basicSDL;
let imageSDL;

switch (process.platform) {
  case "win32":
    basicSDL = libsdlwin;
    imageSDL = libimagewin;
    break;
  case "darwin":
    basicSDL = libsdl;
    imageSDL = libimage;
    break;
}

export const sdl = dlopen(basicSDL, {
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
  SDL_RenderDrawRect: {
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
  },
  SDL_RenderCopy: {
    args: ['pointer', 'pointer', 'pointer', 'pointer'],
    returns: 'int'
  },
  SDL_CreateTextureFromSurface: {
    args: ['pointer', 'pointer'],
    returns: 'pointer'
  },
  SDL_SetWindowIcon: {
    args: ['pointer', 'pointer'],
    returns: 'void'
  }
})

export const image = dlopen(imageSDL, {
  IMG_Init: {
    args: ['int'],
    returns: 'int'
  },
  IMG_Quit: {
    returns: 'void'
  },
  IMG_Load: {
    args: ['cstring'],
    returns: 'pointer'
  }
})