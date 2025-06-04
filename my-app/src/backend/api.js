
export let transcription = "";
export let summarization = "";


export const handleUpload = async (file, language_input, setLoading, Set_Show_Language_Buttons) => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language_input", language_input);

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
        alert(data.message);
        setLoading(false);
        Set_Show_Language_Buttons(true);
  } catch (error) {
    alert("Error uploading file." + error);
    setLoading(false);
  }
};

export const transcribe = async (file, language_transcription, setLoadingTranscription, Set_Show_Download_Transcription_Buttons) => {
  if (!file || !language_transcription) {
    alert("Missing file or target language.");
    return;
  }

  setLoadingTranscription(true);
  const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));

  try {
    const response = await fetch(
      `http://localhost:5000/transcribe?video_name=${encodeURIComponent(baseFileName)}&language=${language_transcription}`
    );

    const data = await response.json();
    transcription = data.transcribe;
    setLoadingTranscription(false);
    Set_Show_Download_Transcription_Buttons(true);
  } catch (error) {
    alert("Error during transcription: " + error);
    setLoadingTranscription(false);
  }
};

export const summarize = async (file, language_summary, setLoadingSummary, Set_Show_Download_Summary_Buttons) => {
  
    if (!file || !language_summary) {   
    alert("Missing file or target language for summary.");
    return;
  }
  setLoadingSummary(true);
  try {
    const response = await fetch(
      `http://localhost:5000/summarize?video_name=${file.name.split('.')[0]}&language=${language_summary}`
    );
    const data = await response.json();
    summarization = data.summary;
    setLoadingSummary(false);
    Set_Show_Download_Summary_Buttons(true);    
  } catch (error) {
    alert("Error during summary: " + error);
    setLoadingSummary(false);
  }  
};
