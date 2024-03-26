using System.Numerics;
using Raylib_cs;

class Player {

    public Rectangle rect;
    public double xvel = 0;
    public double yvel = 0;

    public bool onGround = false;


    public Player(int x, int y, int width, int height) {
        rect = new(new Vector2(x, y), new Vector2(width, height));
    }

    public void Update(Rectangle[] tiles) {
        rect = move(rect, [xvel, yvel], tiles);

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
        
        if (yvel < 6 && !onGround) {
            yvel += 0.2;
        } else {
            if (space && onGround) {
                yvel = Convert.ToInt16(space) * -4;
                onGround = false;
            }
        }
    }

    public void Draw() {
        Raylib.DrawRectangle((int)rect.Position.X, (int)rect.Position.Y, (int)rect.Size.X, (int)rect.Size.Y, Color.Red);
    }

        private List<Rectangle> CollisionTest(Rectangle rect, Rectangle[] tiles) {
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

    public Rectangle move(Rectangle rect, double[] movement, Rectangle[] tiles) {
        rect.X += (float)movement[0];
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

        rect.Y += (float)movement[1];
        List<Rectangle> verticalCollisions = CollisionTest(rect, tiles);
        for (int i = 0; i < verticalCollisions.Count; i++) {
            Rectangle tile = verticalCollisions[i];
            if (movement[1] > 0) {
                onGround = true;
                rect.Y = tile.Y - rect.Height;
            }

            if (movement[1] < 0) {
                rect.Y = tile.Y + tile.Height;
            }

        }

        return rect;
    }
}