import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import Versjon2 from './pages/Versjon2'
import './App.css'

function App() {
  return (
    <Router>
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

