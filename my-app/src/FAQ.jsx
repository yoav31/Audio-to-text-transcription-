import React from 'react';
import './FAQ.css'; // Import the CSS file for styling
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
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
          Frequently Asked Questions
        </Typography>
        
        <div className="ornamental-divider"></div>

        <div className="faq-content">
          <Accordion className="historical-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="accordion-icon" />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="historical-accordion-summary">
              <Typography variant='h6' className="historical-question">What is the purpose of the site?</Typography>
            </AccordionSummary>
            <AccordionDetails className="historical-accordion-details">
              <Typography className="historical-answer">
                The site is designed to preserve and make accessible the testimonies of Jewish soldiers who fought in World War II, by transcribing, translating, and summarizing recorded interviews.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="historical-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="accordion-icon" />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="historical-accordion-summary">
              <Typography variant='h6' className="historical-question">What languages are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails className="historical-accordion-details">
              <Typography className="historical-answer">
                The site currently supports English, Hebrew, and Russian.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="historical-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="accordion-icon" />}
              aria-controls="panel3-content"
              id="panel3-header"
              className="historical-accordion-summary">
              <Typography variant='h6' className="historical-question">How can I search for videos by topic?</Typography>
            </AccordionSummary>
            <AccordionDetails className="historical-accordion-details">
              <Typography className="historical-answer">
                You can search for videos by entering keywords in the search bar located at the top of the page.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="historical-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="accordion-icon" />}
              aria-controls="panel4-content"
              id="panel4-header"
              className="historical-accordion-summary">
              <Typography variant='h6' className="historical-question">How is transcription and translation done?</Typography>
            </AccordionSummary>
            <AccordionDetails className="historical-accordion-details">
              <Typography className="historical-answer">
                Transcription is performed using OpenAI's Whisper model, translation is performed using MarianMT, and summarization is performed using a BART-based Summarization model.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="historical-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="accordion-icon" />}
              aria-controls="panel5-content"
              id="panel5-header"
              className="historical-accordion-summary">
              <Typography variant='h6' className="historical-question">Is it possible to download the transcript and summary as a file?</Typography>
            </AccordionSummary>
            <AccordionDetails className="historical-accordion-details">
              <Typography className="historical-answer">
                Yes, once the transcription and summarization process is complete, you will have the option to download the results as a PDF, WORD, TXT file.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default FAQ;
