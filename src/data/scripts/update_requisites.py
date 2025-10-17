import json
from formatted_courses import courses  # your original file

# Step 1: Build the mapping from internal course IDs to course_id
code_to_course_id = {course["id"]: course["course_id"] for course in courses}

new_courses = []

for course in courses:
    new_reqs = []

    requisites = course.get("requisites", {})
    requisites_simple = requisites.get("requisitesSimple", [])
    for req_simple in requisites_simple:
        rules = req_simple.get("rules", [])
        for rule in rules:
            value_block = rule.get("value", {})
            values_list = value_block.get("values", [])
            for val in values_list:
                codes = val.get("value", [])
                for code in codes:
                    # Use the mapping we just built
                    if code in code_to_course_id:
                        new_reqs.append(code_to_course_id[code])

    # Replace requisites with simple list of course_ids
    course["requisites"] = new_reqs
    new_courses.append(course)

# Save the updated courses to a new file
with open("new_formatted_courses.py", "w") as f:
    f.write("courses = ")
    json.dump(new_courses, f, indent=2)

print("Updated courses written to new_formatted_courses.py")
