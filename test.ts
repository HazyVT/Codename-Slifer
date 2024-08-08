import Slifer from "./src/slifer";

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  Slifer.getEvents();

  Slifer.flip();
}

Slifer.quit();