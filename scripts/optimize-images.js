// Image optimization for the landing page.
// Idempotent: originals are backed up to assets/_original on first run and
// every subsequent run reads from there, so re-running never re-compresses output.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS = path.join(__dirname, "..", "assets");
const ORIG = path.join(ASSETS, "_original");

if (!fs.existsSync(ORIG)) fs.mkdirSync(ORIG, { recursive: true });

// Returns the source path to read from (backing up the live file on first run).
function source(file) {
    const live = path.join(ASSETS, file);
    const backup = path.join(ORIG, file);
    if (!fs.existsSync(backup)) {
        if (!fs.existsSync(live)) throw new Error(`Missing source image: ${file}`);
        fs.copyFileSync(live, backup);
    }
    return backup;
}

function kb(p) {
    return (fs.statSync(p).size / 1024).toFixed(0) + " KB";
}

async function run() {
    const jobs = [
        // Header / thank-you logo: only ever displayed ~40-56px tall → 160px is plenty for retina.
        async () => {
            const out = path.join(ASSETS, "logo.png");
            await sharp(source("logo.png"))
                .resize({ height: 160, withoutEnlargement: true })
                .png({ compressionLevel: 9, palette: true })
                .toFile(out + ".tmp");
            fs.renameSync(out + ".tmp", out);
            console.log(`logo.png -> ${kb(out)}`);
        },
        // Solution-section image: rendered at max ~800px wide → WebP @ 1000px covers retina.
        async () => {
            const out = path.join(ASSETS, "munka_kozben.webp");
            await sharp(source("munka_kozben.png"))
                .resize({ width: 1000, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(out);
            console.log(`munka_kozben.webp -> ${kb(out)}`);
        },
    ];

    for (const job of jobs) await job();
    console.log("Image optimization done.");
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
