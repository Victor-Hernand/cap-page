# Plan de mejora: auditoría de capgrupo.com

Base: auditoría del 25 de octubre de 2026 (IDs H01–H29) contrastada con el código del repositorio (rama IvanCambio263, cambios sin confirmar). Esto mide el código local, no el sitio en producción. Donde la auditoría no se pudo verificar, se indica como pendiente.

Fecha de revisión: 28 de octubre de 2026.

## 1. Estado de avance por hallazgo

Leyenda: **Hecho** = resuelto en código; **Parcial** = avance con pendiente; **Pendiente** = sin cambios; **Decisión** = requiere aprobación de Gerencia u otra área.

| ID | Hallazgo | Estado | Evidencia en el código |
|---|---|---|---|
| H01 | /login se presentaba como acceso de clientes | Hecho | `src/main.jsx` redirige `/login` a `/#empresas`. Falta confirmar en producción. |
| H02 | Intro y carrusel de empresas sin control por teclado | Hecho | El carrusel automático ya no existe en el código: no hay temporizador de rotación. La intro conserva “Saltar intro” (`src/App.jsx:369`). |
| H03 | Panel de empresas sin botón “Ver empresa” | Parcial | Las tarjetas tienen “Conocer empresa” y el logo enlaza a la ficha (`src/App.jsx:163-171`). Falta confirmar la acción comercial en cada tarjeta. |
| H04 | Rojo de la interfaz distinto del indicado por Gerencia | Decisión | `--red: #B21E25` (`src/App.css:5`). Referencia de Gerencia: #7B2429. |
| H05 | Repetición de bloques en fichas | Pendiente | Baja prioridad. |
| H06 | Alcance de marcas y entidades (Moniteck, Logistics, Marlons) | Decisión | Requiere definición de Gerencia General. |
| H07 | “Cobertura nacional” en todas las fichas | Pendiente | Sigue en `src/data.js:45` y `src/data.js:144`. |
| H08 | Redacción absoluta y repetida | Parcial | Se quitaron “respuesta inmediata”, “garantizada” y “líder”. Falta H1 (“Impulsamos la movilidad…”, `src/App.jsx:843`) y tono. |
| H09 | Cifras sin conciliar | Pendiente | `operationTotals` sigue en `src/data.js:157-162` (4, 28, 2, 2). |
| H10 | Móvil sin prueba a 390 px | Parcial | Hay reglas de 44 × 44 px para filtros y enlaces en móvil (`src/App.css:1095`). Falta prueba visual real a 390 px. |
| H11 | WhatsApp general heredado por empresa | Parcial | Modal “Solicitar información” con WhatsApp por empresa y mensaje precargado (`src/App.jsx:755-809`). Confirmar que DIDASA y Japan tengan número propio. |
| H12 | Sin recorridos por necesidad | Parcial | Existe el modal de solicitud. Falta selector completo y enrutamiento definido por Gerencia. |
| H13 | “Ver vacantes” llevaba a login | Hecho | El enlace apunta a `recruit.capgrupo.com/aplicar` (`src/data.js:15`). Confirmar en producción. |
| H14 | Postulación sin aviso visible | Parcial | El formulario está fuera de este repositorio. Hay enlace a aviso de privacidad (`src/App.jsx:986`). Falta prueba de recepción. |
| H15 | HTML inicial genérico, metadatos solo por JavaScript | Parcial | Título, descripción, canonical y Open Graph cambian por ruta en el navegador (`setPageMeta`, `src/App.jsx:14-30`). El HTML que entrega el servidor sigue siendo el de la portada; falta prerenderizado o SSR. |
| H16 | Sin canonical, og:url ni JSON-LD | Parcial | Canonical y og:url por ruta; JSON-LD Organization en `index.html`; og:image absoluta. Falta Twitter por ruta y encabezados semánticos H2/H3 en fichas. Dominio canónico asumido: `https://capgrupo.com`. |
| H17 | robots.txt y sitemap.xml devuelven HTML | Parcial | Creados `public/robots.txt` y `public/sitemap.xml` (portada, Nosotros y las siete fichas). Falta 404 real en rutas inexistentes y unificar www; depende del hosting. |
| H18 | Foto de equipo de 14.94 MB | Hecho en repo | Originales de 14.9, 2.7 y 1.5 MB movidos fuera de `public/` a `/tmp/claude-1000/-home-ivanmurillo-proyectos-cap-page/d13161e6-d077-4ade-81ab-7e4f4dc9c435/scratchpad/respaldo-imagenes/`. Hero convertido a WebP (96 KB). Falta desplegar para que cambie en producción. |
| H19 | Seis fotos de intro de 3.88 MB | Pendiente | Carpeta `public/images/intro/` sin optimizar. |
| H20 | Encabezados de seguridad ausentes | Pendiente | Depende de la infraestructura (CDN u origen). Ver sección 4. |
| H21 | Rutas no reconocidas devuelven 200 | Pendiente | Solo se redirige `/login` en el cliente. Requiere configuración del servidor. |
| H22 | Sin aviso de privacidad (crítico) | Parcial | Borrador en `src/legal.js`, enlazado desde el pie y la sección de empresas. Muestra la leyenda “Borrador… No publicar” (`src/App.jsx:1044`). Falta aprobación de Legal y TH. |
| H23 | Garantías, liderazgo y cobertura sin respaldo | Parcial | Textos retirados. Falta validación documental. |
| H24 | Pestañas y controles pequeños | Pendiente | Solo hay un `aria-controls`/`tablist` en `src/App.jsx`. |
| H25 | Pausa visible del carrusel | Hecho | Sin carrusel automático, no hace falta botón de pausa. Revisar si se reintroduce la rotación. |
| H26 | Sin medición | Pendiente | No hay gtag, dataLayer ni eventos en el código. |
| H27 | Correo corporativo cruzado | Pendiente | `administracion@inversionessymhn.com` sigue en `src/data.js:9` y `src/data.js:48`. |
| H28 | DIDASA con correo y teléfono distintos al sitio externo | Pendiente | `gerencia@tecdidasa.co` y 8944-9954 en `src/data.js:86`. |
| H29 | Mapa con búsqueda general | Parcial | Se corrigió la duplicación “Tegucigalpa, Tegucigalpa, Honduras” en `mapsHref` (`src/App.jsx:25`). Falta coordenada exacta de cada local. |

