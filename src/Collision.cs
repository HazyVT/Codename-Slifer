using Raylib_cs;

class Collision {
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

    public static Rectangle move(Rectangle rect, float[] movement, Rectangle[] tiles) {
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
}