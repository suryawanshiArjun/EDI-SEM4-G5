import pandas as pd
import os
import warnings
warnings.filterwarnings("ignore")

base_folder = r"C:\Users\prana\OneDrive\Documents\Desktop\Educompass_data"

print("=" * 60)
print("EXPLORING ALL YOUR FILES")
print("=" * 60)

for folder in sorted(os.listdir(base_folder)):
    folder_path = os.path.join(base_folder, folder)
    if not os.path.isdir(folder_path):
        continue
        
    print(f"\n📁 {folder}")
    print("─" * 40)
    
    for file in sorted(os.listdir(folder_path)):
        filepath = os.path.join(folder_path, file)
        
        try:
            if file.endswith(".csv"):
                df = pd.read_csv(filepath, encoding="latin-1", nrows=3)
            elif file.endswith(".xlsx") or file.endswith(".xls"):
                df = pd.read_excel(filepath, nrows=3)
            elif file.endswith(".txt"):
                df = pd.read_csv(filepath, sep="\t", nrows=3)
            else:
                continue
                
            print(f"\n  📄 {file}")
            print(f"     Rows    : checking full file...")
            
            # Get actual row count
            if file.endswith(".csv"):
                full_df = pd.read_csv(filepath, encoding="latin-1")
            elif file.endswith(".txt"):
                full_df = pd.read_csv(filepath, sep="\t")
            else:
                full_df = pd.read_excel(filepath)
                
            print(f"     Rows    : {len(full_df)}")
            print(f"     Columns : {len(full_df.columns)}")
            print(f"     Names   : {list(full_df.columns)}")
            
        except Exception as e:
            print(f"\n  ❌ {file} — Error: {e}")

print("\n" + "=" * 60)
print("EXPLORATION COMPLETE")
print("=" * 60)