# PWA Icons Generation Required

## Current Status
⚠️ PWA icons are currently missing. The app will function but won't look polished when installed as a PWA.

## Required Icons
- `icon-192x192.png` - 192x192px PNG
- `icon-512x512.png` - 512x512px PNG  

## Quick Fix Options

### Option 1: Use Online Generator (Recommended)
1. Visit https://realfavicongenerator.net/
2. Upload a 512x512 source image
3. Download and extract to this directory

### Option 2: Use Figma/Design Tool
1. Create 512x512 artboard with purple (#7c3aed) background
2. Add lightning bolt ⚡ or "V" symbol in white
3. Export as PNG at required sizes

### Option 3: Use ImageMagick (if installed)
```bash
# From project root
convert -size 192x192 xc:'#7c3aed' -gravity center -pointsize 96 -fill white -annotate +0+0 '⚡' static/icons/icon-192x192.png
convert -size 512x512 xc:'#7c3aed' -gravity center -pointsize 256 -fill white -annotate +0+0 '⚡' static/icons/icon-512x512.png
```

## Design Guidelines
- Background: Purple #7c3aed (matches app theme)
- Icon: Lightning bolt ⚡ or "V" for VNext
- Style: Modern, minimalist, high contrast
- Safe area: Keep important elements within 80% of canvas
