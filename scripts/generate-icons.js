import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/icons');
mkdirSync(outDir, { recursive: true });

const sizes = [192, 512];
await Promise.all(
  sizes.map((size) =>
    sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 161, b: 224, alpha: 1 },
      },
    })
      .png()
      .toFile(join(outDir, `icon-${size}.png`))
  )
);
console.log('Icons written to public/icons/');
