// Prerenderiza cada ruta del sitio en dist/ para que el HTML inicial ya tenga contenido
// (WhatsApp, Facebook y LinkedIn no ejecutan JavaScript). Se ejecuta después de "vite build".
// Requiere Google Chrome o Chromium (CHROME=/ruta/al/binario para cambiarlo). Sin Chrome, avisa y no falla el build.
// Además crea dist/404.html con noindex: los hosts que sirven 404.html devuelven estado 404 real.
import { execFile, execFileSync } from 'node:child_process'
import { promisify } from 'node:util'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, statSync, createReadStream } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { companies } from '../src/data.js'
import { privacyNotice, privacyPolicy } from '../src/legal.js'

const execFileAsync = promisify(execFile)
const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const base = process.env.GITHUB_PAGES ? '/cap-page' : ''
const chrome = process.env.CHROME || ['google-chrome', 'chromium', 'chromium-browser'].find((bin) => {
  try { execFileSync('which', [bin], { stdio: 'ignore' }); return true } catch { return false }
})

// 404.html a partir del HTML sin prerenderizar
const rawIndex = readFileSync(join(dist, 'index.html'), 'utf-8')
const notFoundHtml = rawIndex.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />')
writeFileSync(join(dist, '404.html'), notFoundHtml, 'utf-8')
console.log('404.html: creado con noindex')

if (!chrome) {
  console.warn('prerender: no se encontró Chrome/Chromium; se omite el prerenderizado (el sitio funciona igual, sin HTML inicial).')
  process.exit(0)
}

const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.pdf': 'application/pdf' }
const server = createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (base && pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/'
  let file = normalize(join(dist, pathname))
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file)) file = join(dist, 'index.html') // fallback de SPA
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()

const routes = [
  '/',
  '/empresas',
  '/nosotros-completo',
  ...companies.map((company) => `/empresas/${company.slug}`),
  `/${privacyNotice.slug}`,
  `/${privacyPolicy.slug}`,
]

let done = 0
for (const route of routes) {
  const url = `http://127.0.0.1:${port}${base}${route}`
  // Asíncrono: el servidor local debe seguir respondiendo mientras Chrome carga la página.
  const { stdout: dom } = await execFileAsync(chrome, ['--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=1280,900', '--virtual-time-budget=8000', '--dump-dom', url], { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024, timeout: 120000 })
  // El cuerpo no debe llegar con la clase de bloqueo de la intro: la quita el JavaScript al cargar.
  const html = '<!doctype html>\n' + dom.replace(/(<body[^>]*class=")([^"]*)"/, (_, start, classes) => `${start}${classes.replace(/\bintro-lock\b/g, '').trim()}"`)
  const target = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf-8')
  done += 1
  console.log(`prerender: ${route}`)
}
server.close()

// Precarga del hero: el fondo de la portada es un CSS background, así que el navegador lo descubre tarde.
// Se añade un <link rel="preload"> con el nombre con hash que generó Vite, solo en la portada.
const heroFile = readdirSync(join(dist, 'assets')).find((name) => /^hero-cap-muro-.*\.webp$/.test(name))
if (heroFile) {
  const indexPath = join(dist, 'index.html')
  const preload = `<link rel="preload" as="image" type="image/webp" href="${base}/assets/${heroFile}" fetchpriority="high" />`
  writeFileSync(indexPath, readFileSync(indexPath, 'utf-8').replace('</head>', `    ${preload}\n  </head>`), 'utf-8')
  console.log(`preload: ${heroFile} en la portada`)
}
console.log(`prerender: ${done} páginas`)
