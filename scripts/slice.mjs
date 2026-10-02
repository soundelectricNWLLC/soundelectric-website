import sharp from 'sharp';
const [,, file, chunk = '1200', prefix = '/tmp/slice'] = process.argv;
const img = sharp(file); const { width, height } = await img.metadata();
const c = +chunk; let i = 0;
for (let y = 0; y < height; y += c, i++) {
  await sharp(file).extract({ left: 0, top: y, width, height: Math.min(c, height - y) }).toFile(`${prefix}-${i}.png`);
}
console.log(width, height, i);
