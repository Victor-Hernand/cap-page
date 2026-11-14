// Comprueba que el sitio responde como se espera. Pensado para cron, un servicio de uptime o revisión manual.
// Uso: node scripts/healthcheck.mjs [https://capgrupo.com]
// Sale con código 1 si algo falla, para que cron o el servicio de uptime lo marquen.
const origin = (process.argv[2] ?? 'https://capgrupo.com').replace(/\/$/, '')
const wwwOrigin = 'https://www.capgrupo.com'

const pages = [
  { path: '/', expect: 200, text: 'Grupo CAP' },
  { path: '/empresas/inversiones-sm', expect: 200, text: 'Inversiones S&M' },
  { path: '/empresas/japan-hn', expect: 200, text: 'Japan HN' },
  { path: '/empresas', expect: 200, text: 'Empresas del grupo' },
  { path: '/nosotros-completo', expect: 200, text: 'Quiénes somos' },
  { path: '/aviso-de-privacidad', expect: 200, text: 'Aviso de privacidad' },
  { path: '/politica-de-privacidad', expect: 200, text: 'Política de privacidad' },
  { path: '/sitemap.xml', expect: 200, text: '<urlset' },
  { path: '/robots.txt', expect: 200, text: 'Sitemap:' },
  { path: '/esta-ruta-no-existe', expect: 404, text: 'Página no encontrada' },
]

const requiredHeaders = ['strict-transport-security', 'x-content-type-options', 'content-security-policy', 'referrer-policy', 'x-frame-options']

const failures = []
const check = (ok, message) => { if (!ok) failures.push(message); console.log(`${ok ? 'OK  ' : 'FALLA'} ${message}`) }

for (const page of pages) {
  const url = origin + page.path
  try {
    const res = await fetch(url, { redirect: 'manual' })
    const body = await res.text()
    check(res.status === page.expect, `${url} responde ${res.status} (esperado ${page.expect})`)
    if (page.expect === 200) check(body.includes(page.text), `${url} contiene "${page.text}"`)
    if (page.path === '/') {
      for (const header of requiredHeaders) check(res.headers.has(header), `cabecera ${header} presente`)
    }
  } catch (error) {
    check(false, `${url} no responde: ${error.message}`)
  }
}

try {
  const res = await fetch(`${wwwOrigin}/?x=1`, { redirect: 'manual' })
  const location = res.headers.get('location') ?? ''
  check(res.status === 301 && location.startsWith('https://capgrupo.com/'), `www redirige con 301 a capgrupo.com (respuesta ${res.status}, location ${location || 'vacío'})`)
} catch (error) {
  check(false, `www.capgrupo.com no responde: ${error.message}`)
}

if (failures.length) {
  console.log(`\n${failures.length} comprobación(es) fallaron.`)
  process.exit(1)
}
console.log('\nTodas las comprobaciones pasaron.')
