export class Color {

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

export const colors = {
  red: new Color(255,179,186,255),
  orange: new Color(255, 223, 186, 255),
  yellow: new Color(255, 255, 186, 255),
  green: new Color(186, 255, 201, 255),
  blue: new Color(186, 225, 255, 255),
  lightGray: new Color(200, 200, 200, 255),
  gray: new Color(130, 130, 130, 255),
  darkGray: new Color(80, 80, 80, 255)
};
