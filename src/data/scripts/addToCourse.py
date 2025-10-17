import json
from pathlib import Path

# === FILE PATHS ===
COURSES_PATH = Path("formatted_courses.json")  # your existing file
NEW_DATA_PATH = Path("extra_course_info.json") # new data to merge

# === LOAD EXISTING COURSES ===
with open(COURSES_PATH, "r", encoding="utf-8") as f:
    formatted_courses = json.load(f)

# Convert to dict keyed by course_id for easy merging
courses_dict = {c["course_id"]: c for c in formatted_courses}

# === LOAD NEW DATA ===
with open(NEW_DATA_PATH, "r", encoding="utf-8") as f:
    new_data = json.load(f)

for course in new_data["data"]:
    course_id = course.get("code")
    if not course_id:
        continue  # skip if no course_id

    if course_id in courses_dict:
        # Update existing course with new fields
        courses_dict[course_id]["courseTypicallyOffered"] = course.get("courseTypicallyOffered")
        courses_dict[course_id]["note"] = course.get("customFields", {}).get("note", None)
        courses_dict[course_id]["learningOutcomes"] = course.get("learningOutcomes", [])
        courses_dict[course_id]["requisites"] = course.get("requisites", {})
        courses_dict[course_id]["nonEnforcedPrerequisites"] = course.get("customFields", {}).get("nonEnforcedPrerequisites", None)
        courses_dict[course_id]["recommended"] = course.get("customFields", {}).get("recommended", None)
    else:
        # If course doesn't exist, create a new entry (optional)
        courses_dict[course_id] = {
            "course_id": course_id,
            "total_credits": course.get("credits", {}).get("creditHours", {}).get("value"),
            "lab_hours": course.get("credits", {}).get("labHours", {}).get("value"),
            "lecture_hours": course.get("credits", {}).get("lectureHours", {}).get("value"),
            "description": course.get("description"),
            "long_name": course.get("longName"),
            "name": course.get("name"),
            "effectiveEndDate": course.get("effectiveEndDate"),
            "effectiveStartDate": course.get("effectiveStartDate"),
            "courseTypicallyOffered": course.get("courseTypicallyOffered"),
            "note": course.get("customFields", {}).get("note", None),
            "learningOutcomes": course.get("learningOutcomes", []),
            "requisites": course.get("requisites", {}),
            "nonEnforcedPrerequisites": course.get("customFields", {}).get("nonEnforcedPrerequisites", None),
            "recommended": course.get("customFields", {}).get("recommended", None)
        }

# Convert back to a list
merged_courses = list(courses_dict.values())

# === WRITE BACK TO THE SAME FILE ===
with open(COURSES_PATH, "w", encoding="utf-8") as f:
    json.dump(merged_courses, f, indent=2, ensure_ascii=False)

print(f"✅ Courses updated in {COURSES_PATH}")
