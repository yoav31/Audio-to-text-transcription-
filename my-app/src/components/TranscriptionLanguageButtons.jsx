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
    
    <Box>
          <Typography variant='p'>Choose Language of the text of transcription:<tab> </tab></Typography>
          <FormControl sx={{ width: 110 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label" >language_</InputLabel>
            <Select id="demo-simple-select" value={language_transcription} label="language_audio" onChange={handleLanguageTranscriptionChange} onClick={() => Set_Show_Transcribe_Button(true)} >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"he"}>Hebrew</MenuItem>
              <MenuItem value={"ru"}>Russian</MenuItem>
            </Select>
          </FormControl>
          
    </Box>
  );
}
export default TranscriptionLanguageButtons;
