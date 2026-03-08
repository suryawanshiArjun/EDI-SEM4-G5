import pandas as pd
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="pranav",
    database="educompass"
)
cursor = conn.cursor()

print("Reading College_data.csv...")
df = pd.read_csv(
    r"C:\Users\prana\EDI-SEM4-G5\data\College_data.csv",
    encoding="latin-1"
)
print(f"Total rows found: {len(df)}")

df.columns = [c.strip() for c in df.columns]
df = df.dropna(subset=['College_Name'])
df = df.where(pd.notnull(df), None)

print("Importing into MySQL...")

inserted  = 0
skipped   = 0
duplicate = 0

for _, row in df.iterrows():
    try:
        # Check duplicate
        cursor.execute(
            "SELECT id FROM colleges WHERE college_name = %s",
            (str(row['College_Name']).strip(),)
        )
        exists = cursor.fetchall()  # fetchall clears unread results

        if exists:
            duplicate += 1
            continue

        cursor.execute("""
            INSERT INTO colleges
            (college_name, state, stream, ug_fee,
             pg_fee, rating, academic_score,
             placement_score, source, city, college_type)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            str(row['College_Name']).strip()[:500] if row['College_Name'] else None,
            str(row['State']).strip()[:255]        if row['State']        else None,
            str(row['Stream']).strip()[:255]       if row['Stream']       else None,
            str(row['UG_fee']).strip()[:255]       if row['UG_fee']       else None,
            str(row['PG_fee']).strip()[:255]       if row['PG_fee']       else None,
            str(row['Rating']).strip()[:255]       if row['Rating']       else None,
            str(row['Academic']).strip()[:255]     if row['Academic']     else None,
            str(row['Placement']).strip()[:255]    if row['Placement']    else None,
            'college_data_2',
            None,
            None
        ))
        inserted += 1

    except Exception as e:
        print(f"Error: {e}")
        skipped += 1

conn.commit()

print(f"\n✅ Done!")
print(f"✅ Inserted:   {inserted} new colleges")
print(f"⚠️ Duplicates: {duplicate} skipped")
print(f"❌ Errors:     {skipped}")

cursor.execute("SELECT COUNT(*) FROM colleges")
total = cursor.fetchone()[0]
print(f"📊 Total colleges in database now: {total}")

cursor.close()
conn.close()
