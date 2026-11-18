// Elimina del CSS generado las reglas que ningún archivo del build usa (PurgeCSS).
// Se ejecuta después de "vite build" y antes de "prerender", sobre dist/.
// Las clases que se construyen con JavaScript o plantillas aparecen como texto en el bundle, así que PurgeCSS las ve.
// Se protegen los estados que cambian en ejecución (is-*, has-*, intro, nav) porque se añaden con classList.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PurgeCSS } from 'purgecss'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const cssFiles = readdirSync(join(dist, 'assets')).filter((name) => name.endsWith('.css')).map((name) => join(dist, 'assets', name))

const before = cssFiles.reduce((sum, file) => sum + readFileSync(file).length, 0)
const results = await new PurgeCSS().purge({
  content: [
    join(dist, '**/*.html'),
    join(dist, 'assets/*.js'),
    join(root, 'src/**/*.{js,jsx}'),
  ],
  css: cssFiles,
  safelist: {
    standard: [/^is-/, /^has-/, /^intro/, /^nav/],
  },
  keyframes: true,
  variables: true,
  fontFace: true,
})

for (const result of results) writeFileSync(result.file, result.css, 'utf-8')
const after = results.reduce((sum, result) => sum + result.css.length, 0)
console.log(`purge-css: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB`)
