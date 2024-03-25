using System.Numerics;
using Raylib_cs;

namespace HelloWorld;

class Program {

    public static bool right = false;
    public static bool left = false;
    public static bool up = false;
    public static bool down = false;

    public static void Main() {

        Raylib.InitWindow(640, 480, "Testing");
        Raylib.SetTargetFPS(60);

        Player player = new(100, 100, 32, 32);        

        Rectangle[] tiles = [new(new Vector2(0, 400), new Vector2(640, 40))];

        Texture2D img = Raylib.LoadTexture("./data/images/clouds/cloud_1.png");

        while (!Raylib.WindowShouldClose()) {
            Raylib.BeginDrawing();

            Raylib.ClearBackground(Color.Black);            

            /*
            player.Update(tiles);

            for (int i = 0; i < tiles.Length; i++) {
                Rectangle tile = tiles[i];
                Raylib.DrawRectangle((int)tile.Position.X, (int)tile.Position.Y, (int)tile.Size.X, (int)tile.Size.Y, Color.Red);
            }

            Raylib.DrawRectangle((int)player.rect.Position.X, (int)player.rect.Position.Y, (int)player.rect.Size.X, (int)player.rect.Size.Y, Color.White);
            */

            Raylib.DrawTexture(img, 100, 200, Color.White);


            Raylib.EndDrawing();
        }

        Raylib.CloseWindow();
    }

    
}