import React, { useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [currentEvent, setCurrentEvent] = useState(0)
  
  const events = [
    {
      title: 'Jonas Fjeld',
      subtitle: 'Setter bagen fra seg',
      date: '2026 lør. 17.10',
      time: 'Kl. 19:00'
    },
    {
      title: 'Gutten som ikke ble ammet',
      date: 'fre. 27.02',
      time: 'Kl. 19:00',
      image: 'https://www.olavshallen.no/imager/bilder/forestillinger/31589050/Ronny_eacca7fea1f889e5620a289f2891a9a3.jpg'
    },
    {
      title: 'Marsalis & De Falla',
      subtitle: '– liflige trompettoner og fyrrige spanske rytmer',
      date: 'tor. 22.01',
      time: 'Kl. 19:00'
    }
  ]

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text-section">
            <div className="hero-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <h1 className="hero-title">{events[currentEvent].title}</h1>
            {events[currentEvent].subtitle && (
              <p className="hero-subtitle">{events[currentEvent].subtitle}</p>
            )}
            <p className="hero-date">{events[currentEvent].date}</p>
            <p className="hero-time">{events[currentEvent].time}</p>
            <button className="btn-gavekort">Kjøp gavekort</button>
          </div>
          <div className="hero-image-section">
            <div className="event-image-card">
              <div className="event-image-placeholder">
                <img src={events[currentEvent].image} alt={events[currentEvent].title} />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-navigation">
          <button className="nav-arrow nav-arrow-left" onClick={prevEvent} aria-label="Forrige">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-arrow nav-arrow-right" onClick={nextEvent} aria-label="Neste">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

