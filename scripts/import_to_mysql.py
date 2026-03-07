import pandas as pd
import mysql.connector
import warnings
warnings.filterwarnings("ignore")

# ─────────────────────────────────────
# YOUR DETAILS
# ─────────────────────────────────────
DB_HOST     = "localhost"
DB_USER     = "root"
DB_PASSWORD = "pranav"
DB_NAME     = "educompass"

CLEANED_FOLDER = r"C:\Users\prana\EDI-SEM4-G5\data"

# ─────────────────────────────────────
# CONNECT TO MYSQL
# ─────────────────────────────────────
try:
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = conn.cursor()
    print("✅ Connected to MySQL successfully!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    exit()

print("=" * 60)
print("IMPORTING ALL DATA INTO MYSQL")
print("=" * 60)


# ─────────────────────────────────────
# HELPER FUNCTION
# ─────────────────────────────────────
def import_csv_to_mysql(csv_file, table_name, limit=None):
    print(f"\n📤 Importing: {table_name}")

    try:
        # Read CSV
        df = pd.read_csv(csv_file, encoding="latin-1")

        print(f"  📊 Raw file rows: {len(df)}")
        print(f"  📊 Raw file cols: {len(df.columns)}")

        # Remove completely empty rows
        df = df.dropna(how='all')

        # Limit rows if needed
        if limit:
            df = df.head(limit)

        # Clean column names
        df.columns = [
            str(c).strip()
             .lower()
             .replace(' ', '_')
             .replace('-', '_')
             .replace('/', '_')
             .replace('(', '')
             .replace(')', '')
             .replace('.', '_')
            for c in df.columns
        ]

        # Remove unnamed columns
        df = df[[c for c in df.columns
                 if not c.startswith('unnamed')]]

        # Replace NaN with None
        df = df.where(pd.notnull(df), None)

        print(f"  📊 After cleaning: {len(df)} rows")

        # Drop and recreate table
        cursor.execute(f"DROP TABLE IF EXISTS `{table_name}`")

        # Build CREATE TABLE — use TEXT for everything
        # to avoid truncation errors
        col_definitions = []
        for col in df.columns:
            col_definitions.append(f"`{col}` TEXT")

        create_sql = f"""
            CREATE TABLE `{table_name}` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                {', '.join(col_definitions)}
            ) CHARACTER SET utf8mb4
        """
        cursor.execute(create_sql)
        print(f"  ✅ Table created: {table_name}")

        # Insert in batches of 500
        batch_size = 500
        total = 0

        for i in range(0, len(df), batch_size):
            batch = df.iloc[i:i + batch_size]
            cols  = ', '.join(
                [f'`{c}`' for c in df.columns])
            vals  = ', '.join(
                ['%s'] * len(df.columns))
            sql   = f"""INSERT INTO `{table_name}`
                        ({cols}) VALUES ({vals})"""

            data = []
            for row in batch.values:
                clean_row = []
                for v in row:
                    if v is None:
                        clean_row.append(None)
                    elif isinstance(v, float):
                        import math
                        if math.isnan(v) or math.isinf(v):
                            clean_row.append(None)
                        else:
                            clean_row.append(v)
                    else:
                        clean_row.append(str(v)[:500]
                            if isinstance(v, str) else v)
                data.append(tuple(clean_row))

            cursor.executemany(sql, data)
            conn.commit()
            total += len(batch)
            print(f"  📦 {total} rows inserted...")

        print(f"  ✅ {table_name} — {total} rows done!")
        return total

    except Exception as e:
        import traceback
        print(f"  ❌ {table_name} failed: {e}")
        traceback.print_exc()
        return 0


# ─────────────────────────────────────
# DROP ALL EXISTING TABLES FIRST
# ─────────────────────────────────────
print("\n🗑️  Dropping existing tables...")
tables = ['colleges', 'careers', 'salaries',
          'scholarships', 'placement',
          'dropout_rates', 'company_salaries']
for t in tables:
    cursor.execute(f"DROP TABLE IF EXISTS `{t}`")
    print(f"  ✅ Dropped: {t}")
conn.commit()


# ─────────────────────────────────────
# IMPORT ALL 7 FILES
# ─────────────────────────────────────
results = {}

results['colleges'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/colleges_master.csv",
    "colleges"
)
results['careers'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/careers_master.csv",
    "careers"
)
results['salaries'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/salaries_master.csv",
    "salaries",
    limit=10000
)
results['scholarships'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/scholarships_master.csv",
    "scholarships",
    limit=5000
)
results['placement'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/placement_master.csv",
    "placement"
)
results['dropout_rates'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/dropout_master.csv",
    "dropout_rates"
)
results['company_salaries'] = import_csv_to_mysql(
    f"{CLEANED_FOLDER}/company_salaries.csv",
    "company_salaries"
)


# ─────────────────────────────────────
# FINAL SUMMARY
# ─────────────────────────────────────
print("\n" + "=" * 60)
print("✅ ALL IMPORTS COMPLETE!")
print("=" * 60)

total_rows = 0
for table, count in results.items():
    status = "✅" if count > 0 else "❌"
    print(f"  {status} {table:<25} {count:>8} rows")
    total_rows += count

print(f"\n  📊 Total rows: {total_rows}")
print("\n🎉 EduCompass database is ready in MySQL!")

cursor.close()
conn.close()