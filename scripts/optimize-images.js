
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    process.exit(1);
}

const imagesToOptimize = [
    {
        input: 'logo.png',
        outputs: [
            { name: 'logo.webp', width: 200, height: 200, quality: 90 }
        ]
    },
    {
        input: 'hero-ai-seo.jpg',
        outputs: [
            { name: 'hero-ai-seo.webp', width: 1200, quality: 80 }
        ]
    }
];

async function optimize() {
    console.log('Starting image optimization...');

    for (const img of imagesToOptimize) {
        const inputPath = path.join(ASSETS_DIR, img.input);

        if (!fs.existsSync(inputPath)) {
            console.warn(`Warning: Input file not found: ${img.input}`);
            continue;
        }

        for (const out of img.outputs) {
            const outputPath = path.join(ASSETS_DIR, out.name);
            console.log(`Processing ${img.input} -> ${out.name}...`);

            try {
                let pipeline = sharp(inputPath);

                if (out.width || out.height) {
                    pipeline = pipeline.resize(out.width, out.height, {
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    });
                }

                await pipeline
                    .webp({ quality: out.quality })
                    .toFile(outputPath);

                console.log(`✓ Created ${out.name}`);
            } catch (error) {
                console.error(`Error processing ${img.input}:`, error);
            }
        }
    }

    console.log('Image optimization complete!');
}

optimize();
