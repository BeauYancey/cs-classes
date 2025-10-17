import formatted_courses from "../../data/formatted_courses.json";
import extra_course_info from "../../data/extra_course_info.json";
import CourseGrid from "./CourseGrid";

export default function Courses () {
    return (
        <>
        <div>
            <CourseGrid courses={extra_course_info} />
        </div>
        </>
    )
}