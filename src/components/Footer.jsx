import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Olavshallen AS</h4>
            <p className="footer-text">Kjøpmannsgata 48<br />7011 Trondheim</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Kontakt</h4>
            <p className="footer-text">E-post: billett@olavshallen.no</p>
            <p className="footer-text">Telefon: 21 95 92 00</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Kundeservice</h4>
            <p className="footer-text">Spørsmål om billetter og billettkjøp?</p>
            <p className="footer-text">Kontakt Eventim:<br />kundeservice@eventim.no</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 Olavshallen AS. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

