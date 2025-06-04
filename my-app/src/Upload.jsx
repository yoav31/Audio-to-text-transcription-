import React, { useState } from 'react';
import {handle_Download_Transcription_Txt , handle_Download_Transcription_Pdf, handle_Download_Transcription_Word, handle_Download_Summary_Txt, handle_Download_Summary_Pdf,handle_Download_Summary_Word} from './backend/DownFormat'; // importing download functions
import { handleUpload, transcribe, summarize, transcription,summary } from './backend/api'; // importing upload and processing functions
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

function Upload() {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [language_input, setLanguage_input] = useState('');   // State to store the language of the audio/video
  const [language_transcription, setLanguage_transcription] = useState(''); // State to store the language of the transcription
  const [language_summary, setLanguage_summary] = useState(''); // State to store the language of the summary
  const [Show_Language_Buttons, Set_Show_Language_Buttons] = useState(false);   // State to control the visibility of download buttons
  const [Show_Language_Transcription_Button, Set_Show_Language_Transcription_Button] = useState(false);   // State to control the visibility of download buttons for transcription
  const [Show_Language_Summary_Button, Set_Show_Language_Summary_Button] = useState(false);   // State to control the visibility of download buttons for summary
  const [Show_Download_Transcription_Buttons, Set_Show_Download_Transcription_Buttons] = useState(false);   // State to control the visibility of download buttons for transcription
  const [Show_Download_Summary_Buttons, Set_Show_Download_Summary_Buttons] = useState(false);   // State to control the visibility of download buttons for summary
  const [loading, setLoading] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [Show_Transcribe_Button, Set_Show_Transcribe_Button] = useState(false); // State to control the visibility of the transcription button
  const [Show_Summarize_Button, Set_Show_Summarize_Button] = useState(false); // State to control the visibility of the summary button
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleClearFile = () => {
    setFile(null);
    document.getElementById("file-upload").value = "";
  };
  const handleShowLanguageTranscriptionButton = () => {
    Set_Show_Language_Transcription_Button(true);
  }
  const handleShowLanguageSummaryButton = () => {
    Set_Show_Language_Summary_Button(true);
  }

  const handleAudioChange = (event) => {
    setLanguage_input(event.target.value);
  };

  const handleLanguageTranscriptionChange = (event) => {
    setLanguage_transcription(event.target.value);
       
};
  const handleLanguageSummaryChange = (event) => {
    setLanguage_summary(event.target.value);
    
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
    <div style={{ backgroundColor: '#fff8e1', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
          <img src="/photos/sce_logo.webp" alt="sce logo" style={{ opacity: '0.5', objectFit: 'contain', height: '60px', width: '120px' }} />
          <img src="/photos/museum-logo.jpg" alt="museum logo" style={{ opacity: '0.5', height: '60px', objectFit: 'contain', width: '150px' }} />
        </div>
        <Typography variant='h4' style={{ alignSelf: 'center' }}>Upload Your File</Typography>
        <br></br>
      </div>
      <div ></div>
      <div >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px' }}>
          <Typography variant='p'>Upload your audio or video file to get a transcription and summary.</Typography>
          <Typography variant='p'>Supported formats: .mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm</Typography>
        </Box>
        <Box>
          <Typography variant='p'>Choose Language of the audio/video :<tab> </tab></Typography>
          <FormControl sx={{ width: 110 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label" >language_</InputLabel>
            <Select id="demo-simple-select" value={language_input} label="language_audio" onChange={handleAudioChange}>
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"he"}>Hebrew</MenuItem>
              <MenuItem value={"ru"}>Russian</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </div>
      <Typography variant='h6' style={{ padding: 8 }}>Upload your file here:</Typography>

      <Input
        type="file"
        id="file-upload"
        name="file-upload"
        inputProps={{ accept: ".mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm" }}
        onChange={handleFileChange}/>


      <Button className="clear-upload" sx={buttonStyle} type="button" onClick={handleClearFile}>Clear File</Button>


      {file && <p>Selected file: {file.name}</p>}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px' }}>
        <Typography variant='body1'>Click the button to upload your file.</Typography>
        <Typography variant='body1'>The file will be sent to the server for processing.</Typography>
        <Typography variant='body1'>Please wait for the processing to complete.</Typography>

        <Button className="upload-button"sx={buttonStyle}type="button" onClick={() => handleUpload(file, language_input, setLoading, Set_Show_Language_Buttons)} disabled={loading}>
  {loading ? (
    <Box display="flex" alignItems="center">
      <CircularProgress size={20} sx={{ marginRight: '8px', color: 'white' }} />
      <Typography variant="body2" sx={{ color: 'white' }}>
        Uploading...
      </Typography>
    </Box>
  ) : (
    "Upload"
  )}
</Button>
      </Box>

      <br></br>

      {Show_Language_Buttons && (<>
        <Box>
          <Typography variant='p'>Choose:<tab> </tab></Typography>
          <Button sx={buttonStyle} type='button' onClick={handleShowLanguageTranscriptionButton}>Transcription</Button>
          <Button sx={buttonStyle} type='button' onClick={handleShowLanguageSummaryButton}>Summary</Button>
        </Box>
      </>)}
      <br></br>
      <Box>
      {Show_Language_Transcription_Button && (<> <TranscriptionLanguageButtons language_transcription={language_transcription} handleLanguageTranscriptionChange={handleLanguageTranscriptionChange} Set_Show_Transcribe_Button={Set_Show_Transcribe_Button} /></>)}
      <br></br>
      {Show_Transcribe_Button && 
      <><Typography variant='p'>Click the button to transcribe the audio/video.</Typography>
      <Button sx={buttonStyle} type='button' onClick={() => transcribe(file, language_transcription, setLoadingTranscription, Set_Show_Download_Transcription_Buttons)}>Transcribe</Button></>}
      {loadingTranscription  && <Loading text="transcribing..." />}
      </Box>
      <br></br>  
      
      {Show_Download_Transcription_Buttons && <TranscriptDownloadButton />}
      <br></br>
      <Box>
      {Show_Language_Summary_Button && (<><SummaryLanguageButtons language_summary={language_summary} handleLanguageSummaryChange={handleLanguageSummaryChange} Set_Show_Summarize_Button={Set_Show_Summarize_Button} /></>)}
      <br></br>
      {Show_Summarize_Button &&
      <><Typography variant='p'>Click the button to summarize the transcription.</Typography>
      <Button sx={buttonStyle} type='button' onClick={() => summarize(file, language_summary, setLoadingSummary, Set_Show_Download_Summary_Buttons)}>summarize</Button></>}
      {loadingSummary && <Loading text="summarizing..." />}
      </Box>
      <br></br>
      {Show_Download_Summary_Buttons && <SummaryDownloadButton />}
    </div>
  );
}
export default Upload;
