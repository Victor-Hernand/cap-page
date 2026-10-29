const B = import.meta.env?.BASE_URL ?? '/'

export const contact = {
  city: 'Tegucigalpa, Honduras',
  address: 'Bulevar Comunidad Económica Europea, frente a Plaza Aire Frío, Tegucigalpa, Honduras',
  mapQuery: 'Plaza Aire Frío, Bulevar Comunidad Económica Europea, Tegucigalpa',
  phone: '+504 3156-6090',
  phoneHref: '+50431566090',
  email: 'grupocap@cap.hn',
  hours: 'Lunes a viernes · 8:00 AM — 5:00 PM',
  whatsapp: 'https://wa.me/50431566090',
  instagram: 'https://www.instagram.com/grupoempresarialcap/',
  facebook: 'https://www.facebook.com/invrcastro/',
  tiktok: 'https://www.tiktok.com/@capgrupo',
  recruit: 'https://recruit.capgrupo.com/aplicar',
  linkedin: 'https://www.linkedin.com/company/caphn/posts/?feedView=all',
}

export const group = {
  lead: 'Grupo empresarial hondureño de autopartes y servicio automotriz.',
  traits: ['Reunimos a Inversiones S&M, Distribuidora Mansiago, Japan HN, Auto Repuestos Blessing y Tecnicentro DIDASA bajo una dirección corporativa común.', 'Cada empresa mantiene su especialidad. Desde CAP aportamos estrategia, disciplina financiera y desarrollo del talento.'],
  sharedServices: [
    { label: 'Administración', icon: 'admin' },
    { label: 'Finanzas', icon: 'finance' },
    { label: 'Contabilidad', icon: 'accounting' },
    { label: 'Compras', icon: 'purchasing' },
    { label: 'Legal', icon: 'legal' },
    { label: 'Logística', icon: 'logistics' },
    { label: 'Tecnología', icon: 'tech' },
    { label: 'Procesos', icon: 'processes' },
    { label: 'Mercadeo', icon: 'marketing' },
    { label: 'Talento humano', icon: 'people' },
  ],
  members: ['inversiones-sm', 'auto-repuestos-blessing', 'tecnicentro-didasa', 'distribuidora-mansiago', 'cap-logistics', 'soluciones-marlons'],
  mission: 'Dirigir y fortalecer nuestras empresas para ofrecer productos y servicios confiables a nuestros clientes y desarrollar a nuestra gente, mediante una gestión que integre tecnología, innovación y mejora continua.',
  vision: 'Consolidarnos como un grupo empresarial de referencia en Honduras, con proyección regional, reconocido por la solidez de sus empresas, la confianza de sus clientes y las oportunidades de crecimiento que ofrece a su gente, con una gestión impulsada por la tecnología, la innovación y la mejora continua de nuestros procesos.',
}

