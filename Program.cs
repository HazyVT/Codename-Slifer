using System.Numerics;
using Raylib_cs;

namespace HelloWorld;

class Program {

    public static bool right = false;
    public static bool left = false;
    public static bool up = false;
    public static bool down = false;

    private static List<Rectangle> CollisionTest(Rectangle rect, Rectangle[] tiles) {
        List<Rectangle> collisions = new List<Rectangle>();
        for (int i = 0; i < tiles.Length; i++) {
            Rectangle tile = tiles[i];
            if (rect.Position.X < tile.Position.X + tile.Size.X &&
                rect.Position.X + rect.Size.X > tile.Position.X &&
                rect.Position.Y < tile.Position.Y + tile.Size.Y &&
                rect.Position.Y + rect.Size.Y > tile.Position.Y) {
                    collisions.Add(tile);
                }
        }
        return collisions;
    }

    public static Rectangle move(Rectangle rect, int[] movement, Rectangle[] tiles) {
        rect.X += movement[0];
        List<Rectangle> horizontalCollisions = CollisionTest(rect, tiles);
        for (int i = 0; i < horizontalCollisions.Count; i++) {
            Rectangle tile = horizontalCollisions[i];
            if (movement[0] > 0) {
                rect.X = tile.X - rect.Width;
            }

            if (movement[0] < 0) {
                rect.X = tile.X + tile.Width;
            }

        }

        rect.Y += movement[1];
        List<Rectangle> verticalCollisions = CollisionTest(rect, tiles);
        for (int i = 0; i < verticalCollisions.Count; i++) {
            Rectangle tile = verticalCollisions[i];
            if (movement[1] > 0) {
                rect.Y = tile.Y - rect.Height;
            }

            if (movement[1] < 0) {
                rect.Y = tile.Y + tile.Height;
            }

        }

        return rect;
    }

    public static void Main() {

        Raylib.InitWindow(640, 480, "Testing");
        Raylib.SetTargetFPS(60);
        Console.WriteLine("Hello, World!");

        Rectangle player = new(new Vector2(100, 100), new Vector2(40, 80));
        Rectangle[] tiles = [new(new Vector2(0, 400), new Vector2(640, 40))];

        while (!Raylib.WindowShouldClose()) {
            Raylib.BeginDrawing();

            Raylib.ClearBackground(Color.Black);            

            int[] movement = [0, 0];
            if (right) {
                movement[0] = 1;
            }
            if (left) {
                movement[0] = -1;
            }
            if (up) {
                movement[1] = -1;
            }
            if (down) {
                movement[1] = 1;
            }

            player = move(player, movement, tiles);


            if (Raylib.IsKeyDown(KeyboardKey.Right)) {
                right = true;
            }

            if (Raylib.IsKeyDown(KeyboardKey.Left)) {
                left = true;
            }

            if (Raylib.IsKeyDown(KeyboardKey.Up)) {
                up = true;
            }

            if (Raylib.IsKeyDown(KeyboardKey.Down)) {
                down = true;
            }

            if (Raylib.IsKeyUp(KeyboardKey.Right)) {
                right = false;
            }

            if (Raylib.IsKeyUp(KeyboardKey.Left)) {
                left = false;
            }

            if (Raylib.IsKeyUp(KeyboardKey.Up)) {
                up = false;
            }

            if (Raylib.IsKeyUp(KeyboardKey.Down)) {
                down = false;
            }

            Raylib.DrawText(player.Position.X.ToString(), 10, 10, 4,Color.LightGray);



            for (int i = 0; i < tiles.Length; i++) {
                Rectangle tile = tiles[i];
                Raylib.DrawRectangle((int)tile.Position.X, (int)tile.Position.Y, (int)tile.Size.X, (int)tile.Size.Y, Color.Red);
            }

            Raylib.DrawRectangle((int)player.Position.X, (int)player.Position.Y, (int)player.Size.X, (int)player.Size.Y, Color.White);

            Raylib.EndDrawing();
        }

        Raylib.CloseWindow();
    }

    
}