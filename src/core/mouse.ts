class Mouse {
  private static buttonMap = new Map<number, boolean>();
  private static pressedButtonMap = new Map<number, boolean>();

  public static setButtonDown(button: number) : void {
    this.buttonMap.set(button, true);
  }

  public static setButtonUp(button: number) : void {
    this.buttonMap.set(button, false);
    this.pressedButtonMap.set(button, false);
  }

  public static isButtonDown(button: number) : boolean {
    const _button = this.buttonMap.get(button);

    if (_button == undefined) {
      return false;
    } else {
      return _button;
    }

  }

  public static isButtonPressed(button: number) : boolean {
    const initialButton = this.buttonMap.get(button);
    const pressedButton = this.pressedButtonMap.get(button);

    if (initialButton == true) {
      if (pressedButton == undefined || pressedButton == false) {
        this.pressedButtonMap.set(button, true);
        return true;
      }
    }

    return false;
  }
}

export enum buttons {
  MOUSE_LEFT = 1,
  MOUSE_MIDDLE = 2,
  MOUSE_RIGHT = 3
}

export default Mouse;