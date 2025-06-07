
export const handleUpload = async (file, language_input, setLoading,Set_Show_Language_Transcription_Button, Set_Show_Language_Summary_Button) => {
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

    const data = await response.json();
        alert(data.message);
        setLoading(false);
        Set_Show_Language_Transcription_Button(true);
        Set_Show_Language_Summary_Button(true);
  } catch (error) {
    alert("Error uploading file." + error);
    setLoading(false);
  }
};

export const transcribe = async (file, language_transcription, setLoadingTranscription, Set_Show_Download_Transcription_Buttons) => {

  setLoadingTranscription(true);
  const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));

  try {
    const response = await fetch(
      `http://localhost:5000/transcribe?video_name=${encodeURIComponent(baseFileName)}&language=${language_transcription}`
    );

    const data = await response.json();
    setLoadingTranscription(false);
    Set_Show_Download_Transcription_Buttons(true);
    return data.result;
  } catch (error) {
    alert("Error during transcription: " + error);
    setLoadingTranscription(false);
  }
};

export const summarize = async (file, language_summary, setLoadingSummary, Set_Show_Download_Summary_Buttons) => {
  
  setLoadingSummary(true);
  const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));
  try {
    const response = await fetch(
      `http://localhost:5000/summarize?video_name=${encodeURIComponent(baseFileName)}&language=${language_summary}`
    );
    const data = await response.json();
    setLoadingSummary(false);
    Set_Show_Download_Summary_Buttons(true);  
    return data.result;  
  } catch (error) {
    alert("Error during summary: " + error);
    setLoadingSummary(false);
  }
};
export const handleSearch = async (keywords) => {
  try {
    const response = await fetch(`/search?keywords=${encodeURIComponent(keywords)}`);
    const data = await response.json();
    const answer = data.results;
    return answer;
  } catch (err) {
    console.error(err);
    return alert("Error fetching search results."+ err);
  }
};

export const TranscribeForSearch = async (videoName) => {
  try {
    const response = await fetch(
      `http://localhost:5000/transcribe?video_name=${encodeURIComponent(videoName)}&language=${"he"}`
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    alert("Error during transcription: " + error);
  }
};

export const SummarizeForSearch = async (videoName) => {
  try {
    const response = await fetch(
      `http://localhost:5000/summarize?video_name=${encodeURIComponent(videoName)}&language=${"he"}`
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    alert("Error during summary: " + error);
  }
};
