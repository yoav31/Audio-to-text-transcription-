from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from moviepy import VideoFileClip
from pydub import AudioSegment
from speech import transcribe_audio
from speaker_diarization import diarize
import os



app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# פונקציה לחילוץ אודיו מקובץ וידאו
def extract_audio_from_video(video_path):
    audio_path = os.path.splitext(video_path)[0] + ".wav"
    clip = VideoFileClip(video_path)
    clip.audio.write_audiofile(audio_path, fps=16000, nbytes=2, codec="pcm_s16le")
    return audio_path

# פונקציה להמרת אודיו רגיל ל-WAV תקני
def convert_to_wav(source_path):
    output_path = os.path.splitext(source_path)[0] + ".wav"
    audio = AudioSegment.from_file(source_path)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    audio.export(output_path, format="wav")
    return output_path

@app.route("/")
def index():
    return "Speech-to-Text API is running."

@app.route("/upload", methods=["POST"])
def upload_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    ext = os.path.splitext(filename)[1].lower()

    if ext in [".mp4", ".mov", ".mkv", ".avi"]:
        filepath = extract_audio_from_video(filepath)
    elif ext != ".wav":
        filepath = convert_to_wav(filepath)

    # נבדוק אם נשלח שדה של language
    language = request.form.get("language")

    transcription = transcribe_audio(filepath, language)
    return jsonify({
        "message": "File processed successfully",
        "path": filepath,
        "transcription": transcription
    }), 200



if __name__ == "__main__":
    app.run(debug=True)