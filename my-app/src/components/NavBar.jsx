import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, TextField, IconButton, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/SearchResults?query=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#rgba(255, 255, 255, 0.8)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/FAC" color="inherit">FAQ</Button>
          <Button component={Link} to="/About" color="inherit">About</Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: 200,
            }}
          />
          <IconButton type="submit" sx={{ color: 'white' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
