import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-logo">
          <h1 className="logo-text">Olavshallen</h1>
        </div>
        <div className="nav-actions">
          <button className="nav-button">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Åpningstider & info</span>
          </button>
          <button className="nav-button">
            <span>Meny</span>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="19" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="3" y="11" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="11" width="6" height="6" fill="currentColor"/>
              <rect x="19" y="11" width="6" height="6" fill="currentColor"/>
              <rect x="3" y="19" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="19" width="6" height="6" fill="currentColor"/>
              <rect x="19" y="19" width="6" height="6" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header

