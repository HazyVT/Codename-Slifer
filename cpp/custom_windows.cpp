#include <windows.h> 
#include <stdio.h> 

typedef struct Color {
	unsigned char r;        // Color red value
	unsigned char g;        // Color green value
	unsigned char b;        // Color blue value
	unsigned char a;        // Color alpha value
} Color;

typedef struct Texture {
	unsigned int id;        // OpenGL texture id
	int width;              // Texture base width
	int height;             // Texture base height
	int mipmaps;            // Mipmap levels, 1 by default
	int format;             // Data format (PixelFormat type)
} Texture;

typedef Texture Texture2D;

typedef struct Image {
	void* data;             // Image raw data
	int width;              // Image base width
	int height;             // Image base height
	int mipmaps;            // Mipmap levels, 1 by default
	int format;             // Data format (PixelFormat type)
} Image;

typedef struct Vector2 {
    float x;                // Vector x component
    float y;                // Vector y component
} Vector2;

typedef struct Rectangle {
    float x;                // Rectangle top-left corner position x
    float y;                // Rectangle top-left corner position y
    float width;            // Rectangle width
    float height;           // Rectangle height
} Rect;

typedef struct Camera2D {
    Vector2 offset;         // Camera offset (displacement from target)
    Vector2 target;         // Camera target (rotation and zoom origin)
    float rotation;         // Camera rotation in degrees
    float zoom;             // Camera zoom (scaling), should be 1.0f by default
} Camera2D;

// GlyphInfo, font characters glyphs info
typedef struct GlyphInfo {
    int value;              // Character value (Unicode)
    int offsetX;            // Character offset X when drawing
    int offsetY;            // Character offset Y when drawing
    int advanceX;           // Character advance position X
    Image image;            // Character image data
} GlyphInfo;

// Font, font texture and GlyphInfo array data
typedef struct Font {
    int baseSize;           // Base size (default chars height)
    int glyphCount;         // Number of glyph characters
    int glyphPadding;       // Padding around the glyph characters
    Texture2D texture;      // Texture atlas containing the glyphs
    Rect *recs;        // Rectangles in texture for the glyphs
    GlyphInfo *glyphs;      // Glyphs info data
} Font;

typedef void(*DrawCircleProc)(int, int, float, Color);
typedef void(*DrawRectangleProc)(int, int, int, int, Color);
typedef void(*ClearBackgroundProc)(Color);
typedef void(*DrawTextProc)(const char* text, int, int, int, Color);
typedef Texture(*LoadTextureProc)(const char *filename);
typedef Image(*LoadImageProc)(const char *filename);
typedef void(*SetWindowIconProc)(Image);
typedef void(*DrawTextureProc)(Texture, int, int, Color);
typedef void (*DrawTextureExProc)(Texture, Vector2, float, float, Color);
typedef void (*DrawTextureRecProc)(Texture, Rect, Vector2, Color);
typedef void (*DrawTextureProProc)(Texture, Rect, Rect, Vector2, float, Color);
typedef void(*BeginMode2DProc)(Camera2D);
typedef void(*EndMode2DProc)(void);
typedef Font(*LoadFontProc)(const char*);
typedef Font(*LoadFontExProc)(const char*, int, int*, int);
typedef void(*DrawTextExProc)(Font, const char*, Vector2, float, float, Color);
typedef void(*DrawTextProProc)(Font, const char*, Vector2, Vector2, float, float, float, Color);

HINSTANCE hInstLib = LoadLibrary(TEXT("raylib.dll"));

extern "C" Font* LoadFont(const char* filename) {
	LoadFontProc procAdd = (LoadFontProc)GetProcAddress(hInstLib, "LoadFont");
	Font ft = (procAdd)(filename);
	Font* ptr = (Font*)malloc(sizeof(Font));
	*ptr = ft;
	return ptr;
}

extern "C" Font* LoadFontEx(const char* filename, int size) {
	LoadFontExProc procAdd = (LoadFontExProc)GetProcAddress(hInstLib, "LoadFontEx");
	Font ft = (procAdd)(filename, size, NULL, 0);
	Font* ptr = (Font*)malloc(sizeof(Font));
	*ptr = ft;
	return ptr;
}

extern "C" void PrintTextEx(Font* font, const char* text, Vector2* pos, float size, float spacing, Color* color) {
	DrawTextExProc procAdd = (DrawTextExProc)GetProcAddress(hInstLib, "DrawTextEx");
	(procAdd)(*font, text, *pos, size, spacing, *color);
}

extern "C" void PrintTextPro(Font* font, const char* text, Vector2* pos, Vector2* origin, float rotation, float size, float spacing, Color* color) {
	DrawTextProProc procAdd = (DrawTextProProc)GetProcAddress(hInstLib, "DrawTextPro");
	(procAdd)(*font, text, *pos, *origin, rotation, size, spacing, *color);
}

