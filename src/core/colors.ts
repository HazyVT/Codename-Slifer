import { type Pointer } from "bun:ffi";

class Color {

  public red;
  public green;
  public blue;
  public alpha;

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}

export default Color;