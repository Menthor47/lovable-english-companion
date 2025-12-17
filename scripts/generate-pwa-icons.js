
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SCREEN_SIZES = [192, 512];
const INPUT_IMAGE = path.resolve('src/assets/logo.webp');
const OUTPUT_DIR = path.resolve('public');

async function generateIcons() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log(`Generating PWA icons from ${INPUT_IMAGE}...`);

    for (const size of SCREEN_SIZES) {
        const outputPath = path.resolve(OUTPUT_DIR, `pwa-${size}x${size}.png`);

        await sharp(INPUT_IMAGE)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFormat('png')
            .toFile(outputPath);

        console.log(`Created ${outputPath}`);
    }

    // Also ensure favicon.ico exists (converting from webp if needed, or just resizing)
    await sharp(INPUT_IMAGE)
        .resize(64, 64)
        .toFormat('png')
        .toFile(path.resolve(OUTPUT_DIR, 'favicon.ico'));

    console.log('Done!');
}

generateIcons().catch(console.error);
