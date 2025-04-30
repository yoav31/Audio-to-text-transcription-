import React from 'react';
import './FAQ.css'; // Import the CSS file for styling
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
          <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
          <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
        </div>
        <Typography variant='h4' style={{ alignSelf: 'center' }}>Frequently Asked Questions</Typography>

      </div>
      <br></br>


      <div style={{ width: '100%' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography variant='h6'>What is the purpose of the site?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The site is designed to preserve and make accessible the testimonies of Jewish soldiers who fought in World War II, by transcribing, translating, and summarizing recorded interviews.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography variant='h6'>What languages ​​are supported?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The site currently supports English, Hebrew, and Russian.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography variant='h6'>How can I search for videos by topic?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            You can search for videos by entering keywords in the search bar located at the top of the page.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography variant='h6'>How is transcription and translation done?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Transcription is performed using OpenAI's Whisper model, translation is performed using MarianMT, and summarization is performed using a BART-based Summarization model.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography variant='h6'>Is it possible to download the transcript and summary as a file?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Yes, once the transcription and summarization process is complete, you will have the option to download the results as a PDF,WORD,TXT file.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

    </div>

  );
}

export default FAQ;
