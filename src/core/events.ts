export class Event {

  public type: string;

  constructor(type: string) {
    this.type = type;
  }
}

export class QuitEvent extends Event {

  constructor() {
    super('QUIT');
  }
}

export class EmptyEvent extends Event {
  constructor() {
    super('NOEVENT');
  }
}