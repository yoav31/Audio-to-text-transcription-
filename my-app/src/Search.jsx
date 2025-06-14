import React, { useEffect, useState } from 'react';
import './Search.css';
import { Typography, Box, Card, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleSearch, getAllVideos, SummarizeForSearch, TranscribeForSearch } from './backend/api';
import SummaryDownloadButton from './components/SummaryDownloadButton';
import TranscriptDownloadButton from './components/TranscriptDownloadButton';
import Loading from './components/Loading';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  
  const [videosNames, setVideosNames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for each video's content and settings
  const [videoData, setVideoData] = useState({});
  // Structure: { videoName: { summaries: {en: '', he: '', ru: ''}, transcriptions: {en: '', he: '', ru: ''}, 
  //                          summaryLanguage: 'en', transcriptionLanguage: 'en', 
  //                          loadingStates: {summary: false, transcription: false} } }

  const containerStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(248, 243, 230, 0.7), rgba(248, 243, 230, 0.7)), url('/photos/special-bg.jpeg')`
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        let names;
        
        if (!query || query.trim() === '') {
          // If no query, fetch all videos
          names = await getAllVideos();
        } else {
          // If query exists, search for specific videos
          names = await handleSearch(query);
        }
        
        setVideosNames(names);
        
        // Initialize video data structure for each video
        const initialVideoData = {};
        names.forEach((name) => {
          initialVideoData[name] = {
            summaries: { en: '', he: '', ru: '' },
            transcriptions: { en: '', he: '', ru: '' },
            summaryLanguage: 'en',
            transcriptionLanguage: 'en',
            loadingStates: { summary: false, transcription: false }
          };
        });
        setVideoData(initialVideoData);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSummaryLanguageChange = (videoName, newLanguage) => {
    setVideoData(prev => ({
      ...prev,
      [videoName]: {
        ...prev[videoName],
        summaryLanguage: newLanguage
      }
    }));
  };

  const handleTranscriptionLanguageChange = (videoName, newLanguage) => {
    setVideoData(prev => ({
      ...prev,
      [videoName]: {
        ...prev[videoName],
        transcriptionLanguage: newLanguage
      }
    }));
  };

  const loadSummary = async (videoName) => {
    const currentLanguage = videoData[videoName]?.summaryLanguage || 'en';
    
    // Check if already loaded for this language
    if (videoData[videoName]?.summaries[currentLanguage]) return;
    
    // Set loading state
    setVideoData(prev => ({
      ...prev,
      [videoName]: {
        ...prev[videoName],
        loadingStates: { ...prev[videoName].loadingStates, summary: true }
      }
    }));
    
    try {
      const summary = await SummarizeForSearch(videoName, currentLanguage);
      setVideoData(prev => ({
        ...prev,
        [videoName]: {
          ...prev[videoName],
          summaries: { ...prev[videoName].summaries, [currentLanguage]: summary },
          loadingStates: { ...prev[videoName].loadingStates, summary: false }
        }
      }));
    } catch (error) {
      console.error('Error loading summary:', error);
      setVideoData(prev => ({
        ...prev,
        [videoName]: {
          ...prev[videoName],
          loadingStates: { ...prev[videoName].loadingStates, summary: false }
        }
      }));
    }
  };

  const loadTranscription = async (videoName) => {
    const currentLanguage = videoData[videoName]?.transcriptionLanguage || 'en';
    
    // Check if already loaded for this language
    if (videoData[videoName]?.transcriptions[currentLanguage]) return;
    
    // Set loading state
    setVideoData(prev => ({
      ...prev,
      [videoName]: {
        ...prev[videoName],
        loadingStates: { ...prev[videoName].loadingStates, transcription: true }
      }
    }));
    
    try {
      const transcription = await TranscribeForSearch(videoName, currentLanguage);
      setVideoData(prev => ({
        ...prev,
        [videoName]: {
          ...prev[videoName],
          transcriptions: { ...prev[videoName].transcriptions, [currentLanguage]: transcription },
          loadingStates: { ...prev[videoName].loadingStates, transcription: false }
        }
      }));
    } catch (error) {
      console.error('Error loading transcription:', error);
      setVideoData(prev => ({
        ...prev,
        [videoName]: {
          ...prev[videoName],
          loadingStates: { ...prev[videoName].loadingStates, transcription: false }
        }
      }));
    }
  };

  return (
    <>
      {/* Video Background with Vintage Film Effects */}
      <div className="video-background-container">
        <video 
          className="video-background" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/photos/trailer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Animated Film Dust Particles */}
      <div className="film-dust">
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
        <div className="dust-particle"></div>
      </div>

      {/* Main Content Container */}
      <div className="historical-container" style={containerStyle}>
        <div className="logo-header">
          <img src="/photos/sce_logo.webp" alt="sce logo" className="sce_logo" />
          <img src="/photos/museum_logo.png" alt="museum logo" className="museum_logo" />
          <img src="/photos/logo-text.png" alt="logo text" className="logo_text" />
        </div>
        
        <Typography variant='h4' className="historical-title" style={{textAlign: 'center'}}>
          Search Results
        </Typography>
        
        <div className="ornamental-divider"></div>
        
        <Typography variant='h6' className="historical-subtitle" style={{textAlign: 'center'}}>
          {(!query || query.trim() === '') ? 'All Available Testimonies' : `Results for: "${query}"`}
        </Typography>

        <div className="search-content">
          {loading ? (
            <div className="loading-container">
              <Loading />
              <Typography className="historical-paragraph" style={{textAlign: 'center', marginTop: '20px'}}>
                {(!query || query.trim() === '') 
                  ? 'Loading all testimonies...'
                  : 'Searching through testimonies...'
                }
              </Typography>
            </div>
          ) : videosNames.length === 0 ? (
            <div className="no-results-section">
              <Typography variant="h5" className="historical-subtitle-heading" style={{textAlign: 'center'}}>
                No Results Found
              </Typography>
              <Typography className="historical-paragraph" style={{textAlign: 'center'}}>
                We couldn't find any testimonies matching your search query. Please try different keywords or check your spelling.
              </Typography>
              <Box className="historical-button-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <Button 
                  className="historical-button"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </Box>
            </div>
          ) : (
            <div className="results-list">
              <Typography variant="h6" className="historical-subtitle-heading" style={{marginBottom: '20px'}}>
                {(!query || query.trim() === '') 
                  ? `Showing all ${videosNames.length} testimony${videosNames.length !== 1 ? 'ies' : ''}:`
                  : `Found ${videosNames.length} testimony${videosNames.length !== 1 ? 'ies' : ''}:`
                }
              </Typography>
              
              {videosNames.map((videoName, index) => {
                const video = videoData[videoName] || {};
                const summaryLanguage = video.summaryLanguage || 'en';
                const transcriptionLanguage = video.transcriptionLanguage || 'en';
                const currentSummary = video.summaries?.[summaryLanguage] || '';
                const currentTranscription = video.transcriptions?.[transcriptionLanguage] || '';
                const loadingStates = video.loadingStates || { summary: false, transcription: false };

                return (
                  <Card key={index} className="result-card">
                    <CardContent className="result-card-content">
                      <Typography variant="h6" className="video-title">
                        {videoName}
                      </Typography>
                      
                      <div className="result-actions">
                        {/* Summary Section */}
                        <div className="action-section">
                          <div className="action-header">
                            <Typography variant="subtitle2" className="action-label">
                              Summary:
                            </Typography>
                            <FormControl size="small" className="language-selector-small">
                              <InputLabel>Language</InputLabel>
                              <Select
                                value={summaryLanguage}
                                label="Language"
                                onChange={(e) => handleSummaryLanguageChange(videoName, e.target.value)}
                              >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="he">Hebrew</MenuItem>
                                <MenuItem value="ru">Russian</MenuItem>
                              </Select>
                            </FormControl>
                          </div>

                          {currentSummary ? (
                            <div className="content-display">
                              <Typography className="content-text">
                                {currentSummary.length > 200 
                                  ? `${currentSummary.substring(0, 200)}...` 
                                  : currentSummary
                                }
                              </Typography>
                              <SummaryDownloadButton 
                                summarization={currentSummary} 
                                language={summaryLanguage}
                              />
                            </div>
                          ) : loadingStates.summary ? (
                            <div className="loading-inline">
                              <Loading />
                              <Typography variant="body2" style={{marginLeft: '10px'}}>
                                Loading summary in {summaryLanguage === 'en' ? 'English' : summaryLanguage === 'he' ? 'Hebrew' : 'Russian'}...
                              </Typography>
                            </div>
                          ) : (
                            <Button 
                              variant="outlined" 
                              className="load-button"
                              onClick={() => loadSummary(videoName)}
                            >
                              Load Summary ({summaryLanguage === 'en' ? 'English' : summaryLanguage === 'he' ? 'Hebrew' : 'Russian'})
                            </Button>
                          )}
                        </div>

                        {/* Transcription Section */}
                        <div className="action-section">
                          <div className="action-header">
                            <Typography variant="subtitle2" className="action-label">
                              Transcription:
                            </Typography>
                            <FormControl size="small" className="language-selector-small">
                              <InputLabel>Language</InputLabel>
                              <Select
                                value={transcriptionLanguage}
                                label="Language"
                                onChange={(e) => handleTranscriptionLanguageChange(videoName, e.target.value)}
                              >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="he">Hebrew</MenuItem>
                                <MenuItem value="ru">Russian</MenuItem>
                              </Select>
                            </FormControl>
                          </div>

                          {currentTranscription ? (
                            <div className="content-display">
                              <Typography className="content-text">
                                {currentTranscription.length > 200 
                                  ? `${currentTranscription.substring(0, 200)}...` 
                                  : currentTranscription
                                }
                              </Typography>
                              <TranscriptDownloadButton 
                                transcription={currentTranscription} 
                                language={transcriptionLanguage}
                              />
                            </div>
                          ) : loadingStates.transcription ? (
                            <div className="loading-inline">
                              <Loading />
                              <Typography variant="body2" style={{marginLeft: '10px'}}>
                                Loading transcription in {transcriptionLanguage === 'en' ? 'English' : transcriptionLanguage === 'he' ? 'Hebrew' : 'Russian'}...
                              </Typography>
                            </div>
                          ) : (
                            <Button 
                              variant="outlined" 
                              className="load-button"
                              onClick={() => loadTranscription(videoName)}
                            >
                              Load Transcription ({transcriptionLanguage === 'en' ? 'English' : transcriptionLanguage === 'he' ? 'Hebrew' : 'Russian'})
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Box className="historical-button-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
          <Button 
            className="historical-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Search; 