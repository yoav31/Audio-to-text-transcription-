import React, { useState } from 'react';
import { handleUpload, TranscribeForSearch, SummarizeForSearch } from './backend/api'; // importing upload and processing functions
import { Button, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import SummaryDownloadButton from './components/SummaryDownloadButton';
import SummaryLanguageButtons from './components/SummaryLanguageButtons';
import TranscriptDownloadButton from './components/TranscriptDownloadButton';
import TranscriptionLanguageButtons from './components/TranscriptionLanguageButtons';
import Loading from './components/Loading';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [language_input, setLanguage_input] = useState('');   // State to store the language of the audio/video
  const [language_transcription, setLanguage_transcription] = useState('en'); // State to store the language of the transcription
  const [language_summary, setLanguage_summary] = useState('en'); // State to store the language of the summary
  const [Show_Language_Transcription_Button, Set_Show_Language_Transcription_Button] = useState(false);   // State to control the visibility of download buttons for transcription
  const [Show_Language_Summary_Button, Set_Show_Language_Summary_Button] = useState(false);   // State to control the visibility of download buttons for summary
  const [Show_Download_Transcription_Buttons, Set_Show_Download_Transcription_Buttons] = useState(false);   // State to control the visibility of download buttons for transcription
  const [Show_Download_Summary_Buttons, Set_Show_Download_Summary_Buttons] = useState(false);   // State to control the visibility of download buttons for summary
  const [loading, setLoading] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [Show_Transcribe_Button, Set_Show_Transcribe_Button] = useState(false); // State to control the visibility of the transcription button
  const [Show_Summarize_Button, Set_Show_Summarize_Button] = useState(false); // State to control the visibility of the summary button
  const [transcription, setTranscription] = useState(''); // State to store the transcription text
  const [summarization, setSummarization] = useState(''); // State to store the summary text
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleClearFile = () => {
    setFile(null);
    document.getElementById("file-upload").value = "";
  };

  const handleAudioChange = (event) => {
    setLanguage_input(event.target.value);
  };

  const handleLanguageTranscriptionChange = (event) => {
    setLanguage_transcription(event.target.value);

  };
  const handleLanguageSummaryChange = (event) => {
    setLanguage_summary(event.target.value);

  };

  // Function to mimic backend's secure_filename() behavior
  const secureFilename = (filename) => {
    // Basic sanitization similar to Werkzeug's secure_filename
    return filename
      .replace(/[^\w\s\-_.]/g, '') // Remove special characters except word chars, spaces, dashes, underscores, dots
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/_{2,}/g, '_') // Replace multiple underscores with single
      .trim();
  };

  const handleTranscribe = async () => {
    if (!file || !language_transcription) {
      alert("Missing file or target language.");
      return;
    }
    
    setLoadingTranscription(true);
    // Use the same filename processing as the backend: secure_filename(filename).split(".")[0]
    const securedFilename = secureFilename(file.name);
    const baseFileName = securedFilename.split(".")[0];
    
    try {
      const transcription = await TranscribeForSearch(baseFileName, language_transcription);
      setTranscription(transcription);
      Set_Show_Download_Transcription_Buttons(true);
    } catch (error) {
      console.error('Error during transcription:', error);
      alert("Error during transcription: " + error);
    } finally {
      setLoadingTranscription(false);
    }
  }
  const handleSummarize = async () => {
    if (!file || !language_summary) {
      alert("Missing file or target language.");
      return;
    }
    
    setLoadingSummary(true);
    // Use the same filename processing as the backend: secure_filename(filename).split(".")[0]
    const securedFilename = secureFilename(file.name);
    const baseFileName = securedFilename.split(".")[0];
    
    try {
      const summarization = await SummarizeForSearch(baseFileName, language_summary);
      setSummarization(summarization);
      Set_Show_Download_Summary_Buttons(true);
    } catch (error) {
      console.error('Error during summarization:', error);
      alert("Error during summarization: " + error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const buttonStyle = {
    backgroundColor: '#1032c7',
    color: '#f8f8f8',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#479fde'
    }
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
      <div className="historical-container">
        <div className="logo-header">
          <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
          <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
          <img src="/photos/logo-text.png" alt="logo text" className="logo_text" />
        </div>
        
        <Typography variant='h4' className="historical-title" style={{textAlign: 'center'}}>
          Upload Your Audio/Video File
        </Typography>
        
        
        <Typography variant='h6' className="historical-subtitle" style={{textAlign: 'center'}}>
          Convert soldiers testimonies in different languages into transcripts and summaries<br/>
          that aid in understanding the testimony and dissemination
        </Typography>
        
        <Box className="upload-section">
          <div className="upload-header">
            <Typography className="historical-subtitle">Upload your audio or video file to get a transcription and summary.</Typography>
            <Typography className="historical-subtitle">Supported formats: .mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm</Typography>
          </div>
          
          <div className="upload-form-grid">
            <div className="upload-form-section">
              <Typography className="section-title">Audio/Video Language</Typography>
              <div className="language-selector-container">
                <FormControl size="small" className="language-selector">
                  <InputLabel id="language-input-label">Language</InputLabel>
                  <Select 
                    labelId="language-input-label"
                    id="language-input-select" 
                    value={language_input} 
                    label="Language" 
                    onChange={handleAudioChange}
                  >
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"he"}>Hebrew</MenuItem>
                    <MenuItem value={"ru"}>Russian</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="upload-form-section">
              <Typography className="section-title">File Upload</Typography>
              <div className="file-upload-area">
                <Input
                  type="file"
                  id="file-upload"
                  name="file-upload"
                  inputProps={{ accept: ".mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm" }}
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
                
                {file && (
                  <div className="file-status has-file">
                    <Typography className="historical-subtitle">
                      Selected: {file.name}
                    </Typography>
                  </div>
                )}
                
                {!file && (
                  <div className="file-status">
                    <Typography className="historical-subtitle">
                      No file selected
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="upload-actions">
            <Button className="clear-upload" type="button" onClick={handleClearFile}>
              Clear File
            </Button>
            
            <Button 
              className="upload-button" 
              type="button" 
              onClick={() => handleUpload(file, language_input, setLoading, Set_Show_Language_Transcription_Button, Set_Show_Language_Summary_Button)} 
              disabled={loading}
            >
              {loading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ marginRight: '8px', color: 'white' }} />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    Uploading...
                  </Typography>
                </Box>
              ) : ("Upload File")}
            </Button>
          </div>

          {/* Transcription Flow - Choose Language → Button → Loading → Download */}
          {Show_Language_Transcription_Button && (
            <div className="language-selection-container">
              <TranscriptionLanguageButtons language_transcription={language_transcription} handleLanguageTranscriptionChange={handleLanguageTranscriptionChange} Set_Show_Transcribe_Button={Set_Show_Transcribe_Button} />
            </div>
          )}

          {Show_Transcribe_Button && (
            <div className="process-section">
              <Typography className="process-instruction">Click the button to transcribe the audio/video.</Typography>
              <Button className="process-button" type='button' onClick={handleTranscribe}>Transcribe</Button>
            </div>
          )}
          
          {loadingTranscription && (
            <div className="loading-section">
              <Loading text="transcribing..." />
            </div>
          )}

          {Show_Download_Transcription_Buttons && (
            <div className="download-section">
              <TranscriptDownloadButton transcription={transcription} language={language_transcription} />
            </div>
          )}
          
          {/* Summary Flow - Choose Language → Button → Loading → Download */}
          {Show_Language_Summary_Button && (
            <div className="language-selection-container">
              <SummaryLanguageButtons language_summary={language_summary} handleLanguageSummaryChange={handleLanguageSummaryChange} Set_Show_Summarize_Button={Set_Show_Summarize_Button} />
            </div>
          )}

          {Show_Summarize_Button && (
            <div className="process-section">
              <Typography className="process-instruction">Click the button to summarize the transcription.</Typography>
              <Button className="process-button" type='button' onClick={handleSummarize}>Summarize</Button>
            </div>
          )}
          
          {loadingSummary && (
            <div className="loading-section">
              <Loading text="summarizing..." />
            </div>
          )}
          
          {Show_Download_Summary_Buttons && (
            <div className="download-section">
              <SummaryDownloadButton summarization={summarization} language={language_summary} />
            </div>
          )}
        </Box>
      </div>
    </>
  );
}
export default Upload;
