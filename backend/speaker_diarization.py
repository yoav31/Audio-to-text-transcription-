from pyannote.audio import Pipeline

# לשים כאן את ה-Token שלך
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization",
                                    use_auth_token="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")

def diarize(audio_path):
    diarization = pipeline(audio_path)
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        print(f"start={turn.start:.1f}s stop={turn.end:.1f}s speaker={speaker}")
