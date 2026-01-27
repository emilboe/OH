import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import Versjon2 from './pages/Versjon2'
import './App.css'

function App() {
  // Use the same base URL that Vite uses for assets
  // This will be '/' in development and '/OH/' when deployed to GitHub Pages
  // React Router's basename should not have a trailing slash
  const baseUrl = import.meta.env.BASE_URL
  const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <img 
              src={`${import.meta.env.BASE_URL}olavshallen-background.png`}
              alt="Olavshallen background" 
              className="background-image"
            />
            <Chatbot />
          </div>
        } />
        <Route path="/versjon2" element={<Versjon2 />} />
      </Routes>
    </Router>
  )
}

export default App

