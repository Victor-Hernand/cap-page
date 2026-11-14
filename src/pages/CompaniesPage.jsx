import { useEffect } from 'react'
import { B, Footer, Header, companyUrl, imageDims, setPageMeta, useReveal } from '../App'
import { companies } from '../data'

// Página índice de las empresas del grupo: /empresas. Responde a búsquedas como «empresas Grupo CAP».
export function CompaniesPage() {
  useReveal('empresas-index')
  useEffect(() => {
    setPageMeta(
      'Empresas del Grupo CAP | Autopartes y servicio en Honduras',
      'Conozca las siete empresas de Grupo CAP en Honduras: autopartes al por mayor y al detalle, servicio automotriz, logística y renta de maquinaria.',
    )
  }, [])

  return (
    <div className="site-shell company-page">
      <Header home={false} />
      <main id="contenido">
        <section className="section wrap legal-page" style={{ paddingTop: 120 }}>
          <a className="back-link" href={B}><span aria-hidden="true">←</span> Volver al inicio</a>
          <span className="mini-label">Grupo Empresarial CAP</span>
          <h1 className="display">Empresas del grupo</h1>
          <p className="lead">
            Siete empresas que trabajan con una dirección corporativa común en Honduras: autopartes al por mayor y al detalle,
            servicio automotriz, logística y renta de maquinaria.
          </p>
          <ul className="others-grid">
            {companies.map((company) => (
              <li key={company.slug}>
                <a href={companyUrl(company)}>
                  <span className="others-logo"><img src={company.logo} alt="" {...imageDims(company.logo)} loading="lazy" decoding="async" /></span>
                  <span><strong>{company.name}</strong><small>{company.type}</small></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer home={false} />
    </div>
  )
}
