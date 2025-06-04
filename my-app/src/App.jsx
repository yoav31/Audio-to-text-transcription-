
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';  
import FAQ from './FAQ'; 
import Upload from './Upload';  // דף העלאת קובץ

function App() {
  
    return (
      <Router>
        <div>
          {/* תפריט ניווט */}
          <nav>
          <ul className="nav-links">
                <li><Link to="/">Home</Link></li> {/* השתמש ב-Link מ-React Router */}
                <li><Link to="/FAC">FAQ</Link></li>
                <li><Link to="/About">About</Link></li>
            </ul>
        
            <form action="#" method="get" class="search-form">
                <input type="text" placeholder="search..." name="search" />
                <button id="Search_button" type="submit">Search</button>
            </form>
        </nav>
  
          {/* הגדרת הנתיבים של הדפים */}
          <Routes>
            <Route path="/" element={<Home />} />  {/* דף הנחיתה */}
            <Route path="/About" element={<About />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/FAC" element={<FAQ />} />  {/* דף צור קשר */}
          </Routes>
        </div>
      </Router>
    );
  }


export default App;
