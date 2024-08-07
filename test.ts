import Slifer from "./src/slifer";
import Drawable from "./src/core/drawable";

const window = Slifer.createWindow("Slifer", 640, 480);

const image = Slifer.loadImage("./assets/lilbirb-die.png");

while (Slifer.running) {
  Slifer.getEvents();

  Slifer.drawImage(image, 32, 32, 32, 32);

  Slifer.flip();
}

Slifer.quit();