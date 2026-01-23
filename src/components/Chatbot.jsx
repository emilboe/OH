import React, { useState, useRef, useEffect } from 'react'
import { interpolate } from 'flubber'
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
  const [currentButtonStyle, setCurrentButtonStyle] = useState(2)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const morphPathRef = useRef(null)
  const morphAnimationRef = useRef(null)
  const isHoveringRef = useRef(false)
  const toggleButtonRef = useRef(null)
  
  // Border radius for each corner (in pixels)
  const cornerRadius = {
    corner1: 16, // Top-right
    corner2: 16, // Bottom-right
    corner3: 4, // Bottom-left
    corner4: 16  // Top-left
  }

  const themes = [
    { id: 1, name: 'Mørk', description: 'Dark mode', icon: '🌙' },
    { id: 2, name: 'Moderne', description: 'Gradient med border', icon: '⚡' },
    { id: 3, name: 'Lys', description: 'Minimalistisk', icon: '☀️' }
  ]

  const iconOptions = [
    { id: 2, name: 'Olav', file: 'olavicon_6.svg' }
  ]

  const buttonStyles = [
    { id: 1, name: 'Default', type: 'default' },
    { id: 2, name: 'Blobs', file: 'Blobs.svg' },
    { id: 3, name: 'Circle', type: 'circle' }
  ]

  const getAIIcon = (className = "chatbot-icon") => {
    // Only Olav icon available
    const selectedIcon = iconOptions[0] || { file: 'olavicon_6.svg' }
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

  // Morphing animation setup - morphs the mask from chat bubble to blob
  useEffect(() => {
    const pathElement = morphPathRef.current
    if (!pathElement) return

    // Start path: chat bubble shape (rounded rectangle)
    // Corner radius can be adjusted via cornerRadius object
    // Corner 1 = top-right, Corner 2 = bottom-right, Corner 3 = bottom-left, Corner 4 = top-left
    const r1 = cornerRadius.corner1 // top-right
    const r2 = cornerRadius.corner2 // bottom-right
    const r3 = cornerRadius.corner3 // bottom-left
    const r4 = cornerRadius.corner4 // top-left
    // Path: M start, L to before corner, Q (controlX controlY endX endY) for each corner
    // For Q: control point should be at the actual corner, end point is offset by radius
    const startPath = `M ${r4} 0 L ${64 - r1} 0 Q 64 0 64 ${r1} L 64 ${64 - r2} Q 64 64 ${64 - r2} 64 L ${r3} 64 Q 0 64 0 ${64 - r3} L 0 ${r4} Q 0 0 ${r4} 0 Z`
    
    // End path: blob shape that EXACTLY matches Blobs.svg outline
    // This is the union of all circles from Blobs.svg, scaled from 84x84 to 64x64
    // Scale factor: 64/84 = 0.7619047619
    const endPath = 'M53.33333 0C59.22438 0 64 4.77563 64 10.66667C64 16.55771 59.22438 21.33333 53.33333 21.33333C59.22438 21.33333 64 26.10895 64 32C64 37.89105 59.22438 42.66667 53.33333 42.66667C59.22438 42.66667 64 47.44229 64 53.33333C64 59.22438 59.22438 64 53.33333 64C47.44229 64 42.66667 59.22438 42.66667 53.33333C42.66667 59.22438 37.89105 64 32 64C26.10895 64 21.33333 59.22438 21.33333 53.33333C21.33333 59.22438 16.55771 64 10.66667 64C4.77563 64 0 59.22438 0 53.33333C0 47.44229 4.77563 42.66667 10.66667 42.66667C4.77563 42.66667 0 37.89105 0 32C0 26.10895 4.77563 21.33333 10.66667 21.33333C4.77563 21.33333 0 16.55771 0 10.66667C0 4.77563 4.77563 0 10.66667 0C16.55771 0 21.33333 4.77563 21.33333 10.66667C21.33333 4.77563 26.10895 0 32 0C37.89105 0 42.66667 4.77563 42.66667 10.66667C42.66667 4.77563 47.44229 0 53.33333 0Z'

    let interpolator
    try {
      interpolator = interpolate(startPath, endPath)
    } catch (e) {
      // Fallback if interpolation fails
      console.warn('Path interpolation failed, using fallback')
      return
    }

    const animateMorph = (targetProgress, duration = 150) => {
      if (morphAnimationRef.current) {
        cancelAnimationFrame(morphAnimationRef.current)
      }

      const startTime = performance.now()
      const startProgress = parseFloat(pathElement.getAttribute('data-progress') || '0')

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Use linear interpolation for the smoothest, most fluid motion
        // This ensures no distinct steps or phases - just one continuous morph
        const eased = progress
        
        const currentProgress = startProgress + (targetProgress - startProgress) * eased
        const morphedPath = interpolator(currentProgress)
        
        pathElement.setAttribute('d', morphedPath)
        pathElement.setAttribute('data-progress', currentProgress.toString())

        if (progress < 1) {
          morphAnimationRef.current = requestAnimationFrame(animate)
        } else {
          morphAnimationRef.current = null
        }
      }

      morphAnimationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => {
      // Only morph when blob button style is selected
      if (currentButtonStyle !== 2 || isHoveringRef.current) return
      isHoveringRef.current = true
      animateMorph(1)
    }

    const handleMouseLeave = () => {
      // Only morph when blob button style is selected
      if (currentButtonStyle !== 2 || !isHoveringRef.current) return
      isHoveringRef.current = false
      animateMorph(0)
    }

    const button = toggleButtonRef.current
    if (button) {
      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
    }

    // Initialize to start path
    pathElement.setAttribute('d', startPath)
    pathElement.setAttribute('data-progress', '0')

    return () => {
      if (morphAnimationRef.current) {
        cancelAnimationFrame(morphAnimationRef.current)
      }
      if (button) {
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [currentButtonStyle])

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
          ref={toggleButtonRef}
          className={`chatbot-toggle button-style-${currentButtonStyle}`}
          onClick={() => {
            setIsClosing(false)
            setIsOpen(true)
          }}
          aria-label="Åpne chatbot"
        >
          {/* Single background box that gets masked */}
          <div className="chatbot-toggle-bg"></div>
          
          {/* SVG mask that morphs - needs dimensions for mask to work */}
          <svg 
            className="chatbot-morph-mask" 
            width="64" 
            height="64"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="morphMask" maskUnits="userSpaceOnUse">
                <path ref={morphPathRef} fill="white" />
              </mask>
            </defs>
          </svg>
          
          {getAIIcon()}
        </button>
      )}
      </div>
    </>
  )
}

export default Chatbot

