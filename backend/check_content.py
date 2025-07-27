from db import get_connection

def check_database_content():
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("SELECT name, summary_en, summary_he, transcribe_he FROM videos LIMIT 1")
    row = cur.fetchone()
    
    if row:
        print("Video name:", row[0])
        print("\nEnglish summary:")
        print(row[1] if row[1] else "None")
        print("\nHebrew summary:")
        print(row[2] if row[2] else "None")
        print("\nHebrew transcription (first 300 chars):")
        print(row[3][:300] if row[3] else "None")
    
    conn.close()

if __name__ == "__main__":
    check_database_content() 