# Stunimate - Anime Streaming Platform Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [API Integration](#api-integration)
7. [Components Documentation](#components-documentation)
8. [Pages Documentation](#pages-documentation)
9. [State Management](#state-management)
10. [Styling & UI](#styling--ui)
11. [Performance Optimizations](#performance-optimizations)
12. [Development Guidelines](#development-guidelines)
13. [Troubleshooting](#troubleshooting)

## Project Overview

**Stunimate** is a modern anime streaming platform built with React and Vite. The application provides users with a comprehensive anime browsing experience, featuring trending anime, latest episodes, detailed anime information, and streaming platform integration.

### Key Features
- Browse trending anime with hero slider
- View latest episodes with pagination
- Detailed anime information pages
- Streaming platform integration
- Responsive design for all devices
- Genre-based filtering
- Search functionality
- Caching system for API optimization

## Technology Stack

### Frontend Framework
- **React 19.1.1** - Core UI library
- **Vite 7.1.2** - Build tool and development server
- **React Router DOM 7.8.2** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animation library
- **Lucide React 0.541.0** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - React integration for Vite

### External APIs
- **Jikan API (MyAnimeList)** - Anime data source
  - Top anime endpoint
  - Latest episodes endpoint
  - Genres endpoint
  - Anime details endpoint

## Project Structure

```
e:\Stunimate/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images and media files
│   │   └── anw-min.webp       # Logo/brand asset
│   ├── components/             # Reusable UI components
│   │   ├── AnimeCard.jsx      # Individual anime display card
│   │   ├── Footer.jsx         # Site footer
│   │   ├── HeroSlider.jsx     # Main hero carousel
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── SearchBar.jsx      # Search functionality
│   │   └── TrendingAnimeCard.jsx # Trending anime card
│   ├── pages/                  # Route components
│   │   ├── Details.jsx        # Anime details page
│   │   ├── Home.jsx           # Main dashboard
│   │   ├── Landing.jsx        # Landing/welcome page
│   │   └── StreamingPlatforms.jsx # Streaming services
│   ├── App.jsx                # Main app component with routing
│   ├── App.css               # Global styles
│   ├── main.jsx              # Application entry point
│   └── sampleStorage.js      # Fallback data
├── .env.local                # Environment variables
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── README.md                # Basic project info
└── vite.config.js           # Vite configuration
```

## Features

### 1. Hero Slider
- Displays top anime with rotating carousel
- Smooth transitions with Framer Motion
- Navigation arrows for manual control
- Auto-advancing slides
- Responsive design

### 2. Trending Anime Section
- Grid layout with responsive columns
- Pagination controls
- Smooth animations on load/transition
- Adaptive items per page based on screen size

### 3. Latest Episodes
- Dynamic grid layout
- Show more/less functionality
- Real-time episode information
- Fallback to sample data when API unavailable

### 4. Genre Filtering
- Sidebar with genre buttons
- Color-coded genre tags
- Expandable genre list
- Interactive genre selection

### 5. Responsive Design
- Mobile-first approach
- Breakpoint-based layouts:
  - Mobile: 3 items per row
  - Tablet: 3-4 items per row
  - Desktop: 4-6 items per row
  - Large screens: 6-10 items per row

### 6. Performance Features
- API response caching (30-minute TTL)
- Rate limiting with exponential backoff
- Lazy loading with React Suspense
- Optimized image loading
- Error boundaries for graceful failures

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stunimate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Add any environment variables here
   VITE_API_BASE_URL=https://api.jikan.moe/v4
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## API Integration

### Jikan API (MyAnimeList)

The application integrates with the Jikan API to fetch anime data:

#### Endpoints Used:
- `GET /top/anime` - Fetch top-rated anime
- `GET /watch/episodes` - Get latest episodes
- `GET /genres/anime` - Retrieve anime genres
- `GET /anime/{id}` - Get specific anime details

#### Rate Limiting Strategy:
- 30-minute cache for API responses
- Exponential backoff for rate-limited requests
- Fallback to sample data when API unavailable
- Sequential requests with 1-second delays

#### Error Handling:
- Graceful degradation to cached data
- User-friendly error messages
- Retry mechanisms with exponential backoff
- Fallback to sample storage data

## Components Documentation

### Core Components

#### `AnimeCard.jsx`
**Purpose**: Display individual anime information in card format
**Props**:
- `id` - Anime ID for routing
- `title` - Anime title
- `img` - Cover image URL
- `description` - Synopsis
- `duration` - Episode duration
- `status` - Airing status
- `genres` - Array of genre objects
- `subRatings` - Episode count

#### `TrendingAnimeCard.jsx`
**Purpose**: Specialized card for trending anime section
**Props**:
- `title` - Anime title
- `img` - Cover image URL
- `episodeNumber` - Current episode
- `id` - Anime ID for navigation

#### `HeroSlider.jsx`
**Purpose**: Main hero section with anime showcase
**Props**:
- `id` - Anime ID
- `title` - Anime title
- `img` - Background image
- `description` - Synopsis

#### `Navbar.jsx`
**Purpose**: Site navigation and search functionality
**Features**:
- Responsive navigation menu
- Search integration
- Logo/branding
- Mobile hamburger menu

#### `Footer.jsx`
**Purpose**: Site footer with links and information
**Features**:
- Social media links
- Copyright information
- Additional navigation links

#### `LoadingSpinner.jsx`
**Purpose**: Loading state indicator
**Features**:
- Animated spinner
- Consistent styling
- Accessible loading states

#### `SearchBar.jsx`
**Purpose**: Search functionality component
**Features**:
- Real-time search
- Search suggestions
- Keyboard navigation

## Pages Documentation

### `Home.jsx` - Main Dashboard
**Route**: `/home`
**Features**:
- Hero slider with top anime
- Trending anime grid
- Latest episodes section
- Genre sidebar
- Responsive pagination
- API data management

**State Management**:
- `topAnime` - Top-rated anime list
- `latestEpisode` - Recent episodes
- `genres` - Available genres
- `isLoading` - Loading state
- `error` - Error handling
- Pagination states

### `Landing.jsx` - Welcome Page
**Route**: `/`
**Purpose**: Initial landing page for new users
**Features**:
- Welcome message
- Call-to-action buttons
- Brand introduction

### `Details.jsx` - Anime Details
**Route**: `/details/:id`
**Purpose**: Detailed anime information page
**Features**:
- Comprehensive anime information
- Episode lists
- Related anime suggestions
- Streaming links

### `StreamingPlatforms.jsx` - Streaming Services
**Route**: `/streaming/:id`
**Purpose**: Display available streaming platforms
**Features**:
- Platform availability
- Direct streaming links
- Platform logos and information

## State Management

### Local State (useState)
- Component-level state for UI interactions
- Form inputs and user preferences
- Temporary data storage

### Caching Strategy
- LocalStorage for API response caching
- 30-minute TTL for cached data
- Automatic cache invalidation
- Fallback data management

### Error State Management
- Centralized error handling
- User-friendly error messages
- Retry mechanisms
- Graceful degradation

## Styling & UI

### Tailwind CSS Configuration
- Custom color palette
- Responsive breakpoints
- Component-specific utilities
- Dark theme support

### Animation System (Framer Motion)
- Page transitions
- Component entrance/exit animations
- Hover effects
- Loading animations

### Responsive Design Breakpoints
```css
/* Mobile */
@media (max-width: 990px) { /* 3 items */ }

/* Tablet */
@media (max-width: 1200px) { /* 3 items */ }

/* Small Desktop */
@media (max-width: 1436px) { /* 4 items */ }

/* Large Desktop */
@media (max-width: 2000px) { /* 6 items */ }

/* Ultra-wide */
@media (min-width: 2001px) { /* 10 items */ }
```

## Performance Optimizations

### 1. API Optimization
- Response caching with localStorage
- Rate limiting compliance
- Batch requests where possible
- Error recovery mechanisms

### 2. Image Optimization
- Lazy loading implementation
- Responsive image sizing
- WebP format support
- Fallback image handling

### 3. Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

### 4. Memory Management
- Cleanup functions in useEffect
- Event listener removal
- State cleanup on unmount

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Use TypeScript for type safety (future enhancement)

### Component Structure
```jsx
// Component template
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-styles"
    >
      {/* Component JSX */}
    </motion.div>
  );
};

export default ComponentName;
```

### Git Workflow
- Feature branch development
- Descriptive commit messages
- Pull request reviews
- Continuous integration

## Troubleshooting

### Common Issues

#### 1. API Rate Limiting
**Problem**: 429 Too Many Requests error
**Solution**: 
- Wait for rate limit reset
- Use cached data
- Implement exponential backoff

#### 2. Image Loading Failures
**Problem**: Broken image displays
**Solution**:
- Implement fallback images
- Add error handling for image loads
- Use placeholder images

#### 3. Performance Issues
**Problem**: Slow page loads
**Solution**:
- Enable caching
- Optimize images
- Implement lazy loading
- Reduce bundle size

#### 4. Mobile Responsiveness
**Problem**: Layout issues on mobile
**Solution**:
- Test on multiple devices
- Use responsive breakpoints
- Implement mobile-first design

### Debug Mode
Enable debug logging by setting:
```javascript
const DEBUG = process.env.NODE_ENV === 'development';
```

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

### Planned Features
1. User authentication system
2. Personal watchlists
3. Rating and review system
4. Advanced search filters
5. Offline viewing capabilities
6. Social features and sharing
7. Multiple language support
8. Progressive Web App (PWA) features

### Technical Improvements
1. TypeScript migration
2. Unit and integration testing
3. Performance monitoring
4. SEO optimization
5. Accessibility improvements
6. State management with Redux/Zustand
7. Server-side rendering (SSR)
8. Database integration

## Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Make changes with proper testing
4. Submit pull request with description

### Code Standards
- Follow ESLint configuration
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation for new features

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: Stunimate Development Team