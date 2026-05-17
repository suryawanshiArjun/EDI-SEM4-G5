import re
import csv
import os
import subprocess

PDF_FOLDER  = r"C:\Users\prana\EDI-SEM4-G5\pdfs"
OUTPUT_FILE = r"C:\Users\prana\EDI-SEM4-G5\data\cutoffs.csv"

PDF_FILES = [
    ("2022ENGG_CAP1_CutOff.pdf",   2022, 1, "ENGG"),
    ("2022ENGG_CAP2_CutOff.pdf",   2022, 2, "ENGG"),
    ("2022ENGG_CAP3_CutOff.pdf",   2022, 3, "ENGG"),
    ("2023ENGG_CAP1_CutOff.pdf",   2023, 1, "ENGG"),
    ("2023ENGG_CAP2_CutOff.pdf",   2023, 2, "ENGG"),
    ("2023ENGG_CAP3_CutOff.pdf",   2023, 3, "ENGG"),
    ("2024ENGG_CAP1_CutOff.pdf",   2024, 1, "ENGG"),
    ("2024ENGG_CAP2_CutOff.pdf",   2024, 2, "ENGG"),
    ("2024ENGG_CAP3_CutOff.pdf",   2024, 3, "ENGG"),
    ("2022PHARMA_CAP1_CutOff.pdf", 2022, 1, "PHARMA"),
    ("2022PHARMA_CAP2_CutOff.pdf", 2022, 2, "PHARMA"),
    ("2022PHARMA_CAP3_CutOff.pdf", 2022, 3, "PHARMA"),
    ("2023PHARMA_CAP1_CutOff.pdf", 2023, 1, "PHARMA"),
    ("2023PHARMA_CAP2_CutOff.pdf", 2023, 2, "PHARMA"),
    ("2023PHARMA_CAP3_CutOff.pdf", 2023, 3, "PHARMA"),
    ("2024PHARMA_CAP1_CutOff.pdf", 2024, 1, "PHARMA"),
    ("2024PHARMA_CAP2_CutOff.pdf", 2024, 2, "PHARMA"),
    ("2024PHARMA_CAP3_CutOff.pdf", 2024, 3, "PHARMA"),
]

college_pat = re.compile(r'^(\d{4})\s*-\s*(.+)$')
course_pat  = re.compile(r'^(\d{6,})\s*-\s*(.+)$')
status_pat  = re.compile(r'Status\s*:\s*(.+)', re.IGNORECASE)
cat_pat     = re.compile(r'\b([GL][A-Z0-9]+[SNHO])\b')
perc_pat    = re.compile(r'\((\d+\.\d+)\)')
rank_pat    = re.compile(r'\b(\d{3,6})\b')


def extract_text(pdf_path):
    result = subprocess.run(
        ['pdftotext', '-layout', pdf_path, '-'],
        capture_output=True, text=True
    )
    return result.stdout


def parse_pdf(text, year, cap_round, exam_type):
    rows  = []
    lines = text.split('\n')

    college_id   = ''
    college_name = ''
    course_code  = ''
    course_name  = ''
    college_type = ''
    categories   = []

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        m = college_pat.match(line)
        if m and len(m.group(1)) == 4:
            college_id   = m.group(1).strip()
            college_name = m.group(2).strip()
            i += 1
            continue

        m2 = course_pat.match(line)
        if m2:
            course_code = m2.group(1).strip()
            course_name = m2.group(2).strip()
            categories  = []
            i += 1
            continue

        m3 = status_pat.search(line)
        if m3:
            college_type = m3.group(1).strip()
            i += 1
            continue

        cats = cat_pat.findall(line)
        if len(cats) >= 2:
            categories = cats
            i += 1
            continue

        percs = perc_pat.findall(line)
        if percs and college_id and course_code and categories:
            clean     = re.sub(r'\([\d.]+\)', '', line).strip()
            rank_nums = [x for x in rank_pat.findall(clean) if len(x) >= 3]

            if not rank_nums and i > 0:
                prev      = lines[i - 1].strip()
                prev_c    = re.sub(r'\([\d.]+\)', '', prev).strip()
                rank_nums = [x for x in rank_pat.findall(prev_c) if len(x) >= 3]

            for j, (cat, perc) in enumerate(zip(categories, percs)):
                rank = rank_nums[j] if j < len(rank_nums) else None
                rows.append({
                    'college_id':   college_id,
                    'college_name': college_name,
                    'course_code':  course_code,
                    'course_name':  course_name,
                    'college_type': college_type,
                    'exam_type':    exam_type,
                    'year':         year,
                    'cap_round':    cap_round,
                    'category':     cat,
                    'rank_number':  rank,
                    'percentile':   float(perc),
                })
        i += 1

    return rows


def main():
    print("=" * 60)
    print("EduCompass - CAP Cutoff Extractor")
    print("=" * 60)

    all_rows   = []
    fieldnames = [
        'college_id', 'college_name', 'course_code', 'course_name',
        'college_type', 'exam_type', 'year', 'cap_round',
        'category', 'rank_number', 'percentile'
    ]

    for filename, year, cap_round, exam_type in PDF_FILES:
        path = os.path.join(PDF_FOLDER, filename)

        if not os.path.exists(path):
            print("  WARNING: File not found - " + filename)
            continue

        print("Processing: " + filename)
        text = extract_text(path)
        rows = parse_pdf(text, year, cap_round, exam_type)
        all_rows.extend(rows)
        print("  Extracted " + str(len(rows)) + " rows")

    print("=" * 60)
    print("Total rows: " + str(len(all_rows)))

    with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print("Saved to: " + OUTPUT_FILE)
    print("=" * 60)
    print("Next step: run import_cutoffs.py")


main()