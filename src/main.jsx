import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// /login no es un portal: se redirige a la sección de empresas de la portada.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
if (window.location.pathname.replace(/\/$/, '') === base + '/login') window.location.replace(import.meta.env.BASE_URL + '#empresas')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
