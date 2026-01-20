import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: 'Hei! Jeg er en AI-assistent. Hvordan kan jeg hjelpe deg i dag?', sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [currentDesign, setCurrentDesign] = useState(3)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const themes = [
    { id: 1, name: 'Klassisk', description: 'Standard AI-design' },
    { id: 2, name: 'Moderne', description: 'Gradient med border' },
    { id: 3, name: 'Mørk', description: 'Dark mode' },
    { id: 4, name: 'Lys', description: 'Minimalistisk' },
    { id: 5, name: 'Futuristisk', description: 'Gradient med aksenter' }
  ]

  const getAIIcon = (className = "chatbot-icon") => {
    return (
      <img 
        src="/Olav.png" 
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

  return (
    <>
      {/* Theme Selector - Floating on left side for debugging */}
      <div className="theme-selector-debug">
        <label className="theme-selector-label">Chatbot Tema:</label>
        <div className="theme-list">
          {themes.map(theme => (
            <button
              key={theme.id}
              className={`theme-button ${currentDesign === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
              aria-label={`Velg ${theme.name} tema`}
              title={theme.description}
            >
              <span className="theme-name">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`chatbot-container design-${currentDesign}`}>
        {isOpen && (
          <div className="chatbot-window">
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
                  onClick={() => setIsOpen(false)}
                  aria-label="Lukk chatbot"
                >
                  ×
                </button>
              </div>
            </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}-message`}>
                {/* <div className="message-avatar">
                  {message.sender === 'bot' && getAIIcon("ai-icon-small")}
                </div> */}
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.sender === 'bot' && (
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
      
      <button 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Lukk chatbot" : "Åpne chatbot"}
      >
        {getAIIcon()}
      </button>
      </div>
    </>
  )
}

export default Chatbot

