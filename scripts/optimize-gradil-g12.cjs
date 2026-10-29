const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const directory = path.resolve(__dirname, "../public/images/img_gradil/img_G12");
  const output = path.join(directory, "optimized");
  await fs.mkdir(output, { recursive: true });
  sharp.concurrency(1);
  for (let index = 1; index <= 9; index++) {
    const name = `img_gradilG12_${index}`;
    const source = path.join(directory, `${name}.${index < 3 ? "jpeg" : "png"}`);
    const target = path.join(output, `${name}.webp`);
    await sharp(source).rotate().resize({ width: 3840, height: 3840, fit: "inside", withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toFile(target);
    const original = await fs.stat(source);
    const optimized = await fs.stat(target);
    console.log(`${name}: ${(original.size / 1048576).toFixed(2)} MB -> ${(optimized.size / 1024).toFixed(0)} KB`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
