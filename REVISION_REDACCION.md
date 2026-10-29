# Revisión de redacción: capgrupo.com

Base: propuestas de la sección 7 y anexo A de la auditoría del 25 de octubre de 2026, contrastadas con el texto actual del código.

Estados: **Aplicado** (cambiado en esta revisión), **Pendiente de aprobación** (requiere Gerencia, Legal u otra área), **Pendiente de dato** (requiere una cifra o hecho verificado).

## Cambios aplicados

| Ubicación | Texto anterior | Texto actual | Motivo |
|---|---|---|---|
| `src/data.js` (infraestructura de DIDASA) | Técnicos altamente capacitados | Técnicos capacitados | Anexo A, 6.3: no se puede demostrar el grado de capacitación. |
| `src/App.jsx` (sección ecosistema) | Cada empresa domina una etapa. Juntas permiten que un repuesto llegue desde el fabricante hasta el vehículo, con la misma calidad y respaldo. | Cada empresa cubre una etapa de la cadena. Juntas acompañan el proceso desde la importación hasta la venta y el servicio. | Anexo A, 4.2: evitar “domina” y promesas universales o de calidad sin respaldo. |

## Pendiente de aprobación

| Ubicación | Texto actual | Problema | Propuesta de la auditoría |
|---|---|---|---|
| Portada, H1 (`src/App.jsx`, hero) | Impulsamos la movilidad que mueve el progreso. | Eslogan de marca; la auditoría pide un H1 concreto. | “Autopartes y servicio automotriz en Honduras.” (Gerencia decide si cambia el eslogan.) |
| Portada, resumen del hero (`src/App.jsx`) | Siete empresas que cubren toda la cadena automotriz… | Cifra y alcance “toda la cadena” sin validar (A3.3). | Retirar hasta confirmar número de empresas y alcance. |
| Portada, bloque “Por qué Grupo CAP” (`src/data.js`) | Cobertura nacional | Afirmación general (H07). | Describir cobertura por servicio y punto de atención. |
| Ficha de Inversiones S&M, Blessing, etc. (`src/data.js`, `highlights`) | Cobertura nacional | Igual que el anterior; Logistics no explica alcance. | Igual que el anterior. |
| Portada, texto “Un grupo en crecimiento con siete empresas” (`src/App.jsx`, cerca de la línea 1011) | siete empresas | Número a validar y composición de marcas (H06). | Confirmar listado público de marcas y unidades. |
| Misiones y visiones (`src/data.js`) | p. ej. “Revolucionar la industria automotriz…” | Textos no aprobados; hoy ocultos con `showCompanyMissionVision = false`. | Redacción nueva sujeta a aprobación institucional (A14 a A18). No activar sin aprobación. |
| Lema de Blessing | La calidad, no es cara | Propuesta: “La calidad no es cara”; el logotipo tiene coma. | Corregir texto; el archivo de marca requiere aprobación. |

## Pendiente de dato

| Ubicación | Dato a confirmar |
|---|---|
| Blessing (número de tiendas, vendedores) | Cantidad vigente de tiendas y vendedores (sección 9, puntos 3 y 5). |
| CAP Logistics | Funciones, cobertura y si atiende solo a empresas del grupo (sección 9, punto 13). |
| Japan HN, Mansiago | Portafolio vigente: baterías, aplicaciones y catálogo (sección 9, punto 14). |
| Hitos de la trayectoria (`src/data.js`, hitos 2018 a 2026) | Fechas y hechos documentados (anexo A, 12.6 a 12.11). |
| Teléfono general `+504 3156-6090` | Confirmar que es el número corporativo y su responsable. |

## Reglas que deben mantenerse

- Trato de usted para todo el sitio, salvo que Gerencia decida otra cosa. La auditoría lo marca como decisión de tono, no como error.
- No publicar “respuesta inmediata”, “garantizada”, “líder” ni “cada vehículo” sin respaldo documental.
- Los campos entre corchetes de la propuesta original nunca deben quedar visibles en producción.
