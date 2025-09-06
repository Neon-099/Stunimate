# 🎌 Stunimate - Anime Streaming Platform

<div align="center">
  <img src="src/assets/anw-min.webp" alt="Stunimate Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
</div>

## 📖 About

**Stunimate** is a modern, responsive anime streaming platform built with React and Vite. Discover trending anime, browse latest episodes, and explore detailed anime information with a sleek, user-friendly interface.

### ✨ Key Features

- 🎬 **Hero Slider** - Showcase trending anime with smooth transitions
- 🔥 **Trending Section** - Browse popular anime with responsive grid layout
- 📺 **Latest Episodes** - Stay updated with recent releases
- 🎭 **Genre Filtering** - Explore anime by categories
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Performance Optimized** - Smart caching and lazy loading
- 🔍 **Search Functionality** - Find your favorite anime quickly
- 🎨 **Modern UI** - Beautiful animations and smooth interactions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stunimate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Tech Stack

### Frontend
- **React 19.1.1** - UI library with latest features
- **Vite 7.1.2** - Lightning-fast build tool
- **React Router DOM 7.8.2** - Client-side routing

### Styling & Animation
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **Lucide React 0.541.0** - Beautiful icon library

### Data Source
- **Jikan API** - MyAnimeList unofficial API for anime data

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimeCard.jsx   # Individual anime display
│   ├── HeroSlider.jsx  # Main carousel component
│   ├── Navbar.jsx      # Navigation bar
│   └── ...
├── pages/              # Route components
│   ├── Home.jsx        # Main dashboard
│   ├── Details.jsx     # Anime details page
│   └── ...
├── assets/             # Static assets
├── App.jsx            # Main app component
└── main.jsx           # Application entry point
```

## 🎯 Features Overview

### 🎪 Hero Slider
- Rotating carousel of top anime
- Smooth transitions with Framer Motion
- Manual navigation controls
- Responsive design

### 📊 Trending Anime
- Grid layout with adaptive columns
- Pagination for better performance
- Hover animations and interactions
- Mobile-optimized display

### 📺 Latest Episodes
- Real-time episode information
- Expandable content sections
- Fallback data for reliability
- Genre-based filtering

### 🎨 Responsive Design
Optimized for all screen sizes:
- **Mobile**: 3 items per row
- **Tablet**: 3-4 items per row  
- **Desktop**: 4-6 items per row
- **Large screens**: 6-10 items per row

## ⚡ Performance Features

- **Smart Caching** - 30-minute API response cache
- **Rate Limiting** - Exponential backoff for API requests
- **Lazy Loading** - Optimized image and component loading
- **Error Recovery** - Graceful fallback to cached data
- **Memory Management** - Proper cleanup and optimization

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
VITE_API_BASE_URL=https://api.jikan.moe/v4
```

### Vite Configuration
The project uses a custom Vite configuration optimized for React development with:
- React plugin for Fast Refresh
- Tailwind CSS integration
- Build optimizations

## 🌐 API Integration

### Jikan API (MyAnimeList)
- **Top Anime**: `/top/anime`
- **Latest Episodes**: `/watch/episodes`
- **Genres**: `/genres/anime`
- **Anime Details**: `/anime/{id}`

### Rate Limiting Strategy
- Implements exponential backoff
- Caches responses for 30 minutes
- Graceful error handling
- Fallback to sample data

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Design System

### Color Palette
- Primary: Red (#DC2626)
- Background: Dark theme with gray tones
- Text: White and gray variations
- Accents: Dynamic genre colors

### Typography
- Modern, readable fonts
- Responsive text sizing
- Proper contrast ratios

## 🚧 Development

### Code Style
- ESLint configuration included
- Functional components with hooks
- Modern JavaScript (ES6+)
- Clean, maintainable code structure

### Component Guidelines
```jsx
// Example component structure
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Component = ({ props }) => {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Effect logic
    return () => cleanup();
  }, [dependencies]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default Component;
```

## 🐛 Troubleshooting

### Common Issues

**API Rate Limiting**
- Wait for rate limit reset
- Clear browser cache
- Use fallback data mode

**Performance Issues**
- Enable caching in browser
- Check network connection
- Reduce concurrent requests

**Display Problems**
- Clear browser cache
- Check responsive breakpoints
- Verify image URLs

## 📚 Documentation

For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md) which includes:
- Complete API reference
- Component documentation
- Architecture overview
- Development guidelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
# Clone your fork
git clone https://github.com/your-username/stunimate.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) for providing anime data
- [MyAnimeList](https://myanimelist.net/) for the comprehensive anime database
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [documentation](./DOCUMENTATION.md)
3. Open an issue on GitHub
4. Contact the development team

---

<div align="center">
  <p>Made with ❤️ by the Stunimate Team</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>