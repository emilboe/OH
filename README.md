# Olavshallen Mockup

A React mockup of the Olavshallen website with an interactive chatbot featuring 5 different design variations.

## Features

- **Accurate Design**: Matches the colors and design elements from olavshallen.no
- **Interactive Chatbot**: 5 different design variations that can be toggled
- **Responsive**: Works on desktop and mobile devices
- **Modern React**: Built with React 18 and Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Chatbot Designs

The chatbot includes 5 different design variations:

1. **Design 1 - Default Blue**: Classic blue theme matching the site's primary color
2. **Design 2 - Gradient with Border**: Gradient header with prominent border
3. **Design 3 - Dark Theme**: Dark mode with rounded corners
4. **Design 4 - Light/Minimal**: Clean white theme with subtle accents
5. **Design 5 - Modern Gradient**: Modern gradient design with left border accents

Click the 🎨 button in the chatbot header to cycle through designs.

## Project Structure

```
src/
  components/
    Header.jsx       - Navigation header
    Hero.jsx         - Hero section
    Events.jsx       - Event listings
    InfoSection.jsx  - Information cards
    Footer.jsx       - Footer section
    Chatbot.jsx      - Chatbot component with 5 designs
  App.jsx           - Main app component
  main.jsx          - Entry point
```