export const companies = [
  {
    name: 'Inversiones S&M', slug: 'inversiones-sm', cta: 'Solicitar cotización mayorista', unit: 'Mayoristas', coverage: 'Nacional · talleres, distribuidores y flotillas', type: 'Importación y distribución · B2B', logo: B + 'logos/SYM-removebg-preview.png', website: 'https://www.inversionessymhn.com',
    text: 'Importación y distribución mayorista de autopartes en Honduras.',
    description: 'Importación y distribución mayorista de autopartes en Honduras. Consulte nuestro portafolio y las condiciones de atención para su negocio.',
    highlightsTitle: 'Qué ofrecemos',
    highlights: ['Servicio personalizado', 'Cobertura nacional', 'Consulte disponibilidad, cobertura y plazo estimado de entrega con nuestro equipo comercial.', 'Atención a talleres, distribuidores y flotillas'],
    mission: 'Ser el socio estratégico del sector automotriz, ofreciendo autopartes de alta calidad, precios competitivos y asesoría especializada que impulse el crecimiento de nuestros clientes.',
    vision: 'Consolidarnos como una distribuidora de autopartes confiable, con servicio cercano, innovación constante y compromiso con el desarrollo automotriz.',
    contact: { address: 'Bulevar Comunidad Económica Europea, frente a Plaza Aire Frío', phone: '3156-6090', email: 'administracion@inversionessymhn.com' },
    socials: { facebook: 'https://www.facebook.com/invsym/', instagram: 'https://www.instagram.com/inversiones.sym_hn/', tiktok: 'https://www.tiktok.com/@inversionessym', whatsapp: 'https://wa.me/50492109620' },
  },
  {
    name: 'Distribuidora Mansiago', slug: 'distribuidora-mansiago', cta: 'Consultar productos para mi negocio', unit: 'Mayoristas', coverage: 'Nacional · lubricantes y fluidos', type: 'Lubricantes, fluidos y autopartes · B2B', logo: B + 'logos/mansiago.jpg', website: 'https://www.mansiago.com',
    text: 'Distribución mayorista de lubricantes, fluidos, filtros y autopartes.',
    description: 'Distribución mayorista de lubricantes, fluidos, filtros y autopartes. Consulte disponibilidad y opciones de abastecimiento para su empresa.',
    highlightsTitle: 'Qué ofrecemos',
    highlights: ['Atención orientada al cliente', 'Consulte disponibilidad de productos y condiciones de entrega.'],
    mission: 'Revolucionar la industria automotriz hondureña, buscando el máximo rendimiento de cada vehículo mediante productos de alta calidad y un servicio al cliente cercano.',
    vision: 'Ser una referencia en la industria de repuestos en Honduras, estableciendo el estándar de calidad, asequibilidad y satisfacción del cliente.',
    contact: { address: 'Bulevar Comunidad Económica Europea, frente a Plaza Aire Frío', phone: '9408-4995', email: 'administracion@mansiago.com' },
    socials: { facebook: 'https://www.facebook.com/distribuidoramansiago', instagram: 'https://www.instagram.com/distribuidoramansiago', tiktok: 'https://www.tiktok.com/@distribuidoramansiago', whatsapp: 'https://wa.me/50495697549' },
  },
  {
    name: 'Auto Repuestos Blessing', slug: 'auto-repuestos-blessing', cta: 'Cotizar mi repuesto', unit: 'Repuestos y taller', coverage: 'Venta en tiendas', type: 'Venta al detalle · B2C', logo: B + 'logos/blessing.png', website: 'https://autorepuestosblessing.com',
    text: 'Autopartes al detalle en Tegucigalpa para distintas marcas de vehículos.',
    description: 'Autopartes al detalle para distintas marcas de vehículos, con atención en Tegucigalpa. Comparta marca, modelo, año y el repuesto que necesita para consultar disponibilidad.',
    highlightsTitle: 'Qué ofrecemos',
    highlights: ['Amplio inventario', 'Atención personalizada en tiendas', 'Productos para múltiples marcas'],
    mission: 'Brindar productos de alta calidad y un servicio excepcional que busque la satisfacción y fidelidad de nuestros clientes.',
    vision: 'Crecer en Honduras y, a futuro, en Centroamérica, siendo la opción preferida para la compra de repuestos.',
    listTitle: 'Principales líneas de venta',
    list: ['Lubricantes', 'Filtros', 'Frenos', 'Dirección', 'Amortiguadores', 'Motores', 'Embragues', 'Soportes'],
    contact: { address: 'Col. Kennedy, frente al Instituto Técnico Honduras', phone: '3285-0830', email: 'gerencia@autorepuestosblessing.com' },
    socials: { facebook: 'https://www.facebook.com/arsblessing/', instagram: 'https://www.instagram.com/autorepuestosblessing/', tiktok: 'https://www.tiktok.com/@autorepuestosblessing', whatsapp: 'https://wa.me/50492507107' },
  },
  {
    name: 'Tecnicentro DIDASA', slug: 'tecnicentro-didasa', cta: 'Consultar servicio y cita', unit: 'Repuestos y taller', coverage: 'Atención en taller · Anillo Periférico, Villa Nueva', type: 'Instalación y servicio · B2C', logo: B + 'logos/didasa.jpg', website: 'https://tecdidasa.com',
    text: 'Mantenimiento, reparación y venta de autopartes.',
    description: 'Mantenimiento, reparación y venta de autopartes. Consulte el servicio que necesita y coordine la atención de su vehículo.',
    highlightsTitle: 'Qué ofrecemos',
    highlights: ['Servicio accesible', 'Compromiso con cada cliente', 'Técnicos profesionales', 'Seguimiento a cada servicio'],
    infrastructure: [['10', 'Técnicos capacitados']],
    mission: 'Transformar la experiencia automotriz mediante un servicio integral, de calidad y atención oportuna.',
    vision: 'Ser el centro automotriz preferido por su calidad, accesibilidad e innovación en servicios.',
    listTitle: 'Servicios principales',
    list: ['Cambio de lubricantes y fluidos', 'Cambio de pastillas y zapatas', 'Rectificado de discos y tambores', 'Cambio de embrague (clutch)', 'Alineamiento y balanceo', 'Limpieza de inyectores', 'Diagnóstico electrónico', 'Mecánica general', 'Servicio de aire acondicionado', 'Mantenimiento del sistema de enfriamiento', 'Rectificado de muñones'],
    contact: { address: 'Anillo Periférico, Villa Nueva (100 m antes del puente peatonal)', phone: '8944-9954', email: 'gerencia@tecdidasa.co' },
    socials: { facebook: 'https://www.facebook.com/tecnicentrodidasa1', instagram: 'https://www.instagram.com/tecnicentro_didasa/', tiktok: 'https://www.tiktok.com/@didasahn' },
  },
  {
    name: 'Japan HN', slug: 'japan-hn', cta: 'Solicitar catálogo mayorista', unit: 'Mayoristas', coverage: 'Distribución para el mercado hondureño', type: 'Repuestos japoneses · B2B', logo: B + 'logos/japan-hn.jpg', website: 'https://www.japanhn.com',
    text: 'Repuestos para vehículos de marcas japonesas.',
    description: 'Importación y distribución de repuestos para vehículos de marcas japonesas. Consulte el catálogo y la atención para su negocio.',
    highlightsTitle: 'Qué ofrecemos',
    highlights: ['Repuestos para marcas japonesas', 'Catálogo de repuestos por marca', 'Atención especializada B2B'],
    infrastructure: [['1', 'Bodega principal'], ['4', 'Vendedores especializados']],
    mission: 'Ser un distribuidor de repuestos japoneses en Honduras, ofreciendo productos de calidad y servicios de atención especializada a nuestros clientes.',
    vision: 'Consolidarnos como la opción preferida para repuestos japoneses, orientados a la confiabilidad, la variedad y la atención al cliente.',
    listTitle: 'Aplicaciones por marca',
    list: ['Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Mazda', 'Isuzu', 'Daihatsu'],
    contact: { address: 'Barrio Guacerique, bulevar Comunidad Económica Europea, frente a Plaza Aire Frío, Tegucigalpa.', phone: '9452-5175', email: 'ventas@japanhn.com' },
    socials: { facebook: 'https://www.facebook.com/rjapanhn/', instagram: 'https://www.instagram.com/japanhn_/', tiktok: 'https://www.tiktok.com/@japan.hn' },
  },
  { name: 'CAP Logistics', slug: 'cap-logistics', cta: 'Consultar alcance del servicio', unit: 'Otros servicios', coverage: 'Transporte entre países', type: 'Transporte de carga', logo: B + 'logos/cap.png', text: 'Empresa de transporte de carga con cabezales que mueve producto entre países.', contact: { address: 'Bulevar Comunidad Económica Europea, frente a Plaza Aire Frío', email: 'grupocap@cap.hn' },
    // CAP Logistics no tiene redes propias: usa las de Grupo CAP.
    socials: { facebook: contact.facebook, instagram: contact.instagram, tiktok: contact.tiktok, whatsapp: contact.whatsapp },
  },
  {
    name: 'Soluciones Marlons', slug: 'soluciones-marlons', cta: 'Cotizar equipo para mi proyecto', unit: 'Otros servicios', coverage: 'Renta de equipo para obras en Honduras', type: 'Renta de maquinaria pesada', logo: B + 'logos/marlon.png', website: 'https://solucionesmarlons.com',
    text: 'Renta de maquinaria pesada en Honduras para excavación y movimiento de material.',
    description: 'Renta de maquinaria pesada en Honduras para excavación, movimiento de material y preparación de terreno. Consulte los equipos y condiciones disponibles para su proyecto.',
    highlightsTitle: 'Servicios',
    highlights: ['Renta para excavación: apertura de terreno, zanjeo y nivelación', 'Movimiento de material: carga y traslado en frentes de trabajo', 'Preparación de base: compactación de rellenos, accesos y superficies', 'Apoyo a proyectos especiales'],
    listTitle: 'Equipos (disponibilidad se confirma en cada cotización)',
    list: ['Miniexcavadora', 'Excavadora mediana', 'Excavadora de mayor capacidad', 'Tractor', 'Equipo de compactación'],
    contact: { phone: '9408-4995', email: 'gerencia@solucionesmarlons.com' },
    socials: { whatsapp: 'https://wa.me/50494084995' },
  },
]

