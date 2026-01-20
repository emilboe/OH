import React from 'react'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  return (
    <div className="App">
      <img 
        src={`${import.meta.env.BASE_URL}olavshallen-background.png`}
        alt="Olavshallen background" 
        className="background-image"
      />
      <Chatbot />
    </div>
  )
}

export default App

