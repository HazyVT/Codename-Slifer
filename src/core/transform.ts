import { type Pointer, ptr } from 'bun:ffi';

class Transform {
  private readonly pointer: Pointer | null;

  constructor(x: number, y: number, width: number, height: number) {
    const transformArray = new Uint32Array(4);
    transformArray[0] = x;
    transformArray[1] = y;
    transformArray[2] = width;
    transformArray[3] = height;
    this.pointer = ptr(transformArray);
  }
}

export default Transform;