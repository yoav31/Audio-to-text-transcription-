import os
print("Start Import")
from speech import transcribe_audio
print("Import Success")

file_path = os.path.join("uploads", "fixed_audio.wav")

print("Starting Transcription...")

try:
    print(transcribe_audio(file_path))
except Exception as e:
    print("ERROR:", e)

print("Done!")
