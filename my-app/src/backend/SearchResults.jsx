import React from 'react';
import { handleSearch,SummarizeForSearch, TranscribeForSearch } from './api';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { summarize } from './api'; // Assuming summarize is exported from api.js


function SearchResults() {
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const videos_names = [];
  const videos_summaries = [];

  const ResultsVideos = async () => {
    videos_names = await handleSearch(query);
  }
  const ResultsSummarys= async () => {
    for (const video of videos_names) {
      videos_summaries.push(await SummarizeForSearch(video));
    }
  }

  return (
    <div style={{ backgroundColor: '#fff8e1', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
        <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4' style={{ alignSelf: 'center' }}>Search Results</Typography>
      </div>
      <br />

      <Box>
        {ResultsVideos && ResultsSummarys}
        <Typography variant="h6">Results for "{query}":</Typography>
        <br ></br>
        {videos_names.length === 0 ? (
    <Typography>videos not found</Typography>
  ) : (

    videos_names.map((name, index) => (
      <Box
        key={index}
        mb={2}
        p={2}
        style={{ backgroundColor: '#fff3e0', borderRadius: '8px' }}
      >
        <Typography variant="subtitle1">
          <strong>video name:</strong> {name}
        </Typography>
        <Typography variant="body2">
          <strong>summary:</strong>{' '}
          {videos_summaries[index] ? videos_summaries[index] : 'Loading summary...'}
        </Typography>
        <br></br>
      </Box>
    ))
  )}
      </Box>
    </div>
  );
}

export default SearchResults;