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
function SummaryLanguageButtons({ language_summary, handleLanguageSummaryChange , Set_Show_Summarize_Button }) {
    return (
        <Box>
          <Typography variant='p'>Choose Language of the text of summary:<tab> </tab></Typography>
          <FormControl sx={{ width: 110 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label" >language</InputLabel>
            <Select id="demo-simple-select" value={language_summary} label="language_summary" onChange={handleLanguageSummaryChange} onClick={() => Set_Show_Summarize_Button(true)} >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"he"}>Hebrew</MenuItem>
              <MenuItem value={"ru"}>Russian</MenuItem>
            </Select>
          </FormControl>
          
        </Box>
        
    );
}

export default SummaryLanguageButtons;
