# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from moviepy import VideoFileClip
from pydub import AudioSegment
from speech import translate, summarize_audio, transcribe_audio
from db import init_db, add_new_video, get_transcribe, add_transcribe, get_summary, add_summary, search_videos, get_source_lang
from download_nltk_data import download_nltk_resources
import os
import logging

logger = logging.getLogger(__name__)

# Initialize NLTK resources
try:
    download_nltk_resources()
except Exception as e:
    logger.error(f"Failed to download NLTK resources: {e}")
    raise

app = Flask(__name__)
CORS(app)

init_db()

UPLOAD_FOLDER = "uploads"
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
    logger.info("Upload request received")

    if "file" not in request.files:
        logger.warning("No file part in request")
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        logger.warning("No file selected")
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    logger.info(f"Processing file: {filename}")

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    ext = os.path.splitext(filename)[1].lower()
    if ext in [".mp4", ".mov", ".mkv", ".avi"]:
        filepath = extract_audio_from_video(filepath)
    elif ext != ".wav":
        filepath = convert_to_wav(filepath)

    target_lang = request.form.get("language")
    if target_lang not in ["en", "he", "ru"]:
        logger.error(f"Unsupported language: {target_lang}")
        return jsonify({"error": "Unsupported language"}), 400

    try:
        logger.info(f"Starting transcription for {filename} in language {target_lang}")
        transcribe = transcribe_audio(filepath, user_language=target_lang)
    except Exception as e:
        logger.error(f"Transcription failed for {filename}: {e}")
        return jsonify({"error": f"Transcription failed: {e}"}), 500

    filename = filename.split(".")[0]
    add_new_video(filename, transcribe[0], transcribe[1], filepath)

    return jsonify({
        "message": "File processed successfully",
        "video_name": os.path.basename(filepath),
        "language": target_lang,
        "transcribe": transcribe
    }), 200


@app.route("/transcribe", methods=["GET"])
def transcribe_route():
    video = request.args.get("video_name")
    target_lang = request.args.get("language", "he")

    logger.info(f"Transcribe request for video: {video}, language: {target_lang}")

    if not video or target_lang not in ["en", "he", "ru"]:
        logger.error(f"Invalid parameters - video: {video}, language: {target_lang}")
        return jsonify({"error": "Missing or invalid parameters"}), 400

    transcribe = get_transcribe(video, target_lang)
    if transcribe is None:
        logger.info(f"Transcription not found for {video} in {target_lang}, translating from source")
        transcribe_video = get_transcribe(video, get_source_lang(video))
        try:
            transcribe = translate(transcribe_video, get_source_lang(video), target_lang)
        except Exception as e:
            logger.error(f"Translation failed for {video}: {e}")
            return jsonify({"error": f"Transcription failed: {e}"}), 500

        add_transcribe(video, transcribe, target_lang)

    return jsonify({"result": transcribe}), 200

@app.route("/summarize", methods=["GET"])
def summarize_route(cur=None):
    video = request.args.get("video_name")
    target_lang = request.args.get("language", None)

    logger.info(f"Summarize request for video: {video}, language: {target_lang}")

    if not video or target_lang not in ["en", "he", "ru"]:
        logger.error(f"Invalid parameters - video: {video}, language: {target_lang}")
        return jsonify({"error": "Missing or invalid parameters"}), 400

    summary = get_summary(video, target_lang)
    if summary is None:
        logger.info(f"Summary not found for {video} in {target_lang}, generating new summary")
        transcribe_video = get_transcribe(video, get_source_lang(video))
        try:
            summary = summarize_audio(transcribe_video, get_source_lang(video), target_lang)
        except Exception as e:
            logger.error(f"Summarization failed for {video}: {e}")
            return jsonify({"error": f"Summarization failed: {e}"}), 500

        add_summary(video, summary, target_lang)

    return jsonify({"result": summary}), 200

@app.route("/search", methods=["GET"])
def search_route():
    keywords = request.args.get("keywords", None)
    logger.info(f"Search request with keywords: {keywords}")

    if not keywords:
        logger.warning("Search request without keywords")
        return jsonify({"error": "Missing keywords parameter"}), 400

    videos = search_videos(keywords)
    logger.info(f"Search completed, found {len(videos)} videos")
    return jsonify({"results": videos}), 200  # Changed "videos" to "results" to match frontend


@app.route("/videos", methods=["GET"])
def get_all_videos_route():
    """Get all videos from the database"""
    logger.info("Request for all videos")
    
    try:
        from db import get_all_videos
        videos = get_all_videos()
        logger.info(f"Found {len(videos)} videos in database")
        return jsonify({"videos": videos}), 200
    except Exception as e:
        logger.error(f"Error getting all videos: {e}")
        return jsonify({"error": "Failed to retrieve videos"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
