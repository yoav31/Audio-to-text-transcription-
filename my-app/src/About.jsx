import React from 'react';
import './About.css'; // ייבוא קובץ CSS לדף אודות
import { Typography } from '@mui/material'; // ייבוא רכיבי Typography מ-MUI

function About() {
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
        <div className="historical-container">
          <div className="logo-header">
            <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
            <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
            <img src="/photos/logo-text.png" alt="logo text" className="logo_text" />
          </div>
          
          <Typography variant='h4' className="historical-title" style={{textAlign: 'center'}}>
            About the website
          </Typography>
          
          <div className="ornamental-divider"></div>

          <div className="about-content">
            <div className="about-section">
              <Typography className="historical-paragraph">
                Welcome to the Digital Testimonies of World War II Soldiers website. Our platform provides easy and up-to-date access to live testimonies
                from soldiers on various fronts, focusing on personal experiences, major battles, and the difficult situations faced during the war. Our 
                mission is to preserve history and make these testimonies accessible to a wide audience through advanced technology.
              </Typography>
            </div>

            <div className="about-section">
              <Typography variant="h5" className="historical-subtitle-heading">Who Are We?</Typography>
              <Typography className="historical-paragraph">
                The website was created as part of a final project by Yoav Vaknin and Dmitri Shpak, computer science students from the Sami Shimon College of Engineering.
              </Typography>
            </div>

            <div className="about-section">
              <Typography variant="h5" className="historical-subtitle-heading">Do You Have Any Questions?</Typography>
              <Typography className="historical-paragraph">
                If you have any further questions about using the website, feel free to contact us:
              </Typography>
              
              <div className="contact-info">
                <div className="contact-item">
                  <Typography className="contact-name">Yoav Vaknin:</Typography>
                  <Typography className="contact-email">yoavva1@ac.sce.ac.il</Typography>
                </div>
                <div className="contact-item">
                  <Typography className="contact-name">Dmitri Shpak:</Typography>
                  <Typography className="contact-email">dmitrsh5@ac.sce.ac.il</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
  
export default About;