// Cifras de operación mostradas en la portada. Confirmar fecha de corte y fuente antes de publicar.
// Etapas de la cadena que cubre el grupo (sección Ecosistema integral).
// Tarjetas de la sección "Por qué Grupo CAP". Cobertura y vendedores en ruta pendientes de validación.
// Tarjetas "¿Cómo podemos ayudarte?" por tipo de cliente. Algunas frases requieren validación antes de publicar.
export const solutionCards = [
  { title: 'Talleres y distribuidores', text: 'Abastecimiento mayorista con precios competitivos y atención de vendedores especializados.', items: ['Autopartes y repuestos japoneses', 'Lubricantes y fluidos', 'Entregas en ruta'], cta: 'Solicitar asesor', requestType: 'Cliente o taller' },
  { title: 'Flotas corporativas', text: 'Mantenimiento preventivo y correctivo con repuesto incluido para mantener tus unidades en ruta.', items: ['Diagnóstico electrónico', 'Frenos, suspensión y clutch', 'Mecánica general'], cta: 'Cotizar para mi flota', requestType: 'Flota corporativa' },
  { title: 'Instituciones públicas', text: 'Suministro de repuestos y servicios de mantenimiento vehicular para entidades del Estado.', items: ['Cotizaciones formales', 'Repuesto y servicio en una oferta', 'Atención de procesos de compra'], cta: 'Contactar al equipo institucional', requestType: 'Institución pública' },
  { title: 'Proveedores y alianzas', text: 'Buscamos marcas y socios que compartan nuestro estándar de calidad y visión de crecimiento.', items: ['Representación de marcas', 'Distribución nacional', 'Proyectos conjuntos'], cta: 'Proponer una alianza', requestType: 'Proveedor o marca' },
];

