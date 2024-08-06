import { type Pointer, ptr } from 'bun:ffi';

class Transform {
  private readonly pointer: Pointer | null;
  public position: {x: number, y: number};
  public size: {width: number, height: number};

  constructor(x: number, y: number, width: number, height: number) {
    const transformArray = new Uint32Array(4);
    transformArray[0] = x;
    transformArray[1] = y;
    transformArray[2] = width;
    transformArray[3] = height;
    this.pointer = ptr(transformArray);
    this.position = {x: x, y: y};
    this.size = {width: width, height: height};
  }
}

export default Transform;