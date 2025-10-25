# PWA Icons Required

Please create the following icon files for the PWA:

## Required Icons

1. **icon-192x192.png**
   - Size: 192x192 pixels
   - Format: PNG
   - Purpose: Standard app icon

2. **icon-512x512.png**
   - Size: 512x512 pixels
   - Format: PNG
   - Purpose: High-res app icon (maskable)

3. **favicon.png** (Optional)
   - Size: 32x32 or 16x16 pixels
   - Format: PNG
   - Place in `/static/` directory

## Design Guidelines

- **Background**: Purple (#7c3aed) matching the app theme
- **Icon**: Lightning bolt ⚡ or similar "quick capture" symbol
- **Style**: Modern, minimalist, high contrast
- **Safe area**: Keep important elements within 80% of the canvas

## Quick Generation Options

### Option 1: Use Online Tool
- https://realfavicongenerator.net/
- Upload a 512x512 source image
- Generate all sizes automatically

### Option 2: Use ImageMagick
```bash
# Create 192x192
convert source.png -resize 192x192 icon-192x192.png

# Create 512x512
convert source.png -resize 512x512 icon-512x512.png
```

### Option 3: Use Figma/Sketch
- Create 512x512 artboard
- Design icon
- Export as PNG at 1x, 2x scales

## Temporary Placeholder

Until real icons are created, you can use:
- Emoji screenshots
- Solid color squares with text
- Default browser icons

The app will work without these, but won't look polished when installed.
