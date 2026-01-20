import React from 'react'
import './InfoSection.css'

const InfoSection = () => {
  const infoItems = [
    {
      title: 'Olavstorget',
      description: 'Fem kjøkken samlet i ett spisested - med 5 ulike konsept fra alle verdenshjørner.'
    },
    {
      title: 'Ciabatta',
      description: 'Bakverk, påsmurt, salater og middagsretter. Bestill bord her.'
    },
    {
      title: 'Dråpen',
      description: 'En plass med avslappet atmosfære og noe godt i glasset. Vi serverer også enkle retter som kan nytes hele dagen.'
    }
  ]

  return (
    <section className="info-section">
      <div className="info-container">
        <h2 className="section-title">Mat & drikke</h2>
        <div className="info-grid">
          {infoItems.map((item, index) => (
            <div key={index} className="info-card">
              <h3 className="info-title">{item.title}</h3>
              <p className="info-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoSection

