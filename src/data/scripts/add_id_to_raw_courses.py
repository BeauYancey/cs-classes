import json
import sys
from pathlib import Path

def update_requisites():
    input_path= Path("src/data/formatted_courses.json")
    output_path = Path("extra_course_info.json")
    # Load the formatted courses file
    with open(input_path, "r") as f:
        courses = json.load(f)

    # Create a map from course id object to course_id string
    # This assumes each course object has an 'id' field mapping to 'course_id'
    id_map = {course["id"]: course["course_id"] for course in courses}

    for course in courses:
        requisites = course.get("requisites", {})
        new_reqs = []

        # Handle cases where requisitesSimple exists
        requisites_simple = requisites.get("requisitesSimple", [])
        for req_group in requisites_simple:
            rules = req_group.get("rules", [])
            for rule in rules:
                value = rule.get("value", {})
                values_list = value.get("values", [])
                for val_obj in values_list:
                    for course_id_obj in val_obj.get("value", []):
                        mapped_course_id = id_map.get(course_id_obj)
                        if mapped_course_id:
                            new_reqs.append(mapped_course_id)

        # Assign the simplified requisites list back to the course
        course["requisites"] = new_reqs

    # Save the updated courses to the output file
    with open(output_path, "w") as f:
        json.dump(courses, f, indent=2)

    print(f"✅ Updated requisites and saved to {output_path}")


if __name__ == "__main__":

    update_requisites()
