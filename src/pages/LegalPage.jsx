import { useEffect } from 'react'
import { B, Footer, Header, setPageMeta, useReveal } from '../App'

// Convierte [texto](url) en enlaces dentro de los textos legales.
function withLinks(text) {
  return text.split(/(\[[^\]]+\]\(https?:[^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((https?:[^)]+)\)$/)
    return match ? <a key={index} href={match[2]}>{match[1]}</a> : part
  })
}

export function LegalPage({ doc }) {
  useReveal(doc.slug)
  useEffect(() => { setPageMeta(`${doc.title} · Grupo CAP`, doc.intro) }, [doc])

  return (
    <div className="site-shell company-page">
      <Header home={false} />
      <main id="contenido">
        <section className="section wrap legal-page" style={{ paddingTop: 120 }}>
          <a className="back-link" href={B}><span aria-hidden="true">←</span> Volver al inicio</a>
          <h1 className="display">{doc.title}</h1>
          <p className="lead">{doc.intro}</p>
          {doc.sections.map((section) => (
            <div className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{withLinks(paragraph)}</p>)}
            </div>
          ))}
          <p className="legal-updated">Última actualización: {doc.updated}</p>
        </section>
      </main>
      <Footer home={false} />
    </div>
  )
}
