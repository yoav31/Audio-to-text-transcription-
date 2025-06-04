# db.py (MySQL version)
import os
import mysql.connector
from mysql.connector import errorcode

# Configuration from env vars (or fill in defaults)
DB_CONFIG = {
    'host': os.getenv('MYSQL_HOST', "localhost"),
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
    conn = get_connection()
    print("connection here")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS videos (
            name VARCHAR(255) PRIMARY KEY,
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


def add_new_video(name: str, transcribe: str, source_lang: str):
    """Add a new video to the database."""
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    column = f"transcribe_{source_lang}"
    sql = f"INSERT IGNORE INTO videos (name, {column}, source_lang) VALUES (%s, %s, %s)"
    cur.execute(sql, (name, transcribe, source_lang))
    conn.close()


def search_videos(keywords: str) -> list[str]:
    """Search for videos whose name or summary contains the keywords."""
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    pattern = f"%{keywords}%"
    # search across all summary columns
    sql = (
        "SELECT name FROM videos WHERE name LIKE %s "
        "OR summary_en LIKE %s OR summary_he LIKE %s OR summary_ru LIKE %s"
    )
    cur.execute(sql, (pattern, pattern, pattern, pattern))
    rows = cur.fetchall()
    conn.close()
    return [row[0] for row in rows]


def add_summary(name: str, summary: str, target_lang: str):
    """Insert or replace a video's summary in the database."""
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    column = f"summary_{target_lang}"
    sql = f"UPDATE videos SET {column} = %s WHERE name = %s"
    cur.execute(sql, (summary, name))
    conn.close()


def add_transcribe(name: str, transcribe: str, target_lang: str):
    """Insert or replace a video's transcription in the database."""
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    column = f"transcribe_{target_lang}"
    sql = f"UPDATE videos SET {column} = %s WHERE name = %s"
    cur.execute(sql, (transcribe, name))
    conn.close()


def get_transcribe(video_name: str, target_lang: str) -> str:
    """Get transcription for a video."""
    init_db()
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
    init_db()
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
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE videos SET source_lang = %s WHERE name = %s", (source, video_name))
    conn.close()


def get_source_lang(video_name: str) -> str:
    """Get source language for a video."""
    init_db()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT source_lang FROM videos WHERE name = %s", (video_name,))
    row = cur.fetchone()
    conn.close()
    return row[0] if row else None