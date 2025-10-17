import json

# Load your already-formatted data
with open("new_formatted_courses.json", "r") as f:
    formatted_courses = json.load(f)

# Load the raw course data that includes "courseGroupId"
with open("raw_courses.json", "r") as f:
    raw_data = json.load(f)
raw_courses = raw_data["data"]

# Create a map from course_id to courseGroupId for quick lookup
id_map = {course["code"]: course["courseGroupId"] for course in raw_courses}

# Add "id" to each course in formatted_courses
for course in formatted_courses:
    course_id = course["course_id"]
    if course_id in id_map:
        course["id"] = id_map[course_id]
    else:
        print(f"Warning: No courseGroupId found for {course_id}")

# Save the updated file
with open("formatted_courses.json", "w") as f:
    json.dump(formatted_courses, f, indent=2)

print("✅ Added 'id' field from courseGroupId to all matching courses.")
