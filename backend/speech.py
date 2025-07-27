# speech.py

import nltk
import logging
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from string import punctuation

nltk.download('punkt_tab')
nltk.download('stopwords')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from faster_whisper import WhisperModel
from deep_translator import GoogleTranslator

model = WhisperModel("large-v3", device="cpu", compute_type="int8")


def summarize_nltk_freq(text: str, num_sentences: int = 3) -> str:
    sentences = sent_tokenize(text)
    words = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english') + list(punctuation))

    freq = {}
    for w in words:
        if w not in stop_words:
            freq[w] = freq.get(w, 0) + 1
    max_freq = max(freq.values(), default=1)
    for w in freq:
        freq[w] /= max_freq

    scores = {}
    for sent in sentences:
        for w in word_tokenize(sent.lower()):
            if w in freq:
                scores[sent] = scores.get(sent, 0) + freq[w]

    best = sorted(scores, key=scores.get, reverse=True)[:num_sentences]
    return " ".join(best)


def chunk_sentences(text: str, max_chars: int = 1000) -> list[str]:
    sentences = sent_tokenize(text)
    chunks = []
    current = ""
    for sentence in sentences:
        potential = f"{current} {sentence}".strip() if current else sentence
        if len(potential) > max_chars:
            if current:
                chunks.append(current)
            current = sentence
        else:
            current = potential
    if current:
        chunks.append(current)
    return chunks


def translate_google(text: str, src: str, dest: str) -> str:
    chunks = chunk_sentences(text, max_chars=1000)
    translated = []

    lang_map = {'en': 'english', 'he': 'hebrew', 'ru': 'russian'}
    source_lang = lang_map.get(src, src)
    target_lang = lang_map.get(dest, dest)

    for chunk in chunks:
        try:
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            result = translator.translate(chunk)
            translated.append(result)
        except Exception as e:
            logger.error(f"[translate_google] Error translating chunk: {e}")
            translated.append(chunk)

    return " ".join(translated)


def transcribe_audio(audio_path: str, user_language: str = None):
    segments, info = model.transcribe(audio_path, beam_size=5, language=user_language)
    text = " ".join(seg.text for seg in segments)
    src = user_language if user_language else (info.language if info.language in ['he', 'ru', 'en'] else 'en')
    return text, src


def translate(transcribe: str, source_lang: str, target_lang: str):
    text = transcribe
    if source_lang != target_lang:
        text = translate_google(text, src=source_lang, dest=target_lang)
    return text


def summarize_audio(transcribe: str, source_lang: str, target_lang: str) -> str:
    summary = summarize_nltk_freq(transcribe, num_sentences=5)
    if source_lang != target_lang:
        summary = translate_google(summary, src=source_lang, dest=target_lang)
    return summary
