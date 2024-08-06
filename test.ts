import Slifer, { eventTypes } from "./src/slifer";

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  const event = Slifer.getEvents();

  switch (event.type) {
    case eventTypes.quit:
      Slifer.running = false;
      break;
  }
}

Slifer.quit();