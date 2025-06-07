import React, { useEffect, useState } from 'react';
import { handleSearch, SummarizeForSearch, TranscribeForSearch } from './api';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import  SummeryDownloadButton  from '../components/SummaryDownloadButton';
import  TranscriptDownloadButton  from '../components/TranscriptDownloadButton';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  
  const [videosNames, setVideosNames] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const names = await handleSearch(query);
        setVideosNames(names);

        const summaryList = await Promise.all(names.map(name => SummarizeForSearch(name)));
        setSummaries(summaryList);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div style={{ backgroundColor: '#fff8e1', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
        <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
      </div>

      <Typography variant='h4' align="center">Search Results</Typography>
      <br />

      <Box>
        <Typography variant="h6">Results for "{query}":</Typography>
        <br />
        {loading ? (
          <Typography>Loading...</Typography>
        ) : videosNames.length === 0 ? (
          <Typography>No videos found.</Typography>
        ) : (
          videosNames.map((name, index) => (
            <Box key={index} mb={2} p={2} style={{ backgroundColor: '#fff3e0', borderRadius: '8px' }}>
              <Typography variant="subtitle1">
                <strong>Video Name:</strong> {name}
              </Typography>
              <Typography variant="body2">
                <strong>Summary:</strong> {summaries[index] || 'Loading summary...'}
              </Typography>
              <br />
              <Typography variant='body2'>Download Transcription:</Typography>
              <TranscriptDownloadButton transcription={TranscribeForSearch(name)} />
              <Typography variant='body2'>Download Summary:</Typography>
              <SummeryDownloadButton summarization={summaries[index]} />
            </Box>
          ))
        )}
      </Box>
    </div>
  );
}

export default SearchResults;
