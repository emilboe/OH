import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [messages, setMessages] = useState([
    { 
      text: 'Vennligst ikke del sensitiv informasjon som passord, personnummer, bankkortdetaljer eller annen personlig informasjon i denne chatten.', 
      sender: 'bot', 
      isDisclaimer: true 
    },
    { text: 'Hei! Jeg er en AI-assistent. Hvordan kan jeg hjelpe deg i dag?', sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [currentDesign, setCurrentDesign] = useState(2)
  const [currentIcon, setCurrentIcon] = useState(2)
  const [currentButtonStyle, setCurrentButtonStyle] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const themes = [
    { id: 1, name: 'Mørk', description: 'Dark mode', icon: '🌙' },
    { id: 2, name: 'Moderne', description: 'Gradient med border', icon: '⚡' },
    { id: 3, name: 'Lys', description: 'Minimalistisk', icon: '☀️' }
  ]

  const iconOptions = [
    { id: 1, name: 'Smilechat', file: 'smilechat.svg' },
    { id: 2, name: 'Olav', file: 'olavicon_6.svg' },
    { id: 3, name: 'Blob smile', file: 'smilechatblob.svg' }
  ]

  const buttonStyles = [
    { id: 1, name: 'Default', type: 'default' },
    { id: 2, name: 'Blobs', file: 'Blobs.svg' },
    { id: 3, name: 'Circle', type: 'circle' }
  ]

  const getAIIcon = (className = "chatbot-icon") => {
    const selectedIcon = iconOptions.find(icon => icon.id === currentIcon)
    return (
      <img 
        src={`${import.meta.env.BASE_URL}${selectedIcon.file}`}
        alt="AI Assistant" 
        className={className}
      />
    )
  }

  const getRobotIcon = () => {
    return getAIIcon("chatbot-icon")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const botResponses = [
    'Takk for din melding! Hvordan kan jeg hjelpe deg videre?',
    'Jeg forstår. La meg hjelpe deg med det.',
    'Interessant! Fortell meg mer om hva du trenger hjelp med.',
    'Jeg kan hjelpe deg med billetter, åpningstider eller generelle spørsmål. Hva lurer du på?',
    'Takk for at du kontakter oss. Hva kan jeg hjelpe deg med?',
    'Vi har mange spennende arrangementer. Er det noe spesifikt du lurer på?'
  ]

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = { text: inputValue, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }])
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleThemeChange = (themeId) => {
    setCurrentDesign(themeId)
  }

  const handleIconChange = (iconId) => {
    setCurrentIcon(iconId)
  }

  const handleButtonStyleChange = (styleId) => {
    setCurrentButtonStyle(styleId)
  }

  return (
    <>
      <div className={`chatbot-container design-${currentDesign}`}>
        {/* Selectors - Above chatbox */}
        <div className="selectors-above">
          {/* Theme Selector */}
          <p>Testing </p>
          <div className="theme-list">
            {themes.map(theme => (
              <button
                key={theme.id}
                className={`theme-button ${currentDesign === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
                aria-label={`Velg ${theme.name} tema`}
                title={theme.description}
              >
                <span className="theme-icon">{theme.icon}</span>
              </button>
            ))}
          </div>
          
          {/* Icon Selector */}
          <div className="theme-list">
            {iconOptions.map(icon => (
              <button
                key={icon.id}
                className={`theme-button ${currentIcon === icon.id ? 'active' : ''}`}
                onClick={() => handleIconChange(icon.id)}
                aria-label={`Velg ${icon.name} ikon`}
                title={icon.name}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}${icon.file}`}
                  alt={icon.name}
                  className="selector-icon"
                />
              </button>
            ))}
          </div>
          
          {/* Button Style Selector */}
          <div className="theme-list">
            {buttonStyles.map(style => (
              <button
                key={style.id}
                className={`theme-button ${currentButtonStyle === style.id ? 'active' : ''}`}
                onClick={() => handleButtonStyleChange(style.id)}
                aria-label={`Velg ${style.name} stil`}
                title={style.name}
              >
                {style.file ? (
                  <img 
                    src={`${import.meta.env.BASE_URL}${style.file}`}
                    alt={style.name}
                    className="selector-icon"
                  />
                ) : style.type === 'circle' ? (
                  <span className="selector-circle"></span>
                ) : (
                  <span className="selector-default">●</span>
                )}
              </button>
            ))}
          </div>
        </div>
        {isOpen && (
          <div className={`chatbot-window ${isClosing ? 'chat-closing' : 'chat-open'}`}>
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  {getAIIcon("ai-icon")}
                </div>
                <div className="chatbot-header-text">
                  <div className="chatbot-title-row">
                    <h3 className="chatbot-title">Olav Hallen</h3>
                  </div>
                  <p className="chatbot-subtitle">
                    <span className="status-indicator"></span>
                    KI Chatbot
                  </p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button 
                  className="btn-close" 
                  onClick={() => {
                    setIsClosing(true)
                    setTimeout(() => {
                      setIsOpen(false)
                      setIsClosing(false)
                    }, 300)
                  }}
                  aria-label="Lukk chatbot"
                >
                  ×
                </button>
              </div>
            </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}-message ${message.isDisclaimer ? 'disclaimer-message' : ''}`}>
                {/* <div className="message-avatar">
                  {message.sender === 'bot' && getAIIcon("ai-icon-small")}
                </div> */}
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.sender === 'bot' && !message.isDisclaimer && (
                    <span className="ai-label">AI</span>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message typing-indicator">
                {/* <div className="message-avatar">
                  {getAIIcon("ai-icon-small")}
                </div> */}
                <div className="message-content typing">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Skriv din melding..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="btn-send" 
              onClick={handleSend}
              aria-label="Send melding"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          className={`chatbot-toggle button-style-${currentButtonStyle}`}
          onClick={() => {
            setIsClosing(false)
            setIsOpen(true)
          }}
          aria-label="Åpne chatbot"
        >
          <img 
            src={`${import.meta.env.BASE_URL}Blobs.svg`}
            alt="Chat background"
            className={`chatbot-blobs-bg ${currentButtonStyle === 2 ? 'blobs-visible' : 'blobs-hover'}`}
          />
          {getAIIcon()}
        </button>
      )}
      </div>
    </>
  )
}

export default Chatbot

