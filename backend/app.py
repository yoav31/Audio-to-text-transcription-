# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from moviepy import VideoFileClip
from pydub import AudioSegment
from speech import transcribe_and_translate, summarize_audio, transcribe_audio 
from db import add_new_video, get_transcribe, get_summary, add_transcribe, add_summary, search_videos, get_source_lang 
import os

app = Flask(__name__)
CORS(app)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER



def extract_audio_from_video(video_path: str) -> str:
    audio_path = os.path.splitext(video_path)[0] + ".wav"
    clip = VideoFileClip(video_path)
    clip.audio.write_audiofile(
        audio_path,
        fps=16000,
        nbytes=2,
        codec="pcm_s16le",
        verbose=False,
        logger=None
    )
    return audio_path


def convert_to_wav(source_path: str) -> str:
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

    target_lang = request.form.get("language_input")
    if target_lang not in ["en", "he", "ru"]:
        return jsonify({"error": "Unsupported language"}), 400

    # השינוי היחיד - מעבירים את השפה שהמשתמש בחר
    transcribe = transcribe_audio(filepath, user_language=target_lang)

    filename = filename.split(".")[0]
    print("we here")
    # שמירת התמלול השפה ושם הסרטון בדאטה
    add_new_video(filename, transcribe[0], transcribe[1])

    return jsonify({
        "message": "File processed successfully",
        "video_name": os.path.basename(filepath),
        "language": target_lang,
        "transcribe": transcribe
    }), 200


@app.route("/transcribe", methods=["GET"])
def transcribe_route():
    video = request.args.get("video_name")
    target_lang = request.args.get("language")
    if not video or target_lang not in ["en", "he", "ru"]:
        return jsonify({"error": "Missing or invalid parameters"}), 400

    transcribe = get_transcribe(video, target_lang)
    if transcribe is None:
        transcribe_video = get_transcribe(video, get_source_lang(video))
        try:
            
            transcribe = transcribe_and_translate(transcribe_video, get_source_lang(video), target_lang)
            
        except Exception as e:
            return jsonify({"error": f"Transcription failed: {e}"}), 500

        # שמירת התמלול במסד הנתונים
        add_transcribe(video, transcribe, target_lang)
        print("Transcription completed successfully.")
    return jsonify({"result": transcribe}), 200


@app.route("/summarize", methods=["GET"])
def summarize_route(cur=None):
    video = request.args.get("video_name")
    target_lang = request.args.get("language")
    if not video or target_lang not in ["en", "he", "ru"]:
        return jsonify({"error": "Missing or invalid parameters"}), 400

    summary = get_summary(video, target_lang)
    if summary is None:
        transcribe_video = get_transcribe(video, get_source_lang(video))
        try:
            summary = summarize_audio(transcribe_video, get_source_lang(video), target_lang)
        except Exception as e:
            return jsonify({"error": f"Summarization failed: {e}"}), 500

        # שמירת התקציר במסד הנתונים
        add_summary(video, summary, target_lang)

    return jsonify({"result": summary}), 200


@app.route("/search", methods=["GET"])
def search_route():
    keywords = request.args.get("keywords", None)
    if not keywords:
        return jsonify({"error": "Missing keywords parameter"}), 400

    videos = search_videos(keywords)
    return jsonify({"videos": videos}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)