import Slifer from "./src/slifer";

const player = {
  xpos: 32,
  ypos: 32
}

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  Slifer.getEvents();

  if (Slifer.isMouseButtonPressed(Slifer.buttons.MOUSE_LEFT)) {
    player.xpos += 400 * Slifer.deltaTime;
  }

  Slifer.drawRect('fill', player.xpos, player.ypos, 32, 32, Slifer.colors.red);

  Slifer.flip();
}

Slifer.quit();