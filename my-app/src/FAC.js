import React from 'react';
import './FAC.css'; // Import the CSS file for styling
function FAC() {
    return (
      <div>
        <img src="/photos/sce_logo.webp" alt="sce logo" className="sce-logo" />
        <img src="/photos/museum_logo.png" alt="museum logo" className="museum-logo" />
        <br></br>
        <br></br>
        <br></br>
        <h2 id="main_title">Frequently Asked Questions</h2>
        <br></br>

        <div className="faq-text">

        <h3><u>What is the purpose of the site?</u></h3>
        <h4>The site is designed to preserve and make accessible the testimonies of Jewish soldiers who fought in World War II, by transcribing, translating, and summarizing recorded interviews.</h4>
        
        <h3><u>What languages ​​are supported?</u></h3>
        <h4>The site currently supports English, Hebrew, and Russian.</h4>

        <h3><u>How can I search for videos by topic?</u></h3>
        <h4>You can search for videos by entering keywords in the search bar located at the top of the page.</h4>

        <h3><u>How is transcription and translation done?</u></h3>
        <h4>Transcription is performed using OpenAI's Whisper model, translation is performed using MarianMT, and summarization is performed using a BART-based Summarization model.</h4>
        
        <h3><u>Is it possible to download the transcript and summary as a file?</u></h3>
        <h4>Yes, once the transcription and summarization process is complete, you will have the option to download the results as a PDF,WORD,TXT file.</h4>
      </div>
    </div>
    );
  }
  
  export default FAC;