## 2. Hallazgos nuevos (no estaban en la auditoría)

1. **Pie de página con aviso de privacidad sin aprobar.** `footerNotice` (`src/legal.js:6`) se muestra en el pie y contiene el correo `s.merci@cap.hn`, que no aparece en la auditoría ni en el directorio. El propio archivo dice que no debe publicarse hasta confirmar los campos. **Acción:** Legal confirma el texto y el correo antes de la siguiente publicación; mientras tanto, ocultar el bloque si no hay aprobación.
2. **Archivo de 14.9 MB sigue en la carpeta pública.** Aunque la web ya usa el WebP, el original se copia a `dist/` y se publica. **Acción:** confirmar que ninguna referencia lo use y moverlo fuera de `public/`.
3. **Dominio de hosting.** `vite.config.js` contempla GitHub Pages (`/cap-page/`). Si el sitio está allí, no se pueden configurar encabezados HTTP (H20) ni 404 real (H17) desde el repositorio. **Acción:** TI confirma dónde se sirve el sitio antes de planear H17 y H20.
4. **Hero en WebP (resuelto en esta revisión).** La foto nueva del hero ahora es `src/assets/hero-cap-muro.webp`.
5. **Teléfono general distinto del directorio.** `contact.phone` en `src/data.js` es `+504 3156-6090`, que no aparece en la auditoría. Gerencia debe confirmarlo antes de publicar.
6. **Archivo sin uso.** `src/assets/hero-team.jpg` (1.5 MB) ya no se usa. No se borró porque es una foto original del equipo; decidir si se conserva.

## 3. Plan por fases

Los plazos son relativos desde la asignación y deben validarse con cada responsable. No son compromisos acordados.

### Fase 0: bloqueantes antes de cualquier campaña

| Acción | IDs | Responsable sugerido | Criterio de cierre |
|---|---|---|---|
| Aprobar el aviso de privacidad y retirar la leyenda de borrador | H22, hallazgo 1 | Legal + TH | Aviso con responsable, finalidades, destinatarios, conservación y contacto aprobados. Leyenda eliminada. |
| Conciliar directorio de contactos y mapas | H27, H28, H29 | Gerencia + Marketing | Cada empresa confirma canales y ubicación. Llamada o mensaje de prueba recibido por el equipo correcto. |
| Probar recepción de postulaciones | H14 | TH + Desarrollo | Envío de prueba con acuse, sin usar CV real de un candidato. |

