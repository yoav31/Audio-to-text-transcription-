import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';  
import FAQ from './FAQ'; 
import Upload from './Upload';  // דף העלאת קובץ
import Search from './Search';

// Search Form Component (needs to be inside Router context)
function SearchForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Always navigate to search page, even with empty query to show all videos
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    } else {
      navigate('/search'); // Empty search shows all videos
    }
  };

  const handleLibraryClick = () => {
    navigate('/search'); // Navigate to search page (library)
  };

  // Check current page to determine what to show
  const isOnFAQOrAbout = location.pathname === '/FAC' || location.pathname === '/About';
  const showSearchForm = !isOnFAQOrAbout;

  if (showSearchForm) {
    // Show full search form on Home and Search pages
    return (
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input 
          type="text" 
          placeholder="Search testimonies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button id="Search_button" type="submit">Search</button>
      </form>
    );
  } else {
    // Show only Library button on FAQ and About pages
    return (
      <div className="search-form">
        <button id="Search_button" type="button" onClick={handleLibraryClick}>
          Library
        </button>
      </div>
    );
  }
}

function App() {
  
    return (
      <Router>
        <div className="app-container">
          {/* Video Background with Vintage Film Effects */}
          <div className="video-background-container">
            <video 
              className="video-background" 
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
            >
              <source src="/photos/trailer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Animated Film Dust Particles */}
          <div className="film-dust">
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
            <div className="dust-particle"></div>
          </div>

          {/* Historical Navigation Header */}
          <nav className="historical-nav">
            <div className="nav-container">
              <div className="logo-section">
                <img src="/photos/museum_logo.png" alt="museum logo" className="nav-museum-logo" />
              </div>
              
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/FAC">FAQ</Link></li>
                <li><Link to="/About">About</Link></li>
              </ul>
            
              <SearchForm />
            </div>
          </nav>
  
          <div className="routes-container">
            <Routes>
              <Route path="/" element={<Home />} />  
              <Route path="/About" element={<About />} />
              <Route path="/Upload" element={<Upload />} />
              <Route path="/FAC" element={<FAQ />} />  
              <Route path="/search" element={<Search />} />  
            </Routes>
          </div>
        </div>
      </Router>
    );
  }


export default App;
