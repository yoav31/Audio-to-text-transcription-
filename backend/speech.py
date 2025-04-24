from faster_whisper import WhisperModel

print("Loading Whisper Model...")
model = WhisperModel("medium", device="cpu", compute_type="int8")
print("Model Loaded!")

def transcribe_audio(audio_path, language):
    print(f"Starting transcription for: {audio_path}")

    # אם המשתמש לא שלח language → נזהה לבד
    if not language:
        segments, info = model.transcribe(audio_path, beam_size=5, language=None)
        language = info.language
        print("Detected language:", language)

        if language not in ["he", "en", "ru"]:
            print("Unknown language detected, forcing English")
            language = "en"

    segments, info = model.transcribe(audio_path, language=language, beam_size=5)

    print("Transcription Finished!")
    text = " ".join(segment.text for segment in segments)
    return text
