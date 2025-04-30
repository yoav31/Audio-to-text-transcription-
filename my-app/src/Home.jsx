import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import { Typography,Button, Box } from '@mui/material';
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
      <br></br>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px',alignItems: 'center' }}>
      <Link to="/upload"><Button  sx={{ backgroundColor: '#1032c7',borderRadius: '12px', color: '#fff','&:hover': {backgroundColor: '#479fde'} }}>Start transcribing</Button></Link>
      </Box>
    </div>
  );
}
  
export default Home;