extern "C" void DrawCircle(int x, int y, float radius, Color* c) {
	DrawCircleProc procAdd = (DrawCircleProc)GetProcAddress(hInstLib, "DrawCircle");
	(procAdd)(x, y, radius, *c);
}

extern "C" void ClearBackground(Color* color) {
	ClearBackgroundProc procAdd = (ClearBackgroundProc)GetProcAddress(hInstLib, "ClearBackground");
	(procAdd)(*color);
}

extern "C" void PrintText(const char* text, int posx, int posy, int fontSize, Color* color) {
	DrawTextProc procAdd = (DrawTextProc)GetProcAddress(hInstLib, "DrawText");
	(procAdd)(text, posx, posy, fontSize, *color);
}

extern "C" Texture* LoadTexture(const char* filename) {
	LoadTextureProc procAdd = (LoadTextureProc)GetProcAddress(hInstLib, "LoadTexture");
	Texture tr = (procAdd)(filename);
	Texture* ptr = (Texture*)malloc(sizeof(Texture));
	*ptr = tr;
	return ptr;
}

extern "C" Image* NewImage(const char* filename) {
	LoadImageProc procAdd = (LoadImageProc)GetProcAddress(hInstLib, "LoadImage");
	Image image = (procAdd)(filename);
	Image* ptr = (Image*)malloc(sizeof(Image));
	*ptr = image;
	return ptr;
}

extern "C" void DrawTexture(Texture* texture, int posX, int posY, Color* c) {
	DrawTextureProc procAdd = (DrawTextureProc)GetProcAddress(hInstLib, "DrawTexture");
	(procAdd)(*texture, posX, posY, *c);
}

extern "C" void DrawTextureEx(Texture* texture, float posX, float posY, float rotation, float scale, Color* color) {
	DrawTextureExProc procAdd = (DrawTextureExProc)GetProcAddress(hInstLib, "DrawTextureEx");
	Vector2 vec = Vector2{posX, posY};
	(procAdd)(*texture, vec, rotation, scale, *color);

}

extern "C" void DrawTextureRec(Texture* texture, float rectX,float rectY,float rectWidth,float rectHeight,float posX,float posY, Color* color) {
	DrawTextureRecProc procAdd = (DrawTextureRecProc)GetProcAddress(hInstLib, "DrawTextureRec");
	Vector2 vec = Vector2{posX, posY};
	Rect src = Rect{rectX, rectY, rectWidth, rectHeight};
	(procAdd)(*texture, src, vec, *color);
}



extern "C" void DrawTexturePro(Texture* texture, Rect* src, Rect* dest, Vector2* origin, float rotation, Color* color ) {
	DrawTextureProProc procAdd = (DrawTextureProProc)GetProcAddress(hInstLib, "DrawTexturePro");
	(procAdd)(*texture, *src, *dest, *origin, rotation, *color);
}


extern "C" void SetWindowIcon(Image* image) {
	SetWindowIconProc procAdd = (SetWindowIconProc)GetProcAddress(hInstLib, "SetWindowIcon");
	(procAdd)(*image);
}

extern "C" Color* MakeColor(unsigned char r, unsigned char g, unsigned char b, unsigned char a) {
	Color* ptr = (Color*) malloc(sizeof(Color));
	*ptr = Color{r,g,b,a};
	return ptr;
}

extern "C" Rect* MakeRect(float x, float y, float width, float height) {
	Rect* ptr = (Rect*)malloc(sizeof(Rect));	
	*ptr = Rect{x, y, width, height};
	return ptr;
}

extern "C" Vector2* MakeVector(float x, float y) {
	Vector2* ptr = (Vector2*)malloc(sizeof(Vector2));
	*ptr = Vector2{x, y};
	return ptr;
}

extern "C" Camera2D* MakeCamera(Vector2* offset, Vector2* target, float rotation, float zoom) {
	Camera2D* ptr = (Camera2D*)malloc(sizeof(Camera2D));
	*ptr = Camera2D{*offset, *target, rotation, zoom};
	return ptr;
}

extern "C" void BeginMode2D(Camera2D* camera) {
	BeginMode2DProc procAdd = (BeginMode2DProc)GetProcAddress(hInstLib, "BeginMode2D");
	(procAdd)(*camera);
}

extern "C" void EndMode2D() {
	EndMode2DProc procAdd = (EndMode2DProc)GetProcAddress(hInstLib, "EndMode2D");
	(procAdd)();
}

extern "C" void DrawRectangle(int xpos, int ypos, int width, int height, Color* color) {
	DrawRectangleProc procAdd = (DrawRectangleProc)GetProcAddress(hInstLib, "DrawRectangle");
	(procAdd)(xpos, ypos, width, height, *color);
}

extern "C" void DrawRectangleLines(int xpos, int ypos, int width, int height, Color * color) {
	DrawRectangleProc procAdd = (DrawRectangleProc)GetProcAddress(hInstLib, "DrawRectangleLines");
	(procAdd)(xpos, ypos, width, height, *color);
}
