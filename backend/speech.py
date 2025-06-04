# speech.py

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from string import punctuation

# הורדת משאבי NLTK (פעם אחת בלבד)
nltk.download('punkt')
nltk.download('stopwords')

from faster_whisper import WhisperModel
from deep_translator import GoogleTranslator

# 1. טעינת Whisper (CPU, int8)
print("Loading Whisper Model...")
model = WhisperModel("large-v3", device="cpu", compute_type="int8")
print("Whisper loaded.")


# 3. סיכום extractive מבוסס תדירויות מילים

def summarize_nltk_freq(text: str, num_sentences: int = 3) -> str:
    sentences = sent_tokenize(text)
    words = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english') + list(punctuation))

    # בניית טבלת תדירויות
    freq = {}
    for w in words:
        if w not in stop_words:
            freq[w] = freq.get(w, 0) + 1
    max_freq = max(freq.values(), default=1)
    for w in freq:
        freq[w] /= max_freq

    # דירוג משפטים
    scores = {}
    for sent in sentences:
        for w in word_tokenize(sent.lower()):
            if w in freq:
                scores[sent] = scores.get(sent, 0) + freq[w]

    # בחירת top N משפטים
    best = sorted(scores, key=scores.get, reverse=True)[:num_sentences]
    return " ".join(best)


# 4. חיתוך טקסט לפסקאות

def chunk_sentences(text: str, max_chars: int = 1000) -> list[str]:
    sentences = sent_tokenize(text)
    chunks = []
    current = ""
    for sentence in sentences:
        # נסמן את potential כשילוב של current והמשפט החדש
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


# 5. תרגום עם deep-translator + טיפול ב-chunks
def translate_google(text: str, src: str, dest: str) -> str:
    chunks = chunk_sentences(text, max_chars=1000)
    translated = []

    # מיפוי שפות לפורמט שנתמך ב-deep-translator
    lang_map = {'en': 'english', 'he': 'hebrew', 'ru': 'russian'}
    source_lang = lang_map.get(src, src)
    target_lang = lang_map.get(dest, dest)

    for chunk in chunks:
        try:
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            result = translator.translate(chunk)
            translated.append(result)
        except Exception as e:
            print(f"[translate_google] Error translating chunk: {e}")
            # במקרה של שגיאה, השאר את הטקסט המקורי
            translated.append(chunk)

    return " ".join(translated)


# 6. תמלול גלוי בלבד - עם שינוי קטן
def transcribe_audio(audio_path: str, user_language: str = None):
    segments, info = model.transcribe(audio_path, beam_size=5, language=user_language)
    text = " ".join(seg.text for seg in segments)
    src = user_language if user_language else (info.language if info.language in ['he', 'ru', 'en'] else 'en')
    return text, src


# 7. תמלול + תרגום עם deep-translator
def transcribe_and_translate(transcribe: str, source_lang: str, target_lang: str):
    text = transcribe
    if source_lang != target_lang:
        print("2.1")
        print(text)
        # שימוש בפונקציית התרגום המעודכנת
        text = translate_google(text, src=source_lang, dest=target_lang)
        print("2.2")
        print(text)
    return text


# 8. סיכום extractive + תרגום חזרה
def summarize_audio(transcribe: str, source_lang: str, target_lang: str) -> str:
    # 1. סיכום ראשוני בטקסט המקורי
    summary = summarize_nltk_freq(transcribe, num_sentences=5)
    # 2. אם שפת היעד שונה, לתרגם עם deep-translator
    if source_lang != target_lang:
        summary = translate_google(summary, src=source_lang, dest=target_lang)
    return summary