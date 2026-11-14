# Monitoreo de capgrupo.com

Estos pasos los hace una persona con acceso a las cuentas. El sitio no necesita código nuevo para
Search Console ni Bing: se verifican en su panel y no se añade nada a las páginas.

## 1. Google Search Console

1. Crear una propiedad de tipo **dominio** para `capgrupo.com`. La verificación es por registro DNS TXT,
   así cubre `www`, `http` y `https` a la vez.
2. Enviar el sitemap: `https://capgrupo.com/sitemap.xml`.
3. Revisar cada semana en **Páginas**: errores 404 inesperados, páginas excluidas por `noindex`
   (la vista 404 y `/404.html` deben aparecer ahí) y duplicados con canonical.
4. En **Rendimiento** se ven las búsquedas que llevan al sitio. Esa es la respuesta a «qué busca la gente».

## 2. Bing Webmaster Tools

1. Importar la propiedad desde Search Console (opción «Importar desde Google Search Console»).
2. Confirmar que el sitemap aparece y no tiene errores.

## 3. Uptime (cada 5 minutos)

Configurar un monitor HTTP(S) en el servicio que se prefiera (por ejemplo UptimeRobot o Better Stack):

- URL: `https://capgrupo.com/`, intervalo de 5 minutos, texto esperado «Grupo CAP».
- URL adicional: `https://capgrupo.com/empresas/japan-hn`, texto esperado «Japan HN».
- Alerta a un correo o canal del equipo (no a una cuenta personal).

## 4. Comprobación propia con cron

`scripts/healthcheck.mjs` revisa las rutas principales, la vista 404, las cabeceras de seguridad
y la redirección de `www`. Sale con código 1 si algo falla. Ejemplo para cada 15 minutos:

```
*/15 * * * * cd /ruta/a/cap-page && node scripts/healthcheck.mjs https://capgrupo.com >> /var/log/cap-health.log 2>&1
```

Mientras no estén aplicados los bloques de `deploy/nginx/`, algunas comprobaciones fallarán a propósito
(cabeceras, 404 real, redirección de `www`).

## 5. Copia del build y de nginx

- **Build:** se reproduce desde el repositorio con `npm ci && npm run build`. Requiere Google Chrome
  para el prerenderizado (`CHROME=/ruta/al/binario` si no está en el PATH).
- **nginx:** los bloques de referencia están en `deploy/nginx/`. Antes de subir la configuración real al
  repositorio, quitar cualquier dato sensible (contraseñas, claves privadas, tokens). Guardar solo
  rutas de certificados, nunca los certificados.
- Para tener la configuración en vivo a mano: `sudo cat /etc/nginx/sites-enabled/capgrupo.com` y
  copiar el resultado a `deploy/nginx/live/` después de revisarlo.

## 6. Privacidad

Ninguno de estos servicios añade scripts, cookies ni píxeles al sitio. Search Console y Bing leen
el sitio desde fuera; el servicio de uptime solo pide la página. Por eso la política sigue siendo
correcta («sin analítica, sin píxeles y sin cookies»).
