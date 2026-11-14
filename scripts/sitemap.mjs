// Regenera public/sitemap.xml con las rutas del sitio y la fecha de hoy como lastmod.
// Se ejecuta antes de cada build (script "prebuild"), así el sitemap nunca queda con fechas viejas.
// Uso manual: node scripts/sitemap.mjs
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { companies } from '../src/data.js'
import { privacyNotice, privacyPolicy } from '../src/legal.js'

const SITE = 'https://capgrupo.com'
const lastmod = new Date().toISOString().slice(0, 10)

const paths = [
  '/',
  '/empresas',
  '/nosotros-completo',
  ...companies.map((company) => `/empresas/${company.slug}`),
  `/${privacyNotice.slug}`,
  `/${privacyPolicy.slug}`,
]

const urls = paths.map((path) => `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod></url>`)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

const target = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url))
writeFileSync(target, xml, 'utf-8')
console.log(`sitemap.xml: ${paths.length} URLs, lastmod ${lastmod}`)
