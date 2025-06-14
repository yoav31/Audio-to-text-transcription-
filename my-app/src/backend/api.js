export const handleUpload = async (file, language_input, setLoading, Set_Show_Language_Transcription_Button, Set_Show_Language_Summary_Button) => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language_input);

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
        alert(data.message);
        setLoading(false);
        Set_Show_Language_Transcription_Button(true);
        Set_Show_Language_Summary_Button(true);
  } catch (error) {
    alert("Error uploading file: " + error);
    setLoading(false);
  }
};

export const transcribe = async (file, language_transcription, setLoadingTranscription, Set_Show_Download_Transcription_Buttons) => {
  setLoadingTranscription(true);
  const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));
  
  console.log("API transcribe called with:", {
    baseFileName: baseFileName,
    language_transcription: language_transcription
  });

  try {
    const url = `http://localhost:5000/transcribe?video_name=${encodeURIComponent(baseFileName)}&language=${language_transcription}`;
    console.log("Transcribe URL:", url);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setLoadingTranscription(false);
    Set_Show_Download_Transcription_Buttons(true);
    return data.result || '';
  } catch (error) {
    alert("Error during transcription: " + error);
    setLoadingTranscription(false);
    return '';
  }
};

export const summarize = async (file, language_summary, setLoadingSummary, Set_Show_Download_Summary_Buttons) => {
  setLoadingSummary(true);
  const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));
  try {
    const response = await fetch(
      `http://localhost:5000/summarize?video_name=${encodeURIComponent(baseFileName)}&language=${language_summary}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setLoadingSummary(false);
    Set_Show_Download_Summary_Buttons(true);  
    return data.result || '';
  } catch (error) {
    alert("Error during summary: " + error);
    setLoadingSummary(false);
    return '';
  }
};

export const handleSearch = async (keywords) => {
  try {
    const response = await fetch(`http://localhost:5000/search?keywords=${encodeURIComponent(keywords)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error(err);
    alert("Error fetching search results: " + err);
    return [];
  }
};

export const getAllVideos = async () => {
  try {
    const response = await fetch('http://localhost:5000/videos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.videos || [];
  } catch (err) {
    console.error(err);
    alert("Error fetching all videos: " + err);
    return [];
  }
};

export const SummarizeForSearch = async (videoName, language = 'en') => {
  try {
    const response = await fetch(`http://localhost:5000/summarize?video_name=${encodeURIComponent(videoName)}&language=${language}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result || '';
  } catch (error) {
    console.error('Error fetching summary:', error);
    return '';
  }
};

export const TranscribeForSearch = async (videoName, language = 'en') => {
  try {
    const response = await fetch(`http://localhost:5000/transcribe?video_name=${encodeURIComponent(videoName)}&language=${language}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result || '';
  } catch (error) {
    console.error('Error fetching transcription:', error);
    return '';
  }
};
