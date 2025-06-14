# db.py

import os
import logging
import mysql.connector
from mysql.connector import errorcode

logger = logging.getLogger(__name__)

DB_CONFIG = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'port': int(os.getenv('MYSQL_PORT', 3306)),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', 'yoav3112000'),
    'database': os.getenv('MYSQL_DATABASE', 'final_project'),
    'autocommit': True,
}

def get_connection():
    """Open a connection to the MySQL database."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            # database does not exist, create it
            tmp = mysql.connector.connect(
                host=DB_CONFIG['host'],
                port=DB_CONFIG['port'],
                user=DB_CONFIG['user'],
                password=DB_CONFIG['password'],
                autocommit=True,
            )
            cur = tmp.cursor()
            cur.execute(f"CREATE DATABASE `{DB_CONFIG['database']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
            tmp.close()
            return mysql.connector.connect(**DB_CONFIG)
        else:
            raise


def init_db():
    """Initialize the database schema if it doesn't exist."""
    logger.info("Initializing database schema")
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS videos (
            name VARCHAR(255) PRIMARY KEY,
            audio_file_url VARCHAR(500),
            summary_en TEXT,
            summary_he TEXT,
            summary_ru TEXT,
            transcribe_en TEXT,
            transcribe_he TEXT,
            transcribe_ru TEXT,
            source_lang VARCHAR(2)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)
    conn.close()


def add_new_video(name: str, transcribe: str, source_lang: str, audio_url: str = None):
    """Add a new video to the database."""
    conn = get_connection()
    cur = conn.cursor()
    column = f"transcribe_{source_lang}"
    sql = f"INSERT IGNORE INTO videos (name, {column}, source_lang, audio_file_url) VALUES (%s, %s, %s, %s)"
    cur.execute(sql, (name, transcribe, source_lang, audio_url))
    conn.close()


def search_videos(keywords: str) -> list[str]:
    """Search for videos whose name, summary, or transcription contains the keywords."""
    conn = get_connection()
    cur = conn.cursor()
    
    # Split keywords and create individual patterns for better matching
    words = keywords.lower().split()
    pattern_conditions = []
    params = []
    
    for word in words:
        word_pattern = f"%{word}%"
        # Search in name (case insensitive)
        pattern_conditions.append("LOWER(name) LIKE %s")
        params.append(word_pattern)
        
        # Search in summaries (case insensitive)
        pattern_conditions.append("LOWER(summary_en) LIKE %s")
        params.append(word_pattern)
        pattern_conditions.append("LOWER(summary_he) LIKE %s")
        params.append(word_pattern)
        pattern_conditions.append("LOWER(summary_ru) LIKE %s")
        params.append(word_pattern)
        
        # Search in transcriptions (case insensitive)
        pattern_conditions.append("LOWER(transcribe_en) LIKE %s")
        params.append(word_pattern)
        pattern_conditions.append("LOWER(transcribe_he) LIKE %s")
        params.append(word_pattern)
        pattern_conditions.append("LOWER(transcribe_ru) LIKE %s")
        params.append(word_pattern)
    
    # Combine all conditions with OR
    sql = f"SELECT DISTINCT name FROM videos WHERE {' OR '.join(pattern_conditions)} ORDER BY name"
    
    print(f"Search query: {sql}")  # Using print instead of logger
    print(f"Search parameters: {params}")
    
    cur.execute(sql, params)
    rows = cur.fetchall()
    conn.close()
    
    results = [row[0] for row in rows]
    print(f"Search for '{keywords}' found {len(results)} videos")  # Using print instead of logger
    return results


def add_summary(name: str, summary: str, target_lang: str):
    """Insert or replace a video's summary in the database."""
    conn = get_connection()
    cur = conn.cursor()
    column = f"summary_{target_lang}"
    sql = f"UPDATE videos SET {column} = %s WHERE name = %s"
    cur.execute(sql, (summary, name))
    conn.close()


def add_transcribe(name: str, transcribe: str, target_lang: str):
    """Insert or replace a video's transcription in the database."""
    conn = get_connection()
    cur = conn.cursor()
    column = f"transcribe_{target_lang}"
    sql = f"UPDATE videos SET {column} = %s WHERE name = %s"
    cur.execute(sql, (transcribe, name))
    conn.close()


def get_transcribe(video_name: str, target_lang: str) -> str:
    """Get transcription for a video."""
    conn = get_connection()
    cur = conn.cursor()
    column = f"transcribe_{target_lang}"
    sql = f"SELECT {column} FROM videos WHERE name = %s"
    cur.execute(sql, (video_name,))
    row = cur.fetchone()
    conn.close()
    return row[0] if row else None


def get_summary(video_name: str, target_lang: str) -> str:
    """Get summary for a video."""
    conn = get_connection()
    cur = conn.cursor()
    column = f"summary_{target_lang}"
    sql = f"SELECT {column} FROM videos WHERE name = %s"
    cur.execute(sql, (video_name,))
    row = cur.fetchone()
    conn.close()
    return row[0] if row else None


def set_source_lang(video_name: str, source: str):
    """Set source language for a video."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE videos SET source_lang = %s WHERE name = %s", (source, video_name))
    conn.close()


def get_source_lang(video_name: str) -> str:
    """Get source language for a video."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT source_lang FROM videos WHERE name = %s", (video_name,))
    row = cur.fetchone()
    conn.close()
    return row[0] if row else None


def get_all_videos() -> list[str]:
    """Get all video names from the database."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT name FROM videos ORDER BY name")
    rows = cur.fetchall()
    conn.close()
    return [row[0] for row in rows]
