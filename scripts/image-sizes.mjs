// Lee el ancho y alto real de las imágenes de public/images y public/logos y los guarda en src/image-sizes.js.
// Así cada <img> reserva su espacio antes de cargar (sin saltos de diseño) sin tener que escribir las medidas a mano.
// Se ejecuta en "prebuild". Formatos: JPEG, PNG y WebP.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const folders = ['public/images', 'public/logos']

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

function jpegSize(d) {
  let i = 2
  while (i < d.length) {
    if (d[i] !== 0xff) { i++; continue }
    const marker = d[i + 1]
    if (marker === 0xc0 || marker === 0xc2) return { h: d.readUInt16BE(i + 5), w: d.readUInt16BE(i + 7) }
    i += 2 + d.readUInt16BE(i + 2)
  }
  return null
}

function pngSize(d) {
  return { w: d.readUInt32BE(16), h: d.readUInt32BE(20) }
}

function webpSize(d) {
  const chunk = d.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') return { w: d.readUInt16LE(26) & 0x3fff, h: d.readUInt16LE(28) & 0x3fff }
  if (chunk === 'VP8L') {
    const b = d.readUInt32LE(21)
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 }
  }
  if (chunk === 'VP8X') return { w: 1 + d.readUIntLE(24, 3), h: 1 + d.readUIntLE(27, 3) }
  return null
}

function sizeOf(file) {
  const d = readFileSync(file)
  if (d[0] === 0xff && d[1] === 0xd8) return jpegSize(d)
  if (d.toString('ascii', 1, 4) === 'PNG') return pngSize(d)
  if (d.toString('ascii', 0, 4) === 'RIFF' && d.toString('ascii', 8, 12) === 'WEBP') return webpSize(d)
  return null
}

const sizes = {}
for (const folder of folders) {
  for (const file of walk(join(root, folder))) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
    const size = sizeOf(file)
    if (!size || !size.w || !size.h) continue
    // Clave relativa a public/: "images/intro/japan-hn.jpg"
    const key = relative(join(root, 'public'), file).split(sep).join('/')
    sizes[key] = [size.w, size.h]
  }
}

const body = Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)).map(([k, [w, h]]) => `  ${JSON.stringify(k)}: [${w}, ${h}],`).join('\n')
writeFileSync(join(root, 'src/image-sizes.js'), `// Generado por scripts/image-sizes.mjs. No editar a mano.\nexport const imageSizes = {\n${body}\n}\n`, 'utf-8')
console.log(`image-sizes: ${Object.keys(sizes).length} imágenes`)
