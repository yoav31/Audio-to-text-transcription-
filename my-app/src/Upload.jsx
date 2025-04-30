import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import pdfMake from "pdfmake/build/pdfmake";
import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';   


function Upload() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [showDownloadButtons, setShowDownloadButtons] = useState(false);   // State to control the visibility of download buttons

  const handleClearFile = () => {
    setFile(null);
    document.getElementById("file-upload").value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setShowDownloadButtons(true); 
    const formData = new FormData();
    formData.append("file", file);
    const selectedLanguage = document.getElementById("language").value;
    formData.append("language", selectedLanguage);


    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      //      const response = await axios.post("http://localhost:5000/upload",formData);

      if (response.ok) {
        const data = await response.json();
        setTranscription(data.transcription);
        alert("File uploaded and transcribed successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handle_Download_Transcription_Txt = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.txt";
    link.href = url;
    link.click();
  };
  const handle_Download_Transcription_Pdf = () => {
    const docDefinition = {
      content: [
        { text: transcription, font: 'NotoSans' }
      ],
      defaultStyle: {
        font: 'NotoSans'
      }
    };

    pdfMake.createPdf(docDefinition).download("transcription.pdf");
  };
  const handle_Download_Transcription_Word = () => {
    const blob = new Blob([transcription], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.doc";
    link.href = url;
    link.click();
  };

  const [language, set] = React.useState('');

  const handleChange = (event) => {
    set(event.target.value);
  };

  const buttonStyle = {
    backgroundColor: '#1032c7',
    color: '#f8f8f8',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#479fde'}
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
          <img src="/photos/sce_logo.webp" alt="sce logo" style={{ opacity: '0.5', objectFit: 'contain', height: '60px', width: '120px' }} />
          <img src="/photos/museum-logo.jpg" alt="museum logo" style={{ opacity: '0.5', height: '60px', objectFit: 'contain', width: '150px' }} />
        </div>
        <Typography variant='h4' style={{ alignSelf: 'center' }}>Upload Your File</Typography>
        <br></br>

      </div>
      <div >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px' }}>
        <Typography variant='p'>Upload your audio or video file to get a transcription and summary.</Typography>
        <Typography variant='p'>Supported formats: .mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm</Typography>
        <Typography variant='p'>Choose Language for Transcription and Summary:<tab> </tab></Typography>
        </Box>
      
      <FormControl sx={{ width: 110}} fullWidth size="small">
        <InputLabel id="demo-simple-select-label" >language</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="language"
          onChange={handleChange}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"he"}>Hebrew</MenuItem>
          <MenuItem value={"ru"}>Russian</MenuItem>
        </Select>
      </FormControl>
      </div>
      <Typography variant='h6' style={{ padding:8 }}>Upload your file here:</Typography>

      <Input
        type="file"
        id="file-upload"
        name="file-upload"
        inputProps={{accept: ".mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm"}}
        onChange={handleFileChange}
        />
        

      <Button className="clear-upload" sx={buttonStyle} type="button" onClick={handleClearFile}>Clear File</Button>
      

      {file && (<p>Selected file: {file.name}</p>)}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px' }}>
        <Typography variant='p'>Click the button to upload your file.</Typography>
        <Typography variant='p'>The file will be sent to the server for processing.</Typography>
        <Typography variant='p'>Please wait for the processing to complete.</Typography>
        <Button className="upload-button" sx={buttonStyle} type='button' onClick={handleUpload}>Upload</Button>
      </Box>
      <br></br>
      
      <br></br>
      {showDownloadButtons && (<>
      <div style={{ display: "flex", gap: "16px", padding: '8px' }}>
        <Typography variant='h6'>Transcription:</Typography>
        <Button variant="contained" startIcon={<BsFiletypeTxt />} onClick={handle_Download_Transcription_Txt}>.txt</Button>
        <Button variant="contained" startIcon={< FaRegFilePdf />} onClick={handle_Download_Transcription_Pdf}>.pdf</Button>
        <Button variant="contained" startIcon={<FaRegFileWord />} onClick={handle_Download_Transcription_Word}>.doc</Button></div>
      <br></br>
      <br></br>
      <div style={{ display: "flex", gap: "16px", padding: '8px' }}>
        <Typography variant='h6'>Summary:</Typography>
        <Button variant="contained" startIcon={<BsFiletypeTxt />} onClick={handle_Download_Transcription_Txt}>.txt </Button>
        <Button variant="contained" startIcon={< FaRegFilePdf />} onClick={handle_Download_Transcription_Pdf}>.pdf</Button>
        <Button variant="contained" startIcon={<FaRegFileWord />} onClick={handle_Download_Transcription_Word}>.doc</Button>
      </div>
      </>)}
      <br></br>
    </div>
  );
}

export default Upload;
