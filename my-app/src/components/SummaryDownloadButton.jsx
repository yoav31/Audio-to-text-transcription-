import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import { Box, Typography, Button } from "@mui/material";
import { handle_Download_Summary_Txt, handle_Download_Summary_Pdf, handle_Download_Summary_Word } from "../backend/DownFormat"; // importing download functions

const SummeryDownloadButton = ({summarization, language}) => {
    
    const buttonStyle = {
        background: 'linear-gradient(135deg, #8b7355, #6d5a42)',
        color: '#f8f3e6',
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'Playfair Display, serif',
        border: '2px solid rgba(139, 115, 85, 0.6)',
        boxShadow: '0 4px 15px rgba(139, 115, 85, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        minWidth: '80px',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(139, 115, 85, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
            borderColor: 'rgba(139, 115, 85, 0.8)',
            background: 'linear-gradient(135deg, #9d8461, #7a6349)'
        }
    };

    const titleStyle = {
        fontFamily: 'Crimson Text, serif',
        color: '#3d2f1f',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '15px',
        textAlign: 'center'
    };

    return (
        <Box style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "15px", 
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 115, 85, 0.2)'
        }}>
            <Typography variant='h6' style={titleStyle}>Download Summary:</Typography>
            <Box style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                <Button 
                    sx={buttonStyle} 
                    startIcon={<BsFiletypeTxt />} 
                    onClick={() => handle_Download_Summary_Txt(summarization)}
                >
                    .txt
                </Button>
                <Button 
                    sx={buttonStyle} 
                    startIcon={<FaRegFilePdf />} 
                    onClick={() => handle_Download_Summary_Pdf(language, summarization)}
                >
                    .pdf
                </Button>
                <Button 
                    sx={buttonStyle} 
                    startIcon={<FaRegFileWord />} 
                    onClick={() => handle_Download_Summary_Word(summarization)}
                >
                    .doc
                </Button>
            </Box>
        </Box>
    );
}

export default SummeryDownloadButton;
