using System.Numerics;
using Raylib_cs;

class Player {

    public Rectangle rect;
    public float xvel = 0;
    public float yvel = 0;

    private bool right = false;
    private bool left = false;


    public Player(int x, int y, int width, int height) {
        rect = new(new Vector2(x, y), new Vector2(width, height));
    }

    public void Update(Rectangle[] tiles) {
        rect = Collision.move(rect, [xvel, yvel], tiles);

        if (Raylib.IsKeyDown(KeyboardKey.D) && Raylib.IsKeyDown(KeyboardKey.A)) {
            xvel = 0;
        } else if (Raylib.IsKeyDown(KeyboardKey.D)) {
            xvel = 2;
        } else if (Raylib.IsKeyDown(KeyboardKey.A)) {
            xvel = -2;
        } else {
            xvel = 0;
        }


        bool space = Raylib.IsKeyPressed(KeyboardKey.Space);
        yvel = Convert.ToInt32(space) * -4;

        if (yvel < 12) {
            yvel += 1;
        }
        
    }
}