### Fase 1: 1 a 5 días

| Acción | IDs | Responsable sugerido | Criterio de cierre |
|---|---|---|---|
| Retirar el original de 14.9 MB de `public/` y convertir hero a WebP | H18, hallazgo 2 y 4 | Desarrollo | `dist/` sin archivos superiores a 300 KB en portada. Comparación visual antes y después. |
| Crear robots.txt y sitemap.xml válidos | H17 | Desarrollo | Respuestas `text/plain` y `application/xml`. 404 real para rutas inexistentes. |
| Metadatos por ruta, canonical y JSON-LD Organization | H15, H16 | Desarrollo + Marketing | Título y descripción en el HTML inicial de cada ruta. Canonical y og:url por página. |
| Confirmar hosting y configurar encabezados | H20, H21, hallazgo 3 | TI + Desarrollo | Informe de encabezados desde producción. CSP probada sin romper formularios. |
| Dar contacto comercial por empresa y por necesidad | H11, H12 | Comercial + Marketing | Mayorista, tienda, taller, maquinaria y alianzas llegan al equipo aprobado. |
| Medir contactos y postulaciones | H26 | Marketing + Desarrollo | Eventos `empresa_vista`, `contacto_click`, `postulacion_iniciada` y `postulacion_completada` sin datos personales. |

### Fase 2: 3 a 5 días, antes de aprobar la versión

| Acción | IDs | Responsable sugerido | Criterio de cierre |
|---|---|---|---|
| Probar móvil a 390, 1366 y 1920 px | H10 | Desarrollo + Marketing | Capturas sin desbordamiento. Controles de 44 × 44 px. |
| Accesibilidad de pestañas, filtros y carrusel | H02, H24, H25 | Desarrollo | Navegación completa por teclado. Pausa accesible. Zoom al 200 % sin pérdida. |
| Validar cifras, cobertura y garantías | H07, H08, H09, H23 | Gerencia + Operaciones | Ficha de datos firmada por responsable. Ninguna cifra sin respaldo. |

### Fase 3: 1 semana

| Acción | IDs | Responsable sugerido | Criterio de cierre |
|---|---|---|---|
| Botón “Ver empresa” y CTA por ficha | H03 | Marketing + Comercial | Cada tarjeta tiene acción visible. Foco y posición se mantienen al volver. |
| Cobertura por servicio, con alcance de CAP Logistics | H06, H07 | Operaciones + Gerencia General | Texto por punto de atención. Sin “cobertura nacional” general. |
| Decidir color y aplicarlo | H04 | Gerencia + Marketing | Color aprobado aplicado a la interfaz. Logos de empresas sin cambios. |
| Redacción y H1 | H08 | Marketing + Gerencia | H1 concreto, sin frases absolutas. |

### Fase 4: siguiente revisión

| Acción | IDs | Responsable sugerido | Criterio de cierre |
|---|---|---|---|
| Simplificar intro, optimizar las seis fotos y revisar alias | H01, H02, H19 | Desarrollo | Intro opcional. Fotos optimizadas. Enlaces profundos llegan a la sección. |
| Espaciado y etiquetas | H05 | Marketing | Revisión visual sin repeticiones innecesarias. |

## 4. Preguntas abiertas

1. ¿Dónde se sirve el sitio (GitHub Pages, CDN u otro)? Define si H17, H20 y H21 se resuelven en el repositorio o en infraestructura.
2. ¿`s.merci@cap.hn` es el contacto oficial para derechos de datos?
3. ¿Cuál es la cantidad vigente de tiendas de Blessing, talleres de DIDASA y vendedores? Hoy el sitio muestra 2, 2 y 28.
4. ¿Qué color institucional se aprueba: #B21E25 o #7B2429?

## 5. Verificación pendiente

- Revisión de producción: H01, H13, H17 y H21.
- Revisión móvil real (H10) y prueba de teclado (H24).
- Confirmación de recepción de correos y WhatsApp de cada empresa (H11, H27, H28).
- No se revisó la parte final de la auditoría original (el texto recibido se cortó en el anexo A12).
