<h1 align="center">🎙️ Speech-To-Text Conversion for Oral Histories & Interviews</h1>

<p align="center">
  <em>Preserving the legacy of World War II veterans through AI-powered transcription, translation, and summarization.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-blue" alt="React">
  <img src="https://img.shields.io/badge/Backend-Python_Flask-green" alt="Flask">
  <img src="https://img.shields.io/badge/Database-MySQL-orange" alt="MySQL">
  <img src="https://img.shields.io/badge/AI-Faster--Whisper-lightgrey" alt="Whisper">
</p>

---

## 📖 Overview

**Motivation:** 
Personal testimonies of soldiers from World War II are an invaluable historical source. However, many are in old formats, spoken in various languages, and remain inaccessible to the general public. In the digital age, preserving this heritage and making it accessible to diverse audiences is of immense importance.

**Goal:** 
Develop an end-to-end system for the **Jewish World War II Museum** to transcribe and summarize historical testimonies into various languages, facilitating deeper understanding and historical research.

## ✨ Features

- **Video Uploads:** Secure platform for users to upload testimony videos.
- **AI Transcription:** Highly accurate speech-to-text conversion using `Faster-Whisper`.
- **Smart Summarization:** Generates concise summaries of testimonies using `NLTK`.
- **Multilingual Support:** Transcripts and summaries are accessible in **Hebrew, English, and Russian** via Google Translator API.
- **Advanced Search:** Perform keyword searches within video summaries and titles to easily locate relevant historical accounts.
- **Secure Access:** Token-based authentication ensures data privacy and controlled access.

## 🛠️ Tech Stack

### Frontend
- **React.js & Material-UI:** For a responsive, accessible, and clean user interface.

### Backend
- **Python Flask:** RESTful API server with modular endpoints for transcription, summarization, translation, and search.
- **AI & NLP capabilities:** 
  - `Faster-Whisper` (Speech-to-Text)
  - `NLTK` (Natural Language Toolkit for summarization)
  - `Google Translator` (Multilingual translation)

### Database
- **MySQL:** Relational database for storing user data, metadata, transcripts, and summaries.

## ⚙️ System Architecture

The platform follows a modular client-server architecture:
1. **Client (JS/React):** User interface for video uploads, semantic search, and reading testimonies.
2. **HTTP Connection:** RESTful API communication between client and server.
3. **Server (Python/Flask):** Handles core logic including:
   - Transcription processing
   - Text summarization
   - Data mining & translation
   - Search engine querying
4. **Database (MySQL):** Persistent storage.

## 👥 Team & Acknowledgments

This project was developed and presented at **SCE Tech Fest 25** (Innovation Sustainability Community, SCE - Shamoon College of Engineering).

- **Developers:** Yoav Haviv Vaknin & Dimitri Shpak
- **Academic Advisors:** Mr. Idan Tubis, Prof. Shlomo Grinberg

---
<p align="center"><i>Ensuring valuable historical records remain accessible for future generations.</i></p>
