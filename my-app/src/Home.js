import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
function Home() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
        <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
      </div>
      
      <Typography variant='h4' style={{textAlign: 'center' }}>Speech-To-Text conversion for <br /> Oral histories and interviews</Typography>
      <Typography variant='h6' style={{textAlign: 'center' }}>Convert soldiers testimonies in different languages into transcripts and summaries<br/>that aid in understanding the testimony and dissemination</Typography>
  </div>  
      
      <Link to="/upload"><button id="upload-button">Start transcribing</button></Link>
    </div>
  );
}
  
export default Home;