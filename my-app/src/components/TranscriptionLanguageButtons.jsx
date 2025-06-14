import { Box, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

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
function TranscriptionLanguageButtons({ language_transcription, handleLanguageTranscriptionChange, Set_Show_Transcribe_Button }) {
  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant='h6' 
            sx={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#3d2f1f',
              fontWeight: 600,
              fontSize: '16px',
              textAlign: 'center',
              letterSpacing: '0.5px'
            }}
          >
            Choose Language for Transcription
          </Typography>
          <FormControl sx={{ width: 180 }} size="small">
            <InputLabel id="transcription-language-select-label">Language</InputLabel>
            <Select 
              id="transcription-language-select" 
              value={language_transcription} 
              label="Language" 
              onChange={handleLanguageTranscriptionChange} 
              onClick={() => Set_Show_Transcribe_Button(true)}
              sx={{
                backgroundColor: 'rgba(248, 243, 230, 0.9)',
                borderRadius: '10px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(139, 115, 85, 0.4)',
                  borderWidth: '2px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(139, 115, 85, 0.6)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8b7355'
                }
              }}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"he"}>Hebrew</MenuItem>
              <MenuItem value={"ru"}>Russian</MenuItem>
            </Select>
          </FormControl>
          
    </Box>
  );
}
export default TranscriptionLanguageButtons;