// Fotos de la sección "Operación real". Leyendas y fotos a confirmar por Marketing.
export const operationPhotos = [
  { src: B + 'images/centro-operaciones-cap.webp', caption: 'Centro de operaciones', position: '50% 40%', layout: 'feature' },
  { src: B + 'images/intro/tecnicentro-didasa.jpg', caption: 'Taller de servicio', position: '50% 40%' },
  { src: B + 'images/procesos/mostrador.jpg', caption: 'Venta al detalle', position: '50% 50%' },
  { src: B + 'images/intro/inversiones-sm.jpg', caption: 'Distribución', position: '50% 40%' },
  { src: B + 'images/bodega-mansiago.webp', caption: 'Bodega', position: '50% 40%' },
  { src: B + 'images/intro/japan-hn.jpg', caption: 'Personal calificado', position: '50% 40%' },
]

export const whyCards = [
  ['Portafolio completo', 'Autopartes, repuestos japoneses, lubricantes, filtros y baterías para múltiples marcas.'],
  ['Repuesto + servicio', 'Compra la pieza y resuelve la instalación en nuestros talleres, con técnicos capacitados.'],
  ['Cobertura nacional', 'Vendedores en ruta y logística propia para abastecer a tiempo en todo el país.'],
  ['Gestión corporativa', 'Finanzas, compras, legal y talento centralizados: procesos ordenados y trazables.'],
]

