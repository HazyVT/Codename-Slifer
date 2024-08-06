class Keyboard {
  
  private static keyMap = new Map<number, boolean>();
  private static pressedKeyMap = new Map<number, boolean>();

  public static setKeyDown(key: number) : void {
    this.keyMap.set(key, true);
  }

  public static setKeyUp(key: number) : void {
    this.keyMap.set(key, false);
    this.pressedKeyMap.set(key, false);
  }

  public static getKey(key: number) : boolean {
    const _key = this.keyMap.get(key);
    if (_key == undefined) {
      return false;
    } else {
      return _key;
    }
  }

  public static isKeyPressed(key: number) : boolean {
    const initialKey = this.keyMap.get(key);
    const pressedKey = this.pressedKeyMap.get(key);
    if (initialKey == true) {
      if (pressedKey == undefined || pressedKey == false) {
        this.pressedKeyMap.set(key, true);
        return true;
      }
    }

    return false;
  }
}

export default Keyboard;