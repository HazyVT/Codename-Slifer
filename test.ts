import Slifer from "./src/slifer";

Slifer.createWindow("Slifer", 640, 480);

const player = {
  x: 32,
  y: 32
}

while (Slifer.running) {
  Slifer.getEvents();

  if (Slifer.isKeyDown(Slifer.keys.K_d)) {
    player.x += 400 * Slifer.deltaTime;
  } else if (Slifer.isKeyDown(Slifer.keys.K_a)) {
    player.x -= 400 * Slifer.deltaTime;
  }
  
  
  Slifer.flip();
}

Slifer.quit();