export const ecosystemSteps = [
  ['Importación', 'Inversiones S&M · Japan HN'],
  ['Distribución', 'Inversiones S&M · Distribuidora Mansiago'],
  ['Venta al detalle', 'Auto Repuestos Blessing'],
  ['Instalación y servicio', 'Tecnicentro DIDASA'],
  ['Logística', 'CAP Logistics'],
  ['Maquinaria', 'Soluciones Marlons'],
]

export const operationTotals = [
  ['Almacenes', 4],
  ['Vendedores', 28],
  ['Talleres', 2],
  ['Tiendas', 2],
]

export const stats = [
  { value: companies.length, label: 'Empresas del grupo' },
  { value: 160, suffix: '+', label: 'Colaboradores' },
  { value: group.sharedServices.length, label: 'Áreas centralizadas' },
  { value: 8, label: 'Años consolidando' },
  { value: 22, label: 'Departamentos' },
  { value: 2, label: 'Países' },
]

export const downloads = [
  { title: 'Perfil corporativo', text: 'Identidad, empresas, misión y cobertura', format: 'PDF', size: '1 MB', href: B + 'material/perfil-corporativo-grupo-cap.pdf' },
  { title: 'Resumen de Grupo CAP', text: 'Ficha visual en alta calidad', format: 'PNG', size: '0.9 MB', href: B + 'material/resumen-grupo-cap.png' },
]

export const pillars = [
  ['Sostenibilidad financiera', 'Crecimiento rentable y una gestión estratégica de recursos que fortalece cada decisión.'],
  ['Expansión comercial', 'Más presencia, mejores alianzas y un portafolio que llega donde el mercado lo necesita.'],
  ['Excelencia operativa', 'Procesos ordenados para atender cada solicitud con calidad.'],
  ['Experiencia del cliente', 'Cada contacto cuenta: escuchamos, resolvemos y construimos relaciones duraderas.'],
  ['Transformación digital', 'Tecnología e innovación para modernizar operaciones y contribuir al desarrollo del sector.'],
]

export const processes = [
  { title: 'Venta B2B', phone: '9210-9620', channel: 'Talleres, distribuidores y flotillas', image: B + 'images/procesos/venta-b2b.jpg', steps: ['Visita del asesor', 'Levantamiento de pedido', 'Confirmación', 'Entrega', 'Facturación'] },
  { title: 'Compra en mostrador', phone: '9250-7107', channel: 'Cliente final · B2C', image: B + 'images/procesos/mostrador.jpg', steps: ['Atención personalizada', 'Pago en caja', 'Soporte postventa'] },
  { title: 'Entrega a domicilio', phone: '9250-7107', channel: 'Pedidos hasta su puerta', image: B + 'images/procesos/entrega.jpg', steps: ['Confirmación de pedido', 'Elección del método de pago', 'Entrega', 'Factura'] },
  { title: 'Devoluciones', channel: 'Según la política vigente', image: B + 'images/procesos/devoluciones.jpg', reasons: ['Producto defectuoso', 'Error de pedido', 'Incompatibilidad'] },
]

// Títulos y descripciones de búsqueda por página (sección 8 de la revisión).
export const seo = {
  home: ['Grupo CAP | Autopartes y servicio en Honduras', 'Conozca las empresas de Grupo CAP: autopartes al por mayor y al detalle, servicio automotriz y renta de maquinaria en Honduras.'],
  about: ['Nosotros | Grupo CAP Honduras', 'Conozca Grupo CAP, su enfoque de gestión, sus empresas y los principios que orientan su trabajo en el sector automotriz de Honduras.'],
  companies: {
    'inversiones-sm': ['Inversiones S&M | Autopartes al por mayor en Honduras', 'Autopartes al por mayor para negocios en Honduras. Conozca Inversiones S&M y consulte su portafolio, cobertura y condiciones de atención.'],
    'distribuidora-mansiago': ['Mansiago | Lubricantes y filtros al por mayor', 'Conozca Distribuidora Mansiago. Lubricantes, fluidos, filtros y autopartes al por mayor en Honduras. Consulte productos y atención comercial.'],
    'auto-repuestos-blessing': ['Auto Repuestos Blessing | Repuestos en Tegucigalpa', 'Autopartes al detalle en Tegucigalpa. Consulte repuestos para su vehículo, ubicación y canales de atención de Auto Repuestos Blessing.'],
    'tecnicentro-didasa': ['Tecnicentro DIDASA | Servicio automotriz en Honduras', 'Mantenimiento, reparación y autopartes. Conozca Tecnicentro DIDASA y consulte servicios, ubicación y opciones para atender su vehículo.'],
    'japan-hn': ['Japan HN | Repuestos para vehículos japoneses', 'Conozca Japan HN y su oferta de repuestos para vehículos de marcas japonesas. Consulte catálogo y atención comercial en Honduras.'],
    'cap-logistics': ['CAP Logistics | Operación logística de Grupo CAP', 'Conozca CAP Logistics, empresa de transporte de carga con cabezales que mueve producto entre países.'],
    'soluciones-marlons': ['Soluciones Marlons | Renta de maquinaria en Honduras', 'Renta de maquinaria pesada para excavación y movimiento de material. Consulte equipos y condiciones para su proyecto con Soluciones Marlons.'],
  },
}

