import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import { Box, Typography, Button } from "@mui/material";
import { handle_Download_Summary_Txt, handle_Download_Summary_Pdf, handle_Download_Summary_Word } from "../backend/DownFormat"; // importing download functions
import language_transcription from '../Upload';

const TranscriptDownloadButton = () => {
    return (
        <Box style={{ display: "flex", gap: "16px", padding: '8px' }}>
            <Typography variant='h6'>Download Transcript:</Typography>
            <Button variant="contained" startIcon={<BsFiletypeTxt />} onClick={handle_Download_Summary_Txt}>.txt </Button>
            <Button variant="contained" startIcon={< FaRegFilePdf />} onClick={() => handle_Download_Summary_Pdf(language_transcription)}>.pdf</Button>
            <Button variant="contained" startIcon={<FaRegFileWord />} onClick={handle_Download_Summary_Word}>.doc</Button>
        </Box>
    );
}

export default TranscriptDownloadButton;
