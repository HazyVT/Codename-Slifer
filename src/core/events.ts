export class Event {

  public type: string;

  constructor(type: string) {
    this.type = type;
  }
}

export class QuitEvent extends Event{

  constructor(type: string) {
    super(type);
  }
}