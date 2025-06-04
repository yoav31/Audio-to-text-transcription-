import { Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const Loading = ({text}) => {
    return (
        <Box display="flex" alignItems="center" mt={1}>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            <Typography color="textSecondary">{text}</Typography>
        </Box>
    );
}

export default Loading;