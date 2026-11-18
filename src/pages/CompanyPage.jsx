import { useEffect } from 'react'
import { B, Footer, Header, SITE, SocialLinks, Words, companySocials, companyUrl, defaultShareImage, external, imageDims, mapsHref, setPageMeta, shareImages, telHref, useReveal } from '../App'
import { companies, contact, seo, showCompanyMissionVision } from '../data'

// Datos estructurados (schema.org) por empresa. Tipo por defecto: tienda de autopartes.
const companySchemaType = { 'tecnicentro-didasa': 'AutoRepair', 'soluciones-marlons': 'EquipmentRental', 'cap-logistics': 'LocalBusiness' }
// Horario de todas las empresas: lunes a viernes de 8:00 a 17:00. Sábados: 8:00 a la hora indicada por empresa.
const companyHours = [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }]
const companySaturdayHours = {
  'inversiones-sm': '12:00',
  'distribuidora-mansiago': '12:00',
  'auto-repuestos-blessing': '16:00',
  'tecnicentro-didasa': '14:00',
  'japan-hn': '12:00',
  'cap-logistics': '12:00',
  'soluciones-marlons': '12:00',
}
const openingHoursFor = (slug) => (companySaturdayHours[slug] ? [...companyHours, { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: companySaturdayHours[slug] }] : companyHours)
const companyJsonLd = (company) => {
  const contactInfo = company.contact ?? {}
  const phoneDigits = contactInfo.phone?.replace(/\D/g, '')
  const sameAs = [company.website, ...Object.values(company.socials ?? {}).filter((url) => !url.includes('wa.me'))].filter(Boolean)
  return {
    '@type': companySchemaType[company.slug] ?? 'AutoPartsStore',
    '@id': `${SITE}${companyUrl(company)}#empresa`,
    name: company.name,
    url: `${SITE}${companyUrl(company)}`,
    description: company.text,
    parentOrganization: { '@type': 'Organization', name: 'Grupo Empresarial CAP', url: `${SITE}/` },
    ...(phoneDigits && { telephone: `+504${phoneDigits}` }),
    ...(contactInfo.email && { email: contactInfo.email }),
    ...(contactInfo.address && { address: { '@type': 'PostalAddress', streetAddress: contactInfo.address, addressCountry: 'HN' } }),
    openingHoursSpecification: openingHoursFor(company.slug),
    ...(sameAs.length && { sameAs }),
  }
}
// Inserta un bloque JSON-LD en <head> mientras el componente esté montado.
function useJsonLd(id, data) {
  const json = JSON.stringify(data)
  useEffect(() => {
    document.getElementById(id)?.remove()
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    el.textContent = json
    document.head.appendChild(el)
    return () => el.remove()
  }, [id, json])
}

export function CompanyPage({ company }) {
  useReveal(company.slug)
  useJsonLd('ld-company', {
    '@context': 'https://schema.org',
    '@graph': [
      companyJsonLd(company),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Empresas', item: `${SITE}/#empresas` },
          { '@type': 'ListItem', position: 3, name: company.name, item: `${SITE}${companyUrl(company)}` },
        ],
      },
    ],
  })
  useEffect(() => { setPageMeta(...(seo.companies[company.slug] ?? [`${company.name} · Grupo CAP`, company.text]), shareImages[company.slug] ?? defaultShareImage) }, [company])
  const others = companies.filter((item) => item.slug !== company.slug)

  return (
    <div className="site-shell company-page">
      <Header home={false} />
      <main id="contenido">
        <section className="detail-hero">
          <div className="detail-hero-inner wrap">
            <div className="detail-copy reveal">
              <a className="back-link" href={B + '#empresas'}><span aria-hidden="true">←</span> Ver todas las empresas</a>
              <p className="eyebrow">Empresa del Grupo CAP</p>
              <h1><Words>{company.name}</Words></h1>
              <p className="detail-type">{company.type}</p>
              {!company.description && <p style={{ fontWeight: 600 }}>{company.text}</p>}
              <div className="hero-actions">
                {company.website && <a className="button button-dark" href={company.website} {...external}>Visitar sitio oficial <span aria-hidden="true">↗</span></a>}
                {company.contact?.email && <a className="button button-red" href={`mailto:${company.contact.email}?subject=${encodeURIComponent(`Cotización - ${company.name}`)}`}>Contáctanos por correo <span aria-hidden="true">↗</span></a>}
                {company.socials?.whatsapp && <a className="button button-red" href={company.socials.whatsapp} {...external}>Contáctanos por WhatsApp <span aria-hidden="true">↗</span></a>}
              </div>
              {company.socials && <div className="detail-social"><span className="mini-label">Síganos</span><SocialLinks className="is-dark" links={company.socials} owner={company.name} networks={companySocials} email={null} /></div>}
            </div>
            <div className="detail-logo reveal"><img decoding="async" src={company.logo} {...imageDims(company.logo)} alt={`Logo de ${company.name}`} /></div>
          </div>
          <div className="wrap">
            <dl className="detail-summary">
              <div><dt>Parte de</dt><dd>Grupo Empresarial CAP</dd></div>
              <div><dt>Cobertura</dt><dd>{company.coverage}</dd></div>
              <div><dt>Unidad</dt><dd>{company.unit}</dd></div>
            </dl>
          </div>
        </section>

        {company.description && (
          <section className="section wrap detail-profile-section">
            <div className={`detail-profile${company.infrastructure ? '' : ' is-single'}`}>
              <div className="reveal">
                <p className="lead justified-text">{company.description}</p>
                <span className="mini-label">{company.highlightsTitle}</span>
                <ul className="check-list">{company.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              {company.infrastructure && (
                <div className="reveal">
                  <span className="mini-label">Infraestructura</span>
                  <ul className="infra-cards">{company.infrastructure.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}</ul>
                </div>
              )}
            </div>
            {showCompanyMissionVision && company.mission && (
              <div className="mission-grid">
                <article className="reveal"><span className="mini-label">Misión</span><p>{company.mission}</p></article>
                <article className="reveal"><span className="mini-label">Visión</span><p>{company.vision}</p></article>
              </div>
            )}
            {company.list && (
              <div className="detail-list reveal">
                <span className="mini-label">{company.listTitle}</span>
                <ul className="tag-list">{company.list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
            <div className="detail-contact-card reveal">
              <div>
                <span className="mini-label">{company.contact.address ? 'Visítenos' : 'Contáctenos'}</span>
                {company.contact.address && <address>{company.contact.address}</address>}
                <p className="contact-meta"><a href={telHref(company.contact.phone)}>Tel. {company.contact.phone}</a><a href={`mailto:${company.contact.email}`}>{company.contact.email.split('@')[0]}@<wbr />{company.contact.email.split('@')[1]}</a></p>
              </div>
              {company.contact.address
                ? <a className="button button-light" href={company.contact.mapsUrl ?? mapsHref(company.contact.address)} {...external}>Cómo llegar <span aria-hidden="true">↗</span></a>
                : <a className="button button-light" href={company.website} {...external}>Visitar sitio <span aria-hidden="true">↗</span></a>}
            </div>
          </section>
        )}


      </main>
      <Footer home={false} />
    </div>
  )
}
