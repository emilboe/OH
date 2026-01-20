import React from 'react'
import './Events.css'

const Events = () => {
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
      time: 'Kl. 19:00'
    },
    {
      title: 'Marsalis & De Falla',
      subtitle: '– liflige trompettoner og fyrrige spanske rytmer',
      date: 'tor. 22.01',
      time: 'Kl. 19:00'
    }
  ]

  return (
    <section className="events-section">
      <div className="events-container">
        <h2 className="section-title">Kommende arrangement</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              {event.subtitle && <p className="event-subtitle">{event.subtitle}</p>}
              <p className="event-date">{event.date}</p>
              <p className="event-time">{event.time}</p>
              <a href="#" className="btn-ticket">Billetter</a>
            </div>
          ))}
        </div>
        <div className="events-footer">
          <a href="#" className="link-see-all">Se hele programmet →</a>
        </div>
      </div>
    </section>
  )
}

export default Events

