import json
from pathlib import Path

# === CONFIG ===
INPUT_PATH = Path("raw_courses.json")  # your original JSON file
OUTPUT_PATH = Path("formatted_courses.json")

# === LOAD ORIGINAL DATA ===
with open(INPUT_PATH, "r", encoding="utf-8") as f:
    raw_data = json.load(f)

formatted_courses = []

for course in raw_data["data"]:
    formatted_course = {
        "course_id": course.get("code"),
        "total_credits": course.get("credits", {}).get("creditHours", {}).get("value"),
        "lab_hours": course.get("credits", {}).get("labHours", {}).get("value"),
        "lecture_hours": course.get("credits", {}).get("lectureHours", {}).get("value"),
        "description": course.get("description"),
        "long_name": course.get("longName"),
        "name": course.get("name"),
        "effectiveEndDate": course.get("effectiveEndDate"),
        "effectiveStartDate": course.get("effectiveStartDate"),
    }
    formatted_courses.append(formatted_course)

# === WRITE FORMATTED DATA TO JSON ===
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(formatted_courses, f, indent=2, ensure_ascii=False)

print(f"✅ Formatted JSON written to {OUTPUT_PATH}")
