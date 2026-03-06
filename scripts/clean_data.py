import pandas as pd
import os
import warnings
warnings.filterwarnings("ignore")

# ─────────────────────────────────────
# YOUR EXACT FOLDER PATHS
# ─────────────────────────────────────
base = r"C:\Users\prana\OneDrive\Documents\Desktop\Educompass_data"
out  = r"C:\Users\prana\OneDrive\Documents\Desktop\Educompass_cleaned"
os.makedirs(out, exist_ok=True)

print("=" * 60)
print("CLEANING ALL FILES FOR EDUCOMPASS")
print("=" * 60)


# ─────────────────────────────────────
# 1. COLLEGES MASTER
# ─────────────────────────────────────
print("\n📁 Processing Colleges...")

try:
    college = pd.read_csv(f"{base}/Colleges/College_data.csv", encoding="latin-1")
    college = college[['College_Name','State','Stream','UG_fee','PG_fee',
                       'Rating','Academic','Placement']].copy()
    college.columns = ['college_name','state','stream','ug_fee',
                       'pg_fee','rating','academic_score','placement_score']
    college['source'] = 'college_data'
    print(f"  ✅ College_data.csv loaded — {len(college)} rows")
except Exception as e:
    print(f"  ❌ College_data.csv failed: {e}")
    college = pd.DataFrame()

try:
    eng = pd.read_csv(f"{base}/Colleges/engineering colleges in India.csv", encoding="latin-1")
    eng = eng[['College Name','City','State','College Type',
               'Average Fees','Rating','Courses']].copy()
    eng.columns = ['college_name','city','state','college_type',
                   'ug_fee','rating','stream']
    eng['source'] = 'engineering_india'
    print(f"  ✅ Engineering colleges loaded — {len(eng)} rows")
except Exception as e:
    print(f"  ❌ Engineering colleges failed: {e}")
    eng = pd.DataFrame()

colleges_master = pd.concat([college, eng], ignore_index=True)
colleges_master['college_name'] = colleges_master['college_name'].str.strip().str.title()
colleges_master['state']        = colleges_master['state'].str.strip().str.title()
colleges_master = colleges_master.drop_duplicates(subset=['college_name','state'])
colleges_master = colleges_master.dropna(subset=['college_name'])
colleges_master.to_csv(f"{out}/colleges_master.csv", index=False)
print(f"  ✅ colleges_master.csv saved — {len(colleges_master)} colleges")


# ─────────────────────────────────────
# 2. PLACEMENT MASTER
# ─────────────────────────────────────
print("\n📁 Processing Placement Data...")

placement_dfs = []

placement_files = [
    f"{base}/Colleges/placement_companies.csv",
    f"{base}/salaries/detailed_data.csv",
    f"{base}/location/region_mumbai.csv",
    f"{base}/location/region_pune.csv",
    f"{base}/salaries/variation_3.csv",
]

for filepath in placement_files:
    try:
        df = pd.read_csv(filepath, encoding="latin-1")
        df.drop(columns=[c for c in df.columns if 'Unnamed' in str(c)],
                inplace=True, errors='ignore')
        df['source'] = os.path.basename(filepath)
        placement_dfs.append(df)
        print(f"  ✅ {os.path.basename(filepath)} — {len(df)} rows")
    except Exception as e:
        print(f"  ❌ {os.path.basename(filepath)} failed: {e}")

if placement_dfs:
    placement = pd.concat(placement_dfs, ignore_index=True)
    placement.columns = [c.strip().lower().replace(' ', '_')
                         for c in placement.columns]
    placement = placement.drop_duplicates()
    placement = placement.dropna(subset=['name_of_company'])
    placement['name_of_company'] = placement['name_of_company'].str.strip().str.title()
    placement.to_csv(f"{out}/placement_master.csv", index=False)
    print(f"  ✅ placement_master.csv saved — {len(placement)} records")


# ─────────────────────────────────────
# 3. CAREERS MASTER
# ─────────────────────────────────────
print("\n📁 Processing Career Data...")

