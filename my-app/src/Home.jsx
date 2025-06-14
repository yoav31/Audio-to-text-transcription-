import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

function Home() {
  const containerStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(248, 243, 230, 0.7), rgba(248, 243, 230, 0.7)), url('/photos/special-bg.jpeg')`
  };

  return (
    <>
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

      {/* Main Content Container */}
      <div className="historical-container" style={containerStyle}>
        <div className="logo-header">
          <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
          <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
          <img src="/photos/logo-text.png" alt="logo text" className="logo_text" />
        </div>
        
        <Typography variant='h4' className="historical-title" style={{textAlign: 'center'}}>
          Speech-To-Text conversion for <br /> oral histories and interviews
        </Typography>
        
        <div className="ornamental-divider"></div>
        
        <Typography variant='h6' className="historical-subtitle" style={{textAlign: 'center'}}>
          Convert soldiers testimonies in different languages into transcripts and summaries<br/>
          that aid in understanding the testimony and dissemination
        </Typography>
        
        <Box className="historical-button-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link to="/upload">
            <Button className="historical-button">
              Start transcribing
            </Button>
          </Link>
        </Box>
      </div>
    </>
  );
}
  
export default Home;