// scripts/optimize-images.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images-real';
const outputDir = './public/images';
const maxWidth = 1900; // 2x your largest display size

fs.mkdirSync(outputDir, { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  const name = path.parse(file).name;
  await sharp(path.join(inputDir, file))
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outputDir, `${name}.webp`));
  console.log(`Done: ${name}.webp`);
}