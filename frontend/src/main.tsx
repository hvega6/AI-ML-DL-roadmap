import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { ParticleProvider } from './context/ParticleContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ParticleProvider>
        <App />
      </ParticleProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