try:
    career = pd.read_csv(f"{base}/careers/career_recommender.csv", encoding="latin-1")
    career.columns = ['name','gender','ug_course','ug_specialization',
                      'interests','skills','cgpa_percentage',
                      'certification','cert_title','working',
                      'job_title','masters_field']
    career = career[['gender','ug_course','ug_specialization',
                     'interests','skills','cgpa_percentage','job_title']]
    career['job_title'] = career['job_title'].str.strip()
    career = career[career['job_title'].notna()]
    career = career[career['job_title'].str.upper() != 'NA']
    career['source'] = 'career_recommender'
    print(f"  ✅ career_recommender.csv loaded — {len(career)} rows")
except Exception as e:
    print(f"  ❌ career_recommender.csv failed: {e}")
    career = pd.DataFrame()

try:
    proj = pd.read_excel(f"{base}/careers/Dataset Project 404.xlsx")
    proj = proj[['Course','Job profession','Linguistic','Musical',
                 'Bodily','Logical - Mathematical','Spatial-Visualization',
                 'Interpersonal','Intrapersonal','Naturalist']].copy()
    proj.columns = ['ug_course','job_title','linguistic','musical',
                    'bodily','logical','spatial','interpersonal',
                    'intrapersonal','naturalist']
    proj['source'] = 'aptitude_mapping'
    print(f"  ✅ Dataset Project 404.xlsx loaded — {len(proj)} rows")
except Exception as e:
    print(f"  ❌ Dataset Project 404.xlsx failed: {e}")
    proj = pd.DataFrame()

careers_master = pd.concat([career, proj], ignore_index=True)
careers_master = careers_master.drop_duplicates()
careers_master.to_csv(f"{out}/careers_master.csv", index=False)
print(f"  ✅ careers_master.csv saved — {len(careers_master)} records")


# ─────────────────────────────────────
# 4. SALARIES MASTER
# ─────────────────────────────────────
print("\n📁 Processing Salary Data...")

salary_dfs = []

try:
    s1 = pd.read_csv(f"{base}/salaries/Salary.csv", encoding="latin-1")
    s1 = s1[['Job Title','Education Level','Years of Experience',
              'Salary','Country']].copy()
    s1.columns = ['job_title','education_level','years_experience',
                  'salary','country']
    salary_dfs.append(s1)
    print(f"  ✅ Salary.csv — {len(s1)} rows")
except Exception as e:
    print(f"  ❌ Salary.csv failed: {e}")

try:
    s2 = pd.read_csv(f"{base}/salaries/Salary_Dataset_with_Extra_Features.csv",
                     encoding="latin-1")
    s2 = s2[['Job Title','Salary','Company Name','Location','Job Roles']].copy()
    s2.columns = ['job_title','salary','company','location','job_roles']
    salary_dfs.append(s2)
    print(f"  ✅ Salary_Dataset_with_Extra_Features.csv — {len(s2)} rows")
except Exception as e:
    print(f"  ❌ Salary_Dataset_with_Extra_Features.csv failed: {e}")

try:
    s3 = pd.read_csv(f"{base}/salaries/Software_Professional_Salaries.csv",
                     encoding="latin-1")
    s3 = s3[['Job Title','Salary','Company Name','Location']].copy()
    s3.columns = ['job_title','salary','company','location']
    salary_dfs.append(s3)
    print(f"  ✅ Software_Professional_Salaries.csv — {len(s3)} rows")
except Exception as e:
    print(f"  ❌ Software_Professional_Salaries.csv failed: {e}")

if salary_dfs:
    salaries_master = pd.concat(salary_dfs, ignore_index=True)
    salaries_master['job_title'] = salaries_master['job_title'].str.strip().str.title()
    salaries_master['salary'] = pd.to_numeric(
        salaries_master['salary'].astype(str).str.replace(
            r'[^\d.]', '', regex=True), errors='coerce')
    salaries_master = salaries_master.dropna(subset=['salary'])
    salaries_master = salaries_master[salaries_master['salary'] > 0]
    salaries_master.to_csv(f"{out}/salaries_master.csv", index=False)
    print(f"  ✅ salaries_master.csv saved — {len(salaries_master)} records")

