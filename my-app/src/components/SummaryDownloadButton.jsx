import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import { Box, Typography, Button } from "@mui/material";
import { handle_Download_Summary_Txt, handle_Download_Summary_Pdf, handle_Download_Summary_Word } from "../backend/DownFormat"; // importing download functions
import language_summary from '../Upload';

const SummeryDownloadButton = ({summarization}) => {
    return (
        <Box style={{ display: "flex", gap: "16px", padding: '8px' }}>
            <Typography variant='h6'>Download Summary:</Typography>
            <Button variant="contained" startIcon={<BsFiletypeTxt />} onClick={() => handle_Download_Summary_Txt(summarization)}>.txt </Button>
            <Button variant="contained" startIcon={< FaRegFilePdf />} onClick={() => handle_Download_Summary_Pdf(language_summary, summarization)}>.pdf</Button>
            <Button variant="contained" startIcon={<FaRegFileWord />} onClick={() => handle_Download_Summary_Word(summarization)}>.doc</Button>
        </Box>
    );
}

export default SummeryDownloadButton;
