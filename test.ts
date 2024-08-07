import { sdl } from "./src/functions";
import Slifer from "./src/slifer";

const player = {
  xpos: 32,
  ypos: 32
}

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  Slifer.getEvents();

  if (Slifer.isKeyDown(Slifer.keys.K_d)) {
    player.xpos += 0.4;
  } else if (Slifer.isKeyDown(Slifer.keys.K_a)) {
    player.xpos -= 0.4;
  }

  Slifer.drawRect('fill', player.xpos, player.ypos, 32, 32, Slifer.colors.red);


  Slifer.flip();
}

Slifer.quit();