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
        <section className="section wrap" id="nosotros-expanded" style={{ paddingTop: 100 }}>
          <a href={B + '#nosotros'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 50, color: 'var(--red)', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>←</span> Volver
          </a>

          <h1 className="display" style={{ marginBottom: 40, textAlign: 'center' }}>Quiénes <em>somos</em></h1>

          <div className="about-heading reveal" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: 0, marginBottom: 0, marginTop: 0 }}>
            <div>
              <p className="lead justified-text" style={{ maxWidth: 'none', marginBottom: 0 }}>{group.lead.split('Centro de Servicios Compartidos').map((part, index) => index ? <span key={index}><strong>Centro de Servicios Compartidos</strong>{part}</span> : part)}</p>
            </div>
          </div>

          <div className="purpose" style={{ marginTop: 16, paddingTop: 0 }}>
            <div className="mission-grid">
              <article className="reveal"><span className="mini-label">Nuestra misión</span><p style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'none', WebkitHyphens: 'none' }}>{group.mission}</p></article>
              <article className="reveal"><span className="mini-label">Nuestra visión</span><p style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'none', WebkitHyphens: 'none' }}>{group.vision}</p></article>
            </div>
            <blockquote className="belief reveal"><p><em>Crecer y ayudar a crecer</em> a quienes hacen posible nuestra historia.</p></blockquote>
            <figure className="purpose-photo reveal"><img src={B + 'images/colaboradora.png'} alt="Colaboradora de Grupo CAP con tableta en mano" width="321" height="447" loading="lazy" decoding="async" /></figure>
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
