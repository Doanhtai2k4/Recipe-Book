const fs = require('fs');
const { createCanvas } = require('canvas');

// Nếu chưa cài canvas package, sẽ dùng cách khác
function createIcon(size) {
  try {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#8b5cf6');
    
    // Draw rounded rectangle
    const radius = size * 0.167;
    ctx.fillStyle = gradient;
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.fill();
    
    // Draw cooking icon (simplified as text since we can't use emoji in canvas easily)
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍳', size/2, size * 0.52);
    
    // Add text for larger sizes
    if (size >= 144) {
      ctx.font = `${size * 0.08}px Arial`;
      ctx.fillText('Recipe Book', size/2, size * 0.75);
    }
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/icon-${size}x${size}.png`, buffer);
    console.log(`✓ Created icon-${size}x${size}.png`);
    
  } catch (error) {
    console.log(`✗ Could not create icon-${size}x${size}.png:`, error.message);
    // Fallback: copy existing file
    try {
      if (fs.existsSync('public/file.svg')) {
        fs.copyFileSync('public/file.svg', `public/icon-${size}x${size}.png`);
        console.log(`→ Fallback: copied file.svg as icon-${size}x${size}.png`);
      }
    } catch (e) {
      console.log(`✗ Fallback failed for ${size}x${size}`);
    }
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Generate all required sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generating PWA icons...');
sizes.forEach(size => createIcon(size));
console.log('✅ Icon generation complete!');