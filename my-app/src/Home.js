import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
function Home() {
    return (
      <div>
        <img src="/photos/sce_logo.webp" alt="sce logo" className="sce-logo" />
        <img src="/photos/museum_logo.png" alt="museum logo" className="museum-logo" />
        <h1 id="main_title">Speech-To-Text conversion for <br /> Oral histories and interviews</h1>
        <br />
        <h3 id="sub_title">Convert soldiers testimonies in different languages into transcripts and summaries<br/>that aid in understanding the testimony and dissemination</h3>
        <br />
        <Link to="/upload"><button id="upload-button">Start transcribing</button></Link>
      </div>
    );
  }
  
export default Home;