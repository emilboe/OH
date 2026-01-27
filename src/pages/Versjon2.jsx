import React from 'react'
import Chatbot from '../components/Chatbot'
import '../App.css'

function Versjon2() {
  return (
    <div className="App">
      <img 
        src={`${import.meta.env.BASE_URL}olavshallen-background.png`}
        alt="Olavshallen background" 
        className="background-image"
      />
      <Chatbot lockedDesign={2} lockedButtonStyle={2} />
    </div>
  )
}

export default Versjon2

