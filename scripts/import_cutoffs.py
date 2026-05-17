"""
EduCompass — Import cutoffs.csv into MySQL
Run AFTER extract_cutoffs.py has finished
"""

import pandas as pd
import mysql.connector

# ─────────────────────────────────────────────────────────
# YOUR DETAILS
# ─────────────────────────────────────────────────────────
DB_HOST     = "localhost"
DB_USER     = "root"
DB_PASSWORD = "pranav"
DB_NAME     = "educompass"
CSV_FILE    = r"C:\Users\prana\EDI-SEM4-G5\data\cutoffs.csv"

# ─────────────────────────────────────────────────────────
# CONNECT
# ─────────────────────────────────────────────────────────
conn   = mysql.connector.connect(
    host=DB_HOST, user=DB_USER,
    password=DB_PASSWORD, database=DB_NAME
)
cursor = conn.cursor()
print("✅ Connected to MySQL")

# ─────────────────────────────────────────────────────────
# CREATE TABLE
# ─────────────────────────────────────────────────────────
cursor.execute("DROP TABLE IF EXISTS cutoffs")
cursor.execute("""
    CREATE TABLE cutoffs (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        college_id   VARCHAR(20),
        college_name VARCHAR(500),
        course_code  VARCHAR(20),
        course_name  VARCHAR(300),
        college_type VARCHAR(150),
        exam_type    VARCHAR(20),
        year         INT,
        cap_round    INT,
        category     VARCHAR(20),
        rank_number  INT,
        percentile   DECIMAL(12,7),
        INDEX idx_exam_cat (exam_type, category),
        INDEX idx_college  (college_id),
        INDEX idx_year     (year),
        INDEX idx_perc     (percentile)
    )
""")
conn.commit()
print("✅ Table 'cutoffs' created")

# ─────────────────────────────────────────────────────────
# LOAD AND INSERT
# ─────────────────────────────────────────────────────────
print("Reading CSV...")
df = pd.read_csv(CSV_FILE, encoding='utf-8')
df = df.where(pd.notnull(df), None)
print(f"Total rows to import: {len(df):,}")

batch_size = 2000
total      = 0

for start in range(0, len(df), batch_size):
    batch = df.iloc[start:start + batch_size]
    data  = [
        (
            row['college_id'],
            str(row['college_name'])[:500] if row['college_name'] else None,
            row['course_code'],
            str(row['course_name'])[:300]  if row['course_name']  else None,
            str(row['college_type'])[:150] if row['college_type'] else None,
            row['exam_type'],
            int(row['year']),
            int(row['cap_round']),
            row['category'],
            int(float(row['rank_number'])) if row['rank_number'] and str(row['rank_number']) != 'nan' else None,
            float(row['percentile']) if row['percentile'] else None,
        )
        for _, row in batch.iterrows()
    ]
    cursor.executemany("""
        INSERT INTO cutoffs
        (college_id, college_name, course_code, course_name,
         college_type, exam_type, year, cap_round,
         category, rank_number, percentile)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, data)
    conn.commit()
    total += len(batch)
    print(f"  📦 {total:,} rows inserted...")

print(f"\n✅ Done! {total:,} rows imported into cutoffs table")

cursor.execute("SELECT COUNT(*) FROM cutoffs")
print(f"📊 Total rows in cutoffs: {cursor.fetchone()[0]:,}")

cursor.execute("SELECT exam_type, year, cap_round, COUNT(*) as cnt FROM cutoffs GROUP BY exam_type, year, cap_round ORDER BY exam_type, year, cap_round")
print("\nBreakdown:")
for row in cursor.fetchall():
    print(f"  {row[0]:8s} | {row[1]} | CAP {row[2]} | {row[3]:,} rows")

cursor.close()
conn.close()