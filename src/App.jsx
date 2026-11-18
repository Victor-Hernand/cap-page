import { Children, cloneElement, isValidElement, lazy, Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import './routes.css'
import { companies, contact, downloads, gallery, group, milestones, ecosystemSteps, operationPhotos, solutionCards, whyCards, operationTotals, pillars, processes, seo, showCompanyMissionVision, showTimeline, stats, zones } from './data'
import MapaHonduras from './MapaHonduras'
import mapaHonduras from './assets/mapa-honduras.png'
import motorCap from './assets/motor-cap.webp'
import { footerNotice, privacyNotice, privacyPolicy } from './legal'
import { imageSizes } from './image-sizes'

// Ancho y alto reales de una imagen del sitio, para reservar su espacio antes de cargar.
export const imageDims = (src = '') => {
  const match = String(src).match(/(?:images|logos)\/.*$/)
  const size = match && imageSizes[match[0]]
  return size ? { width: size[0], height: size[1] } : {}
}
const CompanyPage = lazy(() => import('./pages/CompanyPage').then((m) => ({ default: m.CompanyPage })))
const CompaniesPage = lazy(() => import('./pages/CompaniesPage').then((m) => ({ default: m.CompaniesPage })))
const ExpandedAboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.ExpandedAboutPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))

const navItems = [['Inicio', 'inicio'], ['Empresas', 'empresas'], ['Nosotros', 'nosotros'], ['En cifras', 'cobertura'], ['Trabaje con nosotros', 'talento'], ['Contacto', 'contacto']]

export const B = import.meta.env.BASE_URL
export const pad = (number) => String(number).padStart(2, '0')
export const companyUrl = (company) => `${B}empresas/${company.slug}`
export const telHref = (phone) => `tel:+504${phone.replace(/\D/g, '')}`
export const SITE = 'https://capgrupo.com'
const upsertTag = (selector, tag, attrs) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(tag)
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
}
// Actualiza título, descripción, canonical y etiquetas Open Graph de la página actual.
// Ruta del sitio sin la base de despliegue ('' para la portada). /index.html equivale a la portada.
const currentRoute = () => {
  const root = B.replace(/\/$/, '')
  const path = window.location.pathname.replace(/\/$/, '')
  const route = path.startsWith(root) ? path.slice(root.length) : path
  return route === '/index.html' ? '' : route
}
// Imagen para compartir por ruta. Las empresas sin foto propia usan la imagen del grupo.
export const defaultShareImage = 'images/equipo-grupo-cap.jpg'
export const shareImages = {
  'inversiones-sm': 'images/intro/inversiones-sm.jpg',
  'distribuidora-mansiago': 'images/intro/distribuidora-mansiago.jpg',
  'auto-repuestos-blessing': 'images/intro/auto-repuestos-blessing.jpg',
  'tecnicentro-didasa': 'images/intro/tecnicentro-didasa.jpg',
  'japan-hn': 'images/intro/japan-hn.jpg',
}
export const setPageMeta = (title, description, image = defaultShareImage) => {
  document.title = title
  // El canonical sale de la ruta conocida, nunca de la URL escrita por el visitante.
  const url = `${SITE}${currentRoute() || '/'}`
  upsertTag('meta[name="description"]', 'meta', { name: 'description', content: description })
  upsertTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url })
  upsertTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: title })
  upsertTag('meta[property="og:description"]', 'meta', { property: 'og:description', content: description })
  upsertTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: url })
  upsertTag('meta[property="og:image"]', 'meta', { property: 'og:image', content: `${SITE}/${image}` })
  upsertTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: `${SITE}/${image}` })
}
export const mapsHref = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(/Honduras|Tegucigalpa/.test(address) ? address : `${address}, Tegucigalpa, Honduras`)}`
export const external = { target: '_blank', rel: 'noreferrer' }

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const [animate] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window)
  const [shown, setShown] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate) return
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 1800, 1)
        setShown(Math.round(value * progress))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [animate, value])

  return <span ref={ref}>{pad(shown)}{suffix}</span>
}

const splitWords = (children, state) => Children.map(children, (child) => {
  if (typeof child === 'string') {
    return child.split(/(\s+)/).filter(Boolean).map((part, index) => (/^\s+$/.test(part) ? part : <span className="word" key={index} style={{ '--i': state.i++ }}><span>{part}</span></span>))
  }
  if (isValidElement(child) && child.props.children) return cloneElement(child, undefined, splitWords(child.props.children, state))
  return child
})

export function Words({ children }) {
  return <>{splitWords(children, { i: 0 })}</>
}

function TeamGallery() {
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)
  const total = gallery.length
  const move = (step) => setOpen((current) => (current + step + total) % total)

  useEffect(() => {
    if (open === null) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(null)
      if (event.key === 'ArrowRight') setOpen((current) => (current + 1) % total)
      if (event.key === 'ArrowLeft') setOpen((current) => (current - 1 + total) % total)
    }
    document.body.classList.add('menu-open')
    closeRef.current?.focus()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, total])

  const photo = open === null ? null : gallery[open]

  return (
    <>
      <div className="team-gallery">
        {gallery.map((item, index) => (
          <figure className={`reveal ${item.layout}`} key={item.src} style={{ '--delay': `${index * 140}ms` }}>
            <button type="button" className="gallery-open" onClick={() => setOpen(index)} aria-label={`Ampliar foto: ${item.caption}`}>
              <img decoding="async" src={item.src} {...imageDims(item.src)} alt={item.alt} loading="lazy" style={{ objectPosition: item.position }} />
              <span className="gallery-zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg></span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      {photo && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.caption} onClick={() => setOpen(null)}>
          <figure className="lightbox-figure" key={photo.src} onClick={(event) => event.stopPropagation()}>
            <img decoding="async" src={photo.src} {...imageDims(photo.src)} alt={photo.alt} />
            <figcaption><span>{pad(open + 1)} / {pad(total)}</span>{photo.caption}</figcaption>
          </figure>
          <button type="button" className="lightbox-close" ref={closeRef} onClick={() => setOpen(null)} aria-label="Cerrar foto">×</button>
          <button type="button" className="lightbox-nav is-prev" onClick={(event) => { event.stopPropagation(); move(-1) }} aria-label="Foto anterior">←</button>
          <button type="button" className="lightbox-nav is-next" onClick={(event) => { event.stopPropagation(); move(1) }} aria-label="Foto siguiente">→</button>
        </div>
      )}
    </>
  )
}

const socials = [
  { key: 'instagram', label: 'Instagram', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { key: 'facebook', label: 'Facebook', icon: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" /> },
  { key: 'tiktok', label: 'TikTok', icon: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" /> },
]
export const companySocials = [...socials, { key: 'whatsapp', label: 'WhatsApp', icon: <><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.5 4.5 0 0 1-2.1-2.1l.9-1-1-2.2z" /></> }]

export function SocialLinks({ className = '', email = 'grupocap@cap.hn', links = contact, owner = 'Grupo CAP', networks = socials }) {
  return (
    <ul className={`social-links ${className}`}>
      {networks.filter(({ key }) => links[key]).map(({ key, label, icon }) => (
        <li key={key}><a href={links[key]} {...external} aria-label={`${label} de ${owner}`} title={label}><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></a></li>
      ))}
      {email && <li><a href={`mailto:${email}`} aria-label={`Correo de Grupo CAP: ${email}`} title={email}><svg viewBox="0 0 24 24" aria-hidden="true">{contactRowIcons.mail}</svg></a></li>}
    </ul>
  )
}

// Categorías de cliente para filtrar las tarjetas de empresas.
// Iconos de la sección "Por qué Grupo CAP", en el mismo orden que whyCards.
const whyIcons = ["<path d=\"M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z\" /><path d=\"M4 7.5l8 4.5 8-4.5M12 12v9\" />","<path d=\"M4 17l6-6 3 3 5-5M14 9h4v4\" /><circle cx=\"6\" cy=\"6\" r=\"2\" />","<path d=\"M3 6h11v10H3zM14 10h4l3 3v3h-7\" /><circle cx=\"7\" cy=\"17\" r=\"2\" /><circle cx=\"17\" cy=\"17\" r=\"2\" />","<path d=\"M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z\" /><path d=\"M9 12l2 2 4-4\" />"]

const explorerFilters = ['Todas', 'Mayoristas', 'Repuestos y taller', 'Otros servicios']

function CompanyCards() {
  const [filter, setFilter] = useState('Todas')
  const visible = companies.filter((company) => filter === 'Todas' || company.unit === filter)

  return (
    <>
      <div className="explorer-filters company-filters" role="group" aria-label="Filtrar empresas por categoría">
        {explorerFilters.map((option) => (
          <button type="button" key={option} className={option === filter ? 'is-active' : ''} aria-pressed={option === filter} onClick={() => setFilter(option)}>
            {option}<small>{option === 'Todas' ? companies.length : companies.filter((company) => company.unit === option).length}</small>
          </button>
        ))}
      </div>
      <ul className="company-cards" key={filter}>
        {visible.map((company, index) => {
          const [label, segment] = company.type.split(' · ')
          return (
            <li key={company.slug} className="company-card" style={{ '--i': index }}>
              <a href={companyUrl(company)} className="company-card-logo" aria-label={`Conocer ${company.name}`}><img decoding="async" src={company.logo} {...imageDims(company.logo)} alt="" loading="lazy" /></a>
              <div className="company-card-body">
                <span className="company-card-tag">{segment ?? 'Grupo'}</span>
                <h3>{company.name}</h3>
                <span className="company-card-type">{label}</span>
                <p>{company.text}</p>
              </div>
              <div className="company-card-foot">
                <a href={companyUrl(company)} className="company-card-link">Conocer empresa <span aria-hidden="true">→</span></a>
                {company.socials?.whatsapp && (
                  <a href={company.socials.whatsapp} {...external} className="company-card-wa" aria-label={`WhatsApp de ${company.name}`} title="WhatsApp">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const serviceIcons = {
  admin: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M8 13h8M8 16h5" /></>,
  finance: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M12 11v3" /></>,
  legal: <><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z" /></>,
  logistics: <><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" /></>,
  tech: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  accounting: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3M8 18h.01M12 18h.01" /></>,
  purchasing: <><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6" /></>,
  processes: <><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h6a3 3 0 0 1 3 3v6M15 18H9a3 3 0 0 1-3-3V9" /></>,
  marketing: <><path d="M3 10v4a1 1 0 0 0 1 1h3l6 5V4L7 9H4a1 1 0 0 0-1 1zM17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" /></>,
  people: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>,
}

const contactRowIcons = {
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  chat: <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.5-4.3a8.5 8.5 0 1 1 15.5-4.6z" />,
}

const processIcons = [
  <g key="b2b"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></g>,
  <path key="counter" d="M4 10v10h16V10M3 10l2-6h14l2 6zM9 20v-6h6v6" />,
  <g key="delivery"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></g>,
  <path key="returns" d="M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5" />,
]

function ProcessGallery() {
  const [flipped, setFlipped] = useState([])
  const toggle = (index) => setFlipped((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))

  return (
    <ol className="process-grid">
      {processes.map((process, index) => {
        const isFlipped = flipped.includes(index)
        return (
          <li
            className="process-flip reveal"
            data-flipped={isFlipped}
            key={process.title}
            role="button"
            tabIndex="0"
            aria-pressed={isFlipped}
            aria-label={`${process.title}: ${isFlipped ? 'ver información' : 'ver foto'}`}
            onClick={() => toggle(index)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return
              event.preventDefault()
              toggle(index)
            }}
          >
            <div className="process-inner">
              <div className="process-card" aria-hidden={isFlipped}>
                <div className="process-head">
                  <span className="process-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{processIcons[index]}</svg></span>
                  <span className="process-number" aria-hidden="true">{pad(index + 1)}</span>
                </div>
                <h4>{process.title}</h4>
                <p className="process-channel">{process.channel}</p>
                {process.steps
                  ? <ol className="steps">{process.steps.map((step, stepIndex) => <li key={step}><span className="step-index" aria-hidden="true">{stepIndex + 1}</span>{step}</li>)}</ol>
                  : <><p className="steps-label">Aplica por</p><ul className="steps reasons">{process.reasons.map((reason) => <li key={reason}><span className="step-index" aria-hidden="true" />{reason}</li>)}</ul></>}
                {process.phone && (
                  <a
                    className="process-phone"
                    href={telHref(process.phone)}
                    tabIndex={isFlipped ? -1 : undefined}
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  >
                    <span className="process-phone-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg></span>
                    <span><small>Teléfono</small>+504 {process.phone}</span>
                  </a>
                )}
                <span className="process-flip-hint" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" /></svg>Ver foto</span>
              </div>
              <figure className="process-back" aria-hidden={!isFlipped}>
                <img decoding="async" src={process.image} {...imageDims(process.image)} alt={`Imagen de ${process.title}`} loading="lazy" />
                <figcaption>
                  <span>{pad(index + 1)}</span>
                  <strong>{process.title}</strong>
                  <small><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" /></svg>Volver</small>
                </figcaption>
              </figure>
            </div>
          </li>
        )
      })}
    </ol>
  )
}


export const pillarIcons = [
  <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
  <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>,
  <><rect x="6" y="6" width="12" height="12" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
]

const introSlides = [
  { src: B + 'images/intro/inversiones-sm.jpg', caption: 'Inversiones S&M' },
  { src: B + 'images/intro/distribuidora-mansiago.jpg', caption: 'Distribuidora Mansiago' },
  { src: B + 'images/intro/japan-hn.jpg', caption: 'Japan HN' },
  { src: B + 'images/intro/tecnicentro-didasa.jpg', caption: 'Tecnicentro DIDASA' },
  { src: B + 'images/intro/auto-repuestos-blessing.jpg', caption: 'Auto Repuestos Blessing' },
  { src: B + 'images/intro/grupo-cap.jpg', caption: 'Un solo grupo' },
]

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const introSeen = () => {
  if (new URLSearchParams(window.location.search).has('intro')) return reducedMotion()
  try {
    return sessionStorage.getItem('cap-intro') === '1' || reducedMotion()
  } catch {
    return false
  }
}

function Intro() {
  const [phase, setPhase] = useState(() => (introSeen() ? 'done' : 'play'))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const replay = () => {
      if (reducedMotion()) return
      setIndex(0)
      setPhase('play')
    }
    window.addEventListener('cap:intro', replay)
    return () => window.removeEventListener('cap:intro', replay)
  }, [])

  useEffect(() => {
    if (phase !== 'play') return
    const timer = setTimeout(() => (index < introSlides.length - 1 ? setIndex(index + 1) : setPhase('logo')), 950)
    return () => clearTimeout(timer)
  }, [phase, index])

  useEffect(() => {
    const next = { logo: ['exit', 1900], exit: ['done', 900] }[phase]
    if (!next) return
    const timer = setTimeout(() => setPhase(next[0]), next[1])
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    const done = phase === 'done'
    document.body.classList.toggle('intro-lock', !done)
    if (done) {
      try { sessionStorage.setItem('cap-intro', '1') } catch { /* sin almacenamiento */ }
      if (window.location.search.includes('intro')) window.history.replaceState(null, '', window.location.pathname + window.location.hash)
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div className={`intro is-${phase}`} role="dialog" aria-label="Presentación de Grupo CAP">
      <div className="intro-slides" aria-hidden="true">
        {introSlides.map((slide, slideIndex) => (
          <figure key={slide.src} className={`intro-slide${slideIndex === index ? ' is-active' : ''}${slideIndex < index ? ' is-past' : ''}`}>
            <img decoding="async" src={slide.src} {...imageDims(slide.src)} alt="" />
          </figure>
        ))}
      </div>
      <div className="intro-hud" aria-hidden="true">
        <span className="intro-count">{pad(index + 1)} <small>/ {pad(introSlides.length)}</small></span>
        <strong className="intro-caption" key={index}>{introSlides[index].caption}</strong>
        <span className="intro-progress"><span style={{ transform: `scaleX(${(index + 1) / introSlides.length})` }} /></span>
      </div>
      <div className="intro-logo">
        <img decoding="async" src={B + 'logos/cap-intro.png'} alt="Grupo CAP" width="1400" height="587" />
        <span className="intro-tagline">GRUPO EMPRESARIAL CAP </span>
      </div>
      <button type="button" className="intro-skip" onClick={() => setPhase('done')}>Saltar intro <span aria-hidden="true">→</span></button>
    </div>
  )
}

export function useReveal(key) {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [key])
}

export function Header({ home = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const base = home ? '' : B

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setHidden(y > lastY + 4 && y > 480)
      if (y < lastY - 4 || y <= 480) setHidden(false)
      lastY = y
      headerRef.current?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!home || !('IntersectionObserver' in window)) return
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach((section) => observer.observe(section))
    const onTop = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [home])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header ref={headerRef} className={`nav${scrolled || open ? ' is-solid' : ''}${open ? ' is-open' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
      <span className="nav-progress" aria-hidden="true" />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="nav-inner wrap">
        <a
          className="brand"
          href={home ? '#inicio' : `${B}?intro`}
          aria-label="Grupo CAP, ir al inicio"
          onClick={(event) => {
            if (!home) return
            event.preventDefault()
            setOpen(false)
            window.scrollTo({ top: 0, behavior: 'instant' })
            window.dispatchEvent(new Event('cap:intro'))
          }}
        >
          <img decoding="async" className="logo-white" src={B + 'logos/cap-blanco.png'} alt="" width="112" height="47" />
          <img decoding="async" className="logo-color" src={B + 'logos/cap.png'} alt="" width="112" height="47" />
        </a>
        <nav id="menu-principal" className="nav-links" aria-label="Principal">
          {navItems.map(([label, id]) => <a key={id} href={`${base}#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <div className="nav-mobile-extra">
            <a className="button button-red" href={contact.whatsapp} {...external}>Escríbanos por WhatsApp <span aria-hidden="true">↗</span></a>
            <SocialLinks />
          </div>
        </nav>
        <div className="nav-actions">
          <SocialLinks className="is-nav" />
          <a className="nav-cta" href={contact.whatsapp} {...external}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.5-4.3a8.5 8.5 0 1 1 15.5-4.6z" /><path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 1a4 4 0 0 1-2.4-2.4l1-1-1-2z" /></svg>
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="menu-principal" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      </div>
    </header>
  )
}

const statIcons = {
  'Empresas del grupo': <><path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6M9 11h.01M15 11h.01" /></>,
  Colaboradores: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>,
  'Áreas centralizadas': <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  'Años consolidando': <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 15h3" /></>,
  Departamentos: <><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-4h12v4" /></>,
  Países: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  default: <circle cx="12" cy="12" r="8" />,
}

function Stat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const [animate] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window)
  const [shown, setShown] = useState(animate ? 0 : value)
  const [inView, setInView] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setInView(true)
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 1400, 1)
        setShown(Math.round(value * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [animate, value])

  return (
    <div className={`stat${inView ? ' is-in' : ''}`} ref={ref}>
      <span className="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{statIcons[label] ?? statIcons.default}</svg></span>
      <strong aria-label={`${value}${suffix}`}>{pad(shown)}{suffix}</strong>
      <span className="stat-label">{label}</span>
      <span className="stat-bar" aria-hidden="true" />
    </div>
  )
}

function SectionLabel({ number, children }) {
  return <div className="section-label reveal"><span>{number}</span><span>{children}</span></div>
}

function BackToTop({ home = true }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      href={home ? '#inicio' : `${B}?intro`}
      aria-label="Subir al inicio"
      tabIndex={visible ? undefined : -1}
      onClick={(event) => {
        if (!home) return
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'instant' })
        window.dispatchEvent(new Event('cap:intro'))
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </a>
  )
}

export function Footer({ home = true }) {
  return (
    <footer className="footer">
      <a
        className="footer-top"
        href={home ? '#inicio' : `${B}?intro`}
        aria-label="Subir al inicio"
        onClick={(event) => {
          if (!home) return
          event.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>
      <div className="footer-inner wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img decoding="async" src={B + 'logos/cap-blanco.png'} alt="Grupo CAP" width="130" height="55" loading="lazy" />
        <ul className="social-links" style={{ gap: 24 }}>
          <li><a href={contact.instagram} {...external} aria-label="Instagram de Grupo CAP" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 28, height: 28, color: '#fff' }}><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" fill="none" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="currentColor" fill="none" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></a></li>
          <li><a href={contact.facebook} {...external} aria-label="Facebook de Grupo CAP" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 28, height: 28, color: '#fff' }}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg></a></li>
          <li><a href={contact.tiktok} {...external} aria-label="TikTok de Grupo CAP" title="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 28, height: 28, color: '#fff' }}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg></a></li>
          <li><a href={contact.whatsapp} {...external} aria-label="WhatsApp de Grupo CAP" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 28, height: 28, color: '#fff' }}><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" stroke="currentColor" fill="none" strokeWidth="1.5" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.5 4.5 0 0 1-2.1-2.1l.9-1-1-2.2z" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg></a></li>
        </ul>
        <span style={{ color: '#fff', fontSize: 14 }}>© {new Date().getFullYear()} Grupo Empresarial CAP</span>
      </div>
      <style>{`
        footer .social-links { gap: 24px !important; }
        footer .social-links a { width: auto !important; height: auto !important; border: none !important; padding: 0 !important; display: flex; align-items: center; justify-content: center; background: transparent !important; }
        footer .social-links svg { width: 28px !important; height: 28px !important; }
        footer .social-links a:hover { background: transparent !important; transform: none !important; opacity: 0.7; }
      `}</style>
      <p className="footer-notice">{footerNotice}</p>
      <nav className="footer-legal" aria-label="Documentos legales">
        <a href={B + privacyPolicy.slug}>Política de privacidad</a>
        <a href={B + privacyNotice.slug}>Aviso de privacidad</a>
      </nav>
    </footer>
  )
}

const requestTypes = ['Cliente o taller', 'Flota corporativa', 'Institución pública', 'Proveedor o marca', 'Alianza o inversión']

// Ventana "Solicitar información": envía por WhatsApp de la empresa elegida o por correo. No incluye nombre, teléfono ni correo en el mensaje.
function RequestDialog({ open, onClose, initialType }) {
  const [type, setType] = useState(initialType ?? requestTypes[0])
  const [companySlug, setCompanySlug] = useState('')
  const [detail, setDetail] = useState('')
  const [consent, setConsent] = useState(false)
  const company = companies.find((item) => item.slug === companySlug)
  const whatsappBase = (company?.socials?.whatsapp ?? contact.whatsapp).split('?')[0]
  const email = company?.contact?.email ?? contact.email
  const message = `Hola. Visité el sitio de Grupo CAP y deseo información${company ? ` de ${company.name}` : ''} sobre: ${type}.${detail.trim() ? ` ${detail.trim()}` : ''}`
  const ready = consent && type

  useEffect(() => {
    if (!open) return
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="request-overlay" role="dialog" aria-modal="true" aria-labelledby="request-title" onClick={onClose}>
      <div className="request-dialog" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="request-close" onClick={onClose} aria-label="Cerrar">×</button>
        <form className="request-form" onSubmit={(event) => event.preventDefault()}>
          <h2 id="request-title">Solicitar información</h2>
          <p className="request-note">No incluya datos personales en el detalle. WhatsApp mostrará su número a la empresa elegida.</p>
          <fieldset className="request-types">
            <legend>Soy…</legend>
            {requestTypes.map((option) => (
              <button type="button" key={option} className={option === type ? 'is-active' : ''} aria-pressed={option === type} onClick={() => setType(option)}>{option}</button>
            ))}
          </fieldset>
          <label className="request-field">
            <span>Empresa del grupo de interés</span>
            <select value={companySlug} onChange={(event) => setCompanySlug(event.target.value)}>
              <option value="">Aún no sé — oriéntenme</option>
              {companies.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
          <label className="request-field">
            <span>¿Qué necesita? <em>(opcional)</em></span>
            <textarea rows={4} value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="Ej.: cotización de filtros y lubricantes para 20 unidades" />
          </label>
          <label className="request-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>Acepto que Grupo CAP use mis datos para responder a esta solicitud, según el <a href={B + privacyNotice.slug} target="_blank" rel="noreferrer">aviso de privacidad</a>.</span>
          </label>
          <div className="request-actions">
            <a className={`button button-red${ready ? '' : ' is-disabled'}`} href={ready ? `${whatsappBase}?text=${encodeURIComponent(message)}` : undefined} aria-disabled={!ready} {...external}>Enviar solicitud <span aria-hidden="true">↗</span></a>
            <a className={`button button-outline${ready ? '' : ' is-disabled'}`} href={ready ? `mailto:${email}?subject=${encodeURIComponent(`Consulta: ${type}`)}&body=${encodeURIComponent(message)}` : undefined} aria-disabled={!ready}>Prefiero correo</a>
          </div>
          <p className="request-small">Al enviar, la solicitud se dirige a la empresa elegida con el texto que usted escribió. No se incluyen su nombre, teléfono ni correo.</p>
        </form>
        <aside className="request-side">
          <ul className="request-channels">
            <li><span>WhatsApp corporativo</span><a href={contact.whatsapp} {...external}>{contact.phone}</a></li>
            <li><span>Escríbanos</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><span>Horario</span>{contact.hours}</li>
          </ul>
          <h3>Directorio de empresas</h3>
          <ul className="request-directory">
            {companies.filter((item) => item.contact?.phone).map((item) => (
              <li key={item.slug}><span>{item.name}</span><a href={telHref(item.contact.phone)}>{item.contact.phone}</a></li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

// Barra de progreso de lectura y parallax suave del hero. Solo en escritorio y sin movimiento reducido.
function useScrollFX() {
  useEffect(() => {
    if (reducedMotion()) return
    const bar = document.createElement('div')
    bar.className = 'scroll-progress'
    bar.setAttribute('aria-hidden', 'true')
    document.body.appendChild(bar)
    const hero = document.querySelector('.hero')
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      if (hero && window.innerWidth > 960) hero.style.setProperty('--shift', `${Math.max(-220, -window.scrollY * 0.25).toFixed(1)}px`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      bar.remove()
    }
  }, [])
}

// Mapa de presencia nacional: pines sobre el contorno de Honduras, con la ciudad activa resaltada.
function CoverageZones() {
  const [active, setActive] = useState(0)
  const hub = zones.find((zone) => zone.hub)
  return (
    <section className="zones-section" id="zonas">
      <div className="wrap zones">
        <div className="zones-intro reveal">
          <span className="mini-label">Presencia nacional</span>
          <h3>Zonas de cobertura</h3>
          <p>Nuestras empresas operan a lo largo de todo Honduras, con infraestructura distribuida para garantizar presencia y servicio en las principales ciudades del país.</p>
          <ul className="zones-list">
            {zones.map((zone, index) => (
              <li key={zone.city} tabIndex={0} className={index === active ? 'is-active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
                <b>{pad(index + 1)}</b>
                <strong>{zone.city}</strong>
                <span>{zone.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="zones-map reveal" aria-hidden="true">
          <img className="zones-shape-img" src={mapaHonduras} alt="" width="682" height="343" decoding="async" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                        {zones.filter((zone) => !zone.hub).map((zone) => (
              <line key={zone.city} x1={hub.x} y1={hub.y} x2={zone.x} y2={zone.y} className={zones[active] === zone ? 'is-active' : ''} />
            ))}
          </svg>
          {zones.map((zone, index) => (
            <span key={zone.city} className={`zone-pin${zone.hub ? ' is-hub' : ''}${zone.side === 'left' ? ' is-left' : ''}${index === active ? ' is-active' : ''}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }}>
              <i />
              <span>{zone.city}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Cinta de imágenes con movimiento continuo; al entrar en pantalla las imágenes estallan desde el centro.
function ImageRibbon() {
  const items = [...operationPhotos.map((photo) => ({ src: photo.src, alt: photo.caption, caption: photo.caption })), { src: motorCap, alt: 'Motor ilustrativo', caption: 'Venta de los mejores repuestos' }]
  return (
    <div className="ribbon reveal" role="region" aria-label="Imágenes de la operación">
      <div className="ribbon-track">
        {[...items, ...items].map((item, index) => (
          <figure key={index} className="ribbon-item" style={{ '--i': index % items.length, '--dir': index % 2 ? 1 : -1 }} aria-hidden={index >= items.length || undefined}>
            <img decoding="async" src={item.src} {...imageDims(item.src)} alt={index < items.length ? item.alt : ''} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function HomePage() {
  const [requestType, setRequestType] = useState(null)
  useReveal('home')
  useScrollFX()
  useEffect(() => { setPageMeta(...seo.home) }, [])

  return (
    <div className="site-shell">
      <Header />
      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-content">
            <div className="eyebrow-spacer" />
            <h1><Words><em>Crecer</em> y ayudar a crecer a quienes hacen posible nuestra historia.</Words></h1>
            <p className="hero-byline">Grupo Empresarial CAP Honduras</p>
          </div>
        </section>
        <div className="hero-cta hero-cta-below">
          <div className="hero-actions hero-actions-left">
            <a className="button button-red" href="#empresas">Ver nuestras empresas <span aria-hidden="true">↓</span></a>
            <a className="button button-ghost" href="#contacto">Contactar al equipo <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <section className="light-section" id="cobertura" style={{ paddingTop: 24, paddingBottom: 0, backgroundImage: 'none' }}>
          <div className="section wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <dl className="coverage-totals reveal">
              {operationTotals.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><CountUp value={value} /></dd></div>)}
            </dl>
          </div>
        </section>

        <section className="ecosystem wrap" id="ecosistema">
          <div className="ecosystem-head">
            <div className="reveal">
              <span className="ecosystem-eyebrow">Ecosistema integral</span>
              <h2 className="display"><Words>Un solo grupo para toda la <em>cadena automotriz.</em></Words></h2>
            </div>
            <p className="reveal">Cada empresa cubre una etapa de la cadena. Juntas acompañan el proceso desde la importación hasta la venta y el servicio.</p>
          </div>
          <ol className="ecosystem-steps reveal">
            {ecosystemSteps.map(([title, companiesText], index) => (
              <li key={title} className="ecosystem-step reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <span className="ecosystem-dot" aria-hidden="true" />
                <span className="ecosystem-num">{pad(index + 1)}</span>
                <strong>{title}</strong>
                <small>{companiesText.split(' · ').map((name) => <span key={name}>{name}</span>)}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="section wrap" id="empresas" style={{ paddingTop: 40, paddingBottom: 0 }}>
          <div className="section-heading reveal" style={{ marginBottom: 32 }}><h2 className="display"><Words>Nuestras empresas.<br /><em>Una misma visión.</em></Words></h2><p className="justified-text">Conozca nuestras empresas de autopartes, servicio automotriz y renta de maquinaria. Seleccione una para consultar qué ofrece y cómo contactarla.</p></div>
          <CompanyCards />
        </section>

        <section className="section wrap" id="nosotros">
          <h2 className="display" style={{ marginBottom: 0, textAlign: 'left' }}>Quiénes <em>somos</em></h2>
          <div className="about-grid">
            <div className="about-text reveal">
              <p className="justified-text">{group.lead}</p>
              {group.traits.map((paragraph) => <p key={paragraph} className="justified-text">{paragraph}</p>)}
              <a href={B + 'nosotros-completo'} className="button button-red">Ver más <span aria-hidden="true">→</span></a>
            </div>
            <figure className="about-media reveal">
              <img src={B + 'images/equipo-siete-cap.webp'} alt="Equipo de Grupo CAP frente al logo de la empresa" width="1200" height="800" loading="lazy" decoding="async" style={{ aspectRatio: '1200 / 800', objectFit: 'contain' }} />
              <figcaption><strong>160+</strong><span>Colaboradores comprometidos</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="why" id="por-que">
          <div className="why-inner">
            <div className="why-head">
              <div className="reveal">
                <span className="why-eyebrow">Por qué Grupo CAP</span>
                <h2 className="display"><Words>Construimos hoy<br />el sector de <em>mañana.</em></Words></h2>
              </div>
              <p className="reveal">Trabajar con el grupo significa resolver repuesto, instalación y entrega con un mismo interlocutor y un mismo estándar.</p>
            </div>
            <ul className="why-cards">
              {whyCards.map(([title, text], index) => (
                <li key={title} className="why-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <span className="why-icon" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" aria-hidden="true">${whyIcons[index]}</svg>` }} />
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CoverageZones />

        <section className="solutions wrap" id="soluciones">
          <div className="solutions-head">
            <div className="reveal">
              <span className="solutions-eyebrow">Soluciones por tipo de cliente</span>
              <h2 className="display"><Words>¿Cómo podemos <em>ayudarte</em>?</Words></h2>
            </div>
            <p className="reveal">Elige tu perfil y te conectamos con la empresa del grupo indicada, sin rodeos.</p>
          </div>
          <ul className="solutions-cards">
            {solutionCards.map((card, index) => (
              <li key={card.title} className="solution-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <h3>{card.title}</h3>
                <p style={{ textAlign: 'left' }}>{card.text}</p>
                <ul className="solution-list">
                  {card.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <button type="button" className="solution-link" onClick={() => setRequestType(card.requestType)}>{card.cta} <span aria-hidden="true">→</span></button>
              </li>
            ))}
          </ul>
        </section>

        <section className="ops wrap" id="operacion">
          <div className="ops-head">
            <div className="reveal">
              <span className="ops-eyebrow">Operación real</span>
              <h2 className="display"><Words>Personas, bodegas y talleres que <em>mueven Honduras.</em></Words></h2>
            </div>
            <p className="reveal">Detrás de cada entrega hay un equipo capacitado y una infraestructura propia.</p>
          </div>
          <ImageRibbon />

        </section>


        <section className="section" style={{ paddingTop: 0, paddingBottom: 48 }}>
          <div id="talento" className="careers reveal" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundImage: `linear-gradient(rgba(150, 12, 18, .8), rgba(150, 12, 18, .8)), url(${B}images/talento-fondo-cap.webp)` }}>
            <div className="careers-inner">
              <div className="careers-copy">
                <span className="careers-eyebrow">Talento CAP</span>
                <h3><Words>Crece con un grupo que impulsa la movilidad en Honduras.</Words></h3>
                <p>Buscamos personas comprometidas para ventas, bodega, taller, logística y áreas corporativas.</p>
                <ul className="careers-checks">
                  <li>Un grupo en crecimiento con siete empresas</li>
                  <li>Estrategia de desarrollo de talento humano</li>
                  <li>Postulación en línea, sin crear cuenta</li>
                </ul>
              </div>
              <div className="careers-card">
                <h4>¿Quiere formar parte de nuestro equipo?</h4>
                <p>Consulte los puestos disponibles en nuestro formulario de postulación y envíe su hoja de vida. Conozca más sobre nuestro equipo en LinkedIn.</p>
                <div className="careers-actions">
                  <a className="button button-red" href={contact.recruit} {...external}>Enviar mi postulación <span aria-hidden="true">↗</span></a>
                  <a className="button button-outline button-linkedin" href={contact.linkedin} {...external}>
                    <svg className="careers-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z" /></svg>
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                  <a className="legal-inline careers-legal" href={B + privacyNotice.slug}>Aviso de privacidad</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-grid wrap" style={{ marginTop: 80 }}>
            <figure className="contact-photo reveal">
              <span className="contact-photo-hex" aria-hidden="true" />
              <img src={B + 'images/equipo-bodega-repuestos.webp'} alt="Colaboradores de Grupo CAP atendiendo en la bodega de repuestos" width="1200" height="800" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', aspectRatio: '.866', objectFit: 'cover', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)', filter: 'none', animation: 'none' }} />
            </figure>
            <div id="contacto" className="contact-intro reveal">
              <h2 className="display"><Words>Contacte al equipo<br /><em>indicado.</em></Words></h2>
              <p>¿Necesita repuestos, servicio automotriz, renta de maquinaria o información corporativa? Indíquenos su consulta y la empresa de su interés.</p>
              <div className="hero-actions">
                <a className="button button-red" href={contact.whatsapp} {...external}>Escríbanos por WhatsApp <span aria-hidden="true">↗</span></a>
                <a className="button button-outline" href={`tel:${contact.phoneHref}`}>Llamar <span aria-hidden="true">↗</span></a>
              </div>
              <div className="contact-social"><span className="mini-label">Síganos en redes</span><SocialLinks /></div>
            </div>
            <dl className="contact-details reveal">
              <div><dt><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg></span>Llámenos</dt><dd><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></dd></div>
              <div><dt><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>Escríbanos</dt><dd><a href={`mailto:${contact.email}`}>{contact.email.split('@')[0]}@<wbr />{contact.email.split('@')[1]}</a></dd></div>
              <div><dt><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>Horario</dt><dd>{contact.hours}</dd></div>
              <div><dt><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M15 10h.01" /></svg></span>Dirección</dt><dd><a href={contact.mapsUrl} {...external}>{contact.address}</a></dd></div>
            </dl>
          </div>
          <div className="contact-request reveal">
            <button type="button" className="button button-red" onClick={() => setRequestType(requestTypes[0])}>Solicitar información <span aria-hidden="true">↗</span></button>
          </div>
          <RequestDialog key={requestType ?? 'cerrado'} open={requestType !== null} initialType={requestType ?? undefined} onClose={() => setRequestType(null)} />
        </section>

      </main>
      <Footer />
    </div>
  )
}

// Página 404: noindex y sin canonical. Se muestra para cualquier ruta que no exista en el sitio.
function NotFoundPage() {
  useEffect(() => {
    document.title = 'Página no encontrada · Grupo CAP'
    upsertTag('meta[name="robots"]', 'meta', { name: 'robots', content: 'noindex, nofollow' })
    return () => upsertTag('meta[name="robots"]', 'meta', { name: 'robots', content: 'index, follow, max-image-preview:large' })
  }, [])
  return (
    <div className="site-shell company-page">
      <Header home={false} />
      <main id="contenido">
        <section className="section wrap legal-page" style={{ paddingTop: 160 }}>
          <h1 className="display">Página no encontrada</h1>
          <p className="lead">La dirección que buscó no existe o cambió. Puede volver al inicio o revisar nuestras empresas.</p>
          <a className="button button-red" href={B}>Volver al inicio</a>
        </section>
      </main>
      <Footer home={false} />
    </div>
  )
}

export default function App() {
  return <Suspense fallback={null}><Route /></Suspense>
}

// Elige la página según la URL. Las páginas de ficha, nosotros completo y legales se cargan aparte.
function Route() {
  const route = currentRoute()
  const company = companies.find((item) => route === `/empresas/${item.slug}`)
  const legalDoc = [privacyNotice, privacyPolicy].find((doc) => route === '/' + doc.slug)
  if (legalDoc) return <LegalPage doc={legalDoc} />
  if (company) return <CompanyPage company={company} />
  if (route === '/empresas') return <CompaniesPage />
  if (route === '/nosotros-completo') return <ExpandedAboutPage />
  if (route === '') return <HomePage />
  return <NotFoundPage />
}
