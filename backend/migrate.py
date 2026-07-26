import sqlite3

def migrate():
    conn = sqlite3.connect('C:\\Zoom Clone\\backend\\zoom.db')
    cursor = conn.cursor()
    
    # Check if columns exist
    cursor.execute("PRAGMA table_info(users)")
    columns = [col[1] for col in cursor.fetchall()]
    
    print(f"Current users columns: {columns}")
    
    if 'email' not in columns:
        print("Adding email column...")
        # Since email must be unique and we might have existing users without email, 
        # we make it nullable initially or provide a default for existing rows, then set unique constraint.
        # SQLite ALTER TABLE cannot ADD UNIQUE constraint directly.
        # We will add it as nullable, and in production we'd do a full table rebuild.
        cursor.execute("ALTER TABLE users ADD COLUMN email VARCHAR")
        cursor.execute("CREATE UNIQUE INDEX ix_users_email ON users (email)")
        
    if 'hashed_password' not in columns:
        print("Adding hashed_password column...")
        cursor.execute("ALTER TABLE users ADD COLUMN hashed_password VARCHAR")
        
    if 'auth_provider' not in columns:
        print("Adding auth_provider column...")
        cursor.execute("ALTER TABLE users ADD COLUMN auth_provider VARCHAR DEFAULT 'local'")
        
    conn.commit()
    print("Migration complete.")
    conn.close()

if __name__ == "__main__":
    migrate()
