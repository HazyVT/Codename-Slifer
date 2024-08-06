import Slifer, { eventTypes } from "./src/slifer";

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  const event = Slifer.getEvents();

  if (event) {
    if (event.type == eventTypes.quit) {
      Slifer.running = false;
    }
  }
}