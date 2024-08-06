import Slifer from "./src/slifer";

Slifer.createWindow("Slifer", 640, 480);

while (Slifer.running) {
  Slifer.getEvents();

  if (Slifer.isKeyPressed(Slifer.keys.K_d)) {
    console.log("D is pressed");
  } 
}

Slifer.quit();