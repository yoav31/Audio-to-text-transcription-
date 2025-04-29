import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { jsPDF } from "jspdf";
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';



function Upload() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClearFile = () => {
    setFile(null);
    document.getElementById("file-upload").value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

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

  const handleDownloadTxt = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.txt";
    link.href = url;
    link.click();
  };
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(transcription, 180); // שבירת שורות כדי לא לחתוך טקסט
    doc.text(lines, 10, 10); // x=10, y=10
    doc.save("transcription.pdf");
  };
  const handleDownloadWord = () => {
    const blob = new Blob([transcription], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.doc";
    link.href = url;
    link.click();
  };
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <img src="/photos/sce_logo.webp" alt="sce logo" style={{ opacity: '0.5', objectFit: 'contain',height: '60px',width: '120px' }} />
        <img src="/photos/museum-logo.jpg" alt="museum logo" style={{ opacity: '0.5',height: '60px', objectFit: 'contain',width: '150px' }} />
        </div>
        <Typography variant='h4' style={{ alignSelf: 'center' }}>Upload Your File</Typography>

      </div>
      <p id="main_text">Upload your audio or video file to get a transcription and summary.</p>

      <label htmlFor="language">Choose Language for Transcription and Summary:<tab> </tab></label>
      <select id="language" name="language">
        <option value="en">English</option>
        <option value="he">Hebrew</option>
        <option value="ru">Russian</option>
      </select>

      <Typography variant='h6'>Upload your file here:</Typography>

      <input
        type="file"
        id="file-upload"
        name="file-upload"
        accept=".mp3, .wav, .flac, .ogg, .m4a, .mp4, .avi, .mov, .mkv, .webm"
        onChange={handleFileChange}
      />

      <button id="clear-upload" type="button" onClick={handleClearFile}>Clear File</button>
      <button id="upload-button" onClick={handleUpload}>Upload</button>

      {file && (<p>Selected file: {file.name}</p>)}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <Typography variant='p'>Click the button to upload your file.</Typography>
        <Typography variant='p'>The file will be sent to the server for processing.</Typography>
        <Typography variant='p'>Please wait for the processing to complete.</Typography>
      </Box>
      <br></br>
      <br></br>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant="contained" onClick={handleDownloadTxt}>Download as .txt</Button>
        <Button variant="contained" onClick={handleDownloadPdf}>Download as .pdf</Button>
        <Button variant="contained" onClick={handleDownloadWord}>Download as .doc</Button></div>
    

    </div>
  );
}

export default Upload;