// Oculta la línea de tiempo hasta validar fechas y hechos (hallazgos 12.8 a 12.11).
export const showTimeline = true

// Misión y visión por empresa: no aprobadas aún por Gerencia (hallazgos A14 a A18). Oculta hasta confirmar la versión institucional.
export const showCompanyMissionVision = false

// Hitos por año. Años entregados por Gerencia; las frases son neutras y deben revisarse antes de publicar.
export const milestones = [
  ['2013', 'Auto Repuestos Blessing', 'Se integra al grupo.', [['Auto Repuestos Blessing', B + 'logos/blessing.png']]],
  ['2019', 'Inversiones S&M', 'Se integra al grupo.', [['Inversiones S&M', B + 'logos/sym.jpg']]],
  ['2020', 'Tecnicentro DIDASA', 'Se integra al grupo.', [['Tecnicentro DIDASA', B + 'logos/didasa.jpg']]],
  ['2025', 'Distribuidora Mansiago y CAP Logistics', 'Se integran al grupo.', [['Distribuidora Mansiago', B + 'logos/mansiago.jpg'], ['CAP Logistics', B + 'logos/cap.png']]],
  ['2026', 'Japan HN y Grupo CAP', 'Japan HN se integra al grupo y Grupo CAP consolida el conglomerado.', [['Japan HN', B + 'logos/japan-hn.jpg'], ['Grupo CAP', B + 'logos/cap.png']]],
]

export const gallery = [
  { src: B + 'images/equipo-almacen-2.jpg', alt: 'Colaboradores de Grupo CAP reunidos en el almacén', caption: 'Un mismo equipo', layout: 'feature', position: '50% 55%' },
  { src: B + 'images/sala-juntas.jpg', alt: 'Equipo administrativo de Grupo CAP en la sala de juntas', caption: 'Sala de juntas', layout: 'wide', position: '50% 60%' },
  { src: B + 'images/colaborador.jpg', alt: 'Colaborador de Grupo CAP en su estación de trabajo', caption: 'Compromiso diario', layout: 'wide', position: '60% 40%' },
  { src: B + 'images/blessing-equipo-tienda.jpg', alt: 'Equipo de Auto Repuestos Blessing atendiendo en tienda', caption: 'Auto Repuestos Blessing', layout: 'full', position: '50% 45%' },
]

export const zones = [
  // x/y son la posición geográfica real de cada ciudad proyectada sobre la silueta del mapa.
  { city: 'Tegucigalpa', text: 'Sede corporativa, bodegas, tiendas y talleres', x: 34.8, y: 64.1, hub: true },
  { city: 'San Pedro Sula', text: 'Cobertura comercial y distribución', x: 21.3, y: 17.1 },
  { city: 'La Ceiba', text: 'Atención a la costa norte', x: 41.1, y: 8.6 },
  { city: 'Comayagua', text: 'Distribución en la zona central', x: 27.6, y: 51.6, side: 'left' },
  { city: 'Choluteca', text: 'Cobertura en la zona sur', x: 34.8, y: 89.5 },
  { city: 'Olancho', text: 'Atención al oriente del país', x: 50.5, y: 44.7, side: 'left' },
]