try:
    s4 = pd.read_csv(f"{base}/salaries/variation_2.csv", encoding="latin-1")
    s4.columns = ['company','salary']
    s4.to_csv(f"{out}/company_salaries.csv", index=False)
    print(f"  ✅ company_salaries.csv saved — {len(s4)} records")
except Exception as e:
    print(f"  ❌ variation_2.csv failed: {e}")


# ─────────────────────────────────────
# 5. DROPOUT MASTER
# ─────────────────────────────────────
print("\n📁 Processing Dropout Data...")

try:
    dor = pd.read_csv(f"{base}/students/DOR.csv", encoding="latin-1")
    dor.columns = [c.strip().lower().replace(' ', '_') for c in dor.columns]
    dor['state_ut'] = dor['state_ut'].str.strip().str.title()
    dor = dor.dropna(subset=['state_ut'])
    dor.to_csv(f"{out}/dropout_master.csv", index=False)
    print(f"  ✅ dropout_master.csv saved — {len(dor)} records")
except Exception as e:
    print(f"  ❌ DOR.csv failed: {e}")


# ─────────────────────────────────────
# 6. SCHOLARSHIPS MASTER
# ─────────────────────────────────────
print("\n📁 Processing Scholarship Data...")

scholarship_files = {
    "Pragati_AICTE":       "Pragati Scholarship  AICTE-Scholarship Scheme to Girl Child.xlsx",
    "AAI_Sports":          "AAI Sports Scholarship Scheme in India 2022-23.xlsx",
    "Abdul_Kalam":         "Abdul Kalam Technology Innovation National Fellowship.xlsx",
    "Dr_Ambedkar":         "Dr. Ambedkar post matric Scholarship.xlsx",
    "Glow_Lovely":         "Glow and lovely Career Foundation Scholarship.xlsx",
    "Indira_Gandhi":       "Indira Gandhi Scholarship for Single Girl Child UGC Scholarship for PG Programmes.xlsx",
    "INSPIRE":             "INSPIRE Scholarship 2022-23  Scholarship for Higher Education (SHE).xlsx",
    "National_Disability": "National Fellowship for Persons with Disabilities.xlsx",
    "National_Overseas":   "National Overseas Scholarship Scheme 2021-22.xlsx",
    "ONGC_Sports":         "ONGC Sports Scholarship Scheme 2022-23.xlsx",
}

all_scholarships = []

for name, filename in scholarship_files.items():
    try:
        filepath = f"{base}/scholarships/{filename}"
        df = pd.read_excel(filepath)
        df = df.dropna(how='all')

        outcome_col = 'Outcome' if 'Outcome' in df.columns else 'Scholarship'
        df = df[df[outcome_col].notna()]

        keep_cols = ['Education Qualification','Gender','Community',
                     'Religion','Disability','Annual-Percentage',
                     'Income','India', outcome_col]
        df = df[[c for c in keep_cols if c in df.columns]]
        df['scholarship_name'] = name
        df = df.rename(columns={outcome_col: 'eligible'})

        all_scholarships.append(df)
        print(f"  ✅ {name} — {len(df)} rows")
    except Exception as e:
        print(f"  ❌ {name} failed: {e}")

if all_scholarships:
    scholarships_master = pd.concat(all_scholarships, ignore_index=True)
    scholarships_master = scholarships_master.drop_duplicates()
    scholarships_master.to_csv(f"{out}/scholarships_master.csv", index=False)
    print(f"  ✅ scholarships_master.csv saved — {len(scholarships_master)} records")


# ─────────────────────────────────────
# FINAL SUMMARY
# ─────────────────────────────────────
print("\n" + "=" * 60)
print("✅ ALL CLEANING COMPLETE!")
print("=" * 60)
print(f"\n📂 Cleaned files saved in:")
print(f"   {out}")
print("\nYour final master files:")

total_size = 0
for f in sorted(os.listdir(out)):
    filepath = os.path.join(out, f)
    size_kb  = os.path.getsize(filepath) / 1024
    total_size += size_kb
    print(f"  ✅ {f:<45} {size_kb:>8.0f} KB")

print(f"\n📊 Total database size: {total_size/1024:.1f} MB")
print("\n🎉 Your database is ready to import into MySQL!")