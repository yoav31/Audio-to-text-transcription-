import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import { Box, Typography, Button } from "@mui/material";
import { handle_Download_Transcription_Txt, handle_Download_Transcription_Pdf, handle_Download_Transcription_Word } from "../backend/DownFormat"; // importing download functions
import language_transcription from '../Upload';

const TranscriptDownloadButton = ({transcription}) => {
    return (
        <Box style={{ display: "flex", gap: "16px", padding: '8px' }}>
            <Typography variant='h6'>Download Transcript:</Typography>
            <Button variant="contained" startIcon={<BsFiletypeTxt />} onClick={() => handle_Download_Transcription_Txt(transcription)}>.txt </Button>
            <Button variant="contained" startIcon={< FaRegFilePdf />} onClick={() => handle_Download_Transcription_Pdf(language_transcription, transcription)}>.pdf</Button>
            <Button variant="contained" startIcon={<FaRegFileWord />} onClick={() => handle_Download_Transcription_Word(transcription)}>.doc</Button>
        </Box>
    );
}

export default TranscriptDownloadButton;
