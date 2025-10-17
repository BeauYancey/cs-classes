import formatted_courses from "../../data/formatted_courses.json";
import extra_course_info from "../../data/extra_course_info.json";
import CourseGrid from "./CourseGrid";
import { useState } from "react";
import { TextInput, Box } from "@mantine/core";

export default function Courses () {
    const [textFilter, setTextFilter] = useState("");
    const [creditFilter, setCreditFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    // Filter courses based on text input
    const filteredCourses = extra_course_info.filter((course) => {
        const matchesCode = course.course_id.toLowerCase().includes(textFilter.toLowerCase());
        const matchesCredits =
            creditFilter === "" || course.total_credits === Number(creditFilter);
        const matchesName =
            nameFilter === "" ||
            course.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
            course.long_name.toLowerCase().includes(nameFilter.toLowerCase());
        return matchesCode && matchesCredits && matchesName;
    });

    return (
        <>
        <div>
            <Box py="sm" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}> 
                <TextInput
                    label="Search by Course Code"
                    placeholder="e.g., C S 110"
                    value={textFilter}
                    onChange={(event) => setTextFilter(event.currentTarget.value)}
                    style={{ maxWidth: 300 }}
                />
                <TextInput
                    label="Search by Credit Amount"
                    placeholder="e.g., 3"
                    value={creditFilter}
                    onChange={(event) => setCreditFilter(event.currentTarget.value)}
                    style={{ maxWidth: 300 }}
                />
                <TextInput
                    label="Search by Name"
                    placeholder="e.g., How to Program"
                    value={nameFilter}
                    onChange={(event) => setNameFilter(event.currentTarget.value)}
                    style={{ flex: 1, maxWidth: 300 }}
                />
            </Box>
            <CourseGrid courses={filteredCourses} />
        </div>
        </>
    )
}