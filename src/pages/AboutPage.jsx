import { useEffect } from 'react'
import { B, Footer, Header, Words, imageDims, pad, pillarIcons, setPageMeta, useReveal } from '../App'
import { group, milestones, pillars, seo, showTimeline } from '../data'

export function ExpandedAboutPage() {
  useReveal('about-expanded')
  useEffect(() => { setPageMeta(...seo.about) }, [])

  return (
    <div className="site-shell company-page">
      <Header home={false} />
      <main id="contenido">
        <section className="section wrap" id="nosotros-expanded" style={{ paddingTop: 66 }}>
          <div className="about-dark" style={{ '--panel-photo': `url(${B}images/taller-fondo.webp)`, backgroundImage: `linear-gradient(135deg, rgba(20, 20, 20, .9) 0%, rgba(20, 20, 20, .8) 55%, rgba(31, 10, 12, .9) 100%), url(${B}images/taller-fondo.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <a href={B + '#nosotros'} className="about-back" style={{ position: 'absolute', top: 24, left: 'var(--pad-x)', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 999, background: 'rgba(255, 255, 255, .94)', color: 'var(--red)', textDecoration: 'none', fontWeight: 700, fontSize: 14, boxShadow: '0 10px 24px -12px rgba(0, 0, 0, .5)' }}>
            <span style={{ fontSize: 18 }}>←</span> Volver
          </a>
          <div className="about-top">
            <h1 className="display about-title">Quiénes <em>somos</em></h1>
            <img className="about-top-logo" src={B + 'logos/cap-blanco.png'} alt="Grupo CAP" width="112" height="47" />
          </div>

          <div className="about-heading reveal" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: 0, marginBottom: 0, marginTop: 0 }}>
            <div>
              <p className="lead justified-text" style={{ maxWidth: 'none', marginBottom: 0, textAlign: 'left' }}>{group.lead.split('Centro de Servicios Compartidos').map((part, index) => index ? <span key={index}><strong>Centro de Servicios Compartidos</strong>{part}</span> : part)}</p>
            </div>
          </div>

          <div className="purpose" style={{ marginTop: 16, paddingTop: 0 }}>
            <div className="mission-grid">
              <article className="reveal"><div className="pillar-head"><span className="pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V11M10 20V6M16 20v-6M3 16l6-6 4 3 7-7"/><path d="M15 6h5v5"/></svg></span><span className="mini-label">Nuestra misión</span></div><span className="pillar-rule" aria-hidden="true" /><h3 className="pillar-title">Impulsamos el crecimiento</h3><p style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'none', WebkitHyphens: 'none' }}>{group.mission}</p></article>
              <article className="reveal"><div className="pillar-head"><span className="pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></span><span className="mini-label">Nuestra visión</span></div><span className="pillar-rule" aria-hidden="true" /><h3 className="pillar-title">Ser referentes en Honduras</h3><p style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'none', WebkitHyphens: 'none' }}>{group.vision}</p></article>
              <figure className="purpose-photo reveal"><img src={B + 'images/colaboradora.png'} alt="Colaboradora de Grupo CAP con tableta en mano" width="321" height="447" loading="lazy" decoding="async" /><figcaption>Personas que dejan huella</figcaption></figure>
            </div>
            <blockquote className="belief reveal" style={{ backgroundImage: `linear-gradient(120deg, rgba(178, 30, 37, .88) 0%, rgba(90, 10, 14, .8) 100%), url(${B}images/carretera-fondo.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}><p>“Trabajar con excelencia, Creciendo juntos y Dejando huella.”</p><span className="belief-tag">El espíritu CAP</span></blockquote>
          </div>
          </div>
        </section>

        {showTimeline && (
        <section className="timeline" style={{ paddingTop: 0, marginTop: -60 }}>
          <div className="section wrap">
            <div className="section-heading reveal"><h2 className="display" style={{ hyphens: 'none', WebkitHyphens: 'none', overflowWrap: 'break-word' }}><Words>Nuestra<br /><em>trayectoria</em></Words></h2><p>Conozca los principales hitos de las empresas que forman Grupo CAP.</p></div>
            <ol className="timeline-list">{milestones.map(([year, title, text, logos]) => <li className="reveal" key={year}><span className="timeline-year">{year}</span><span className="timeline-logos">{logos.map(([name, src]) => <span className="timeline-logo" key={name} title={name}><img decoding="async" src={src} {...imageDims(src)} alt={name} loading="lazy" /></span>)}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </div>
        </section>
        )}

        <section className="dark-section" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div className="wrap">
            <h2 className="display" style={{ marginBottom: 40, color: '#fff', textAlign: 'center' }}>Pilares de <em>Grupo CAP</em></h2>
            <p style={{ fontSize: 18, color: '#fff', textAlign: 'center', marginBottom: 60 }}>Cinco pilares que convierten nuestra visión en decisiones, acciones y resultados.</p>
          <div className="pillar-hive">
            <div className="hex hex-core reveal"><div className="hex-inner"><img decoding="async" src={B + 'logos/cap.png'} alt="Grupo CAP" width="900" height="378" /></div></div>
            {pillars.map(([title, text], index) => (
              <article className={`hex hex-pillar hex-pos-${index + 1} reveal`} key={title}>
                <div className="hex-inner">
                  <span className="pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{pillarIcons[index]}</svg></span>
                  <span className="pillar-step">{pad(index + 1)}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="future" style={{ minHeight: 400, paddingBottom: 0, marginBottom: 0 }}>
          <img className="future-image" src={B + 'images/equipo-muro-cap.webp'} alt="" width="1200" height="544" loading="lazy" decoding="async" />
          <div className="future-copy wrap reveal">
            <h3 style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '1.4px', textTransform: 'uppercase', margin: '0 0 18px' }}>Visión de futuro</h3>
            <h2 className="display"><Words>Construimos hoy<br />el sector de <em>mañana.</em></Words></h2>
            <p className="justified-text">Impulsamos la mejora de nuestros procesos, el desarrollo de nuestro equipo y el uso de tecnología para fortalecer el servicio a nuestros clientes.</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
