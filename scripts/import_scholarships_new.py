import pandas as pd
import mysql.connector
import warnings
warnings.filterwarnings("ignore")

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="pranav",
    database="educompass"
)
cursor = conn.cursor()

print("Creating scholarships_new table...")
cursor.execute("DROP TABLE IF EXISTS scholarships_new")
cursor.execute("""
    CREATE TABLE scholarships_new (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        scholarship_name VARCHAR(500),
        provider         VARCHAR(300),
        field            VARCHAR(100),
        state            VARCHAR(100),
        gender           VARCHAR(20),
        community        VARCHAR(50),
        religion         VARCHAR(50),
        qualification    VARCHAR(100),
        income           VARCHAR(50),
        percentage       VARCHAR(50),
        amount           VARCHAR(100),
        deadline         VARCHAR(50),
        apply_link       VARCHAR(500)
    )
""")
print("Table created!")

df = pd.read_csv(
    r"C:\Users\prana\EDI-SEM4-G5\data\scholarships_5000.csv",
    encoding="utf-8"
)
df = df.where(pd.notnull(df), None)
print(f"Loaded {len(df)} rows from CSV")

inserted = 0
errors   = 0

for _, row in df.iterrows():
    try:
        cursor.execute("""
            INSERT INTO scholarships_new
            (scholarship_name, provider, field, state,
             gender, community, religion, qualification,
             income, percentage, amount, deadline, apply_link)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            str(row['scholarship_name'])[:500] if row['scholarship_name'] else None,
            str(row['provider'])[:300]         if row['provider']         else None,
            str(row['field'])[:100]            if row['field']            else None,
            str(row['state'])[:100]            if row['state']            else None,
            str(row['Gender'])[:20]            if row['Gender']           else None,
            str(row['Community'])[:50]         if row['Community']        else None,
            str(row['Religion'])[:50]          if row['Religion']         else None,
            str(row['Education Qualification'])[:100] if row['Education Qualification'] else None,
            str(row['Income'])[:50]            if row['Income']           else None,
            str(row['Annual-Percentage'])[:50] if row['Annual-Percentage'] else None,
            str(row['amount'])[:100]           if row['amount']           else None,
            str(row['deadline'])[:50]          if row['deadline']         else None,
            str(row['apply_link'])[:500]       if row['apply_link']       else None,
        ))
        inserted += 1
    except Exception as e:
        errors += 1
        print(f"Error: {e}")

conn.commit()
print(f"\n✅ Inserted: {inserted}")
print(f"❌ Errors:   {errors}")
cursor.execute("SELECT COUNT(*) FROM scholarships_new")
print(f"📊 Total in DB: {cursor.fetchone()[0]}")
cursor.close()
conn.close()
print("\n🎉 Done! scholarships_new table is ready.")