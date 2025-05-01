import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TemplateCourses from "../../api/course.json";
import CourseList from "../../components/CourseList";
import { GetAllCourses } from "../../service/api";

function CoursePage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await GetAllCourses();
        setCourses(data);
      } catch (error) {
        console.error();
        error;
      }
    };

    fetchCourse();
  }, []);

  const purchasedCoursesIds = JSON.parse(
    localStorage.getItem("purchasedCourses") || "[]"
  );

  const purchasedCourses = courses.filter((course) =>
    purchasedCoursesIds.includes(course._id)
  );

  const unPurchasedCourses = courses.filter(
    (course) => !purchasedCoursesIds.includes(course._id)
  );

  return (
    <>
      <PageHeader title={"Course"} />
      {purchasedCourses.length > 0 && (
        <div className="px-4 lg:px-8 py-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold text-green-800">
            Purchased Courses
          </h2>
          <div className="mt-4">
            <CourseList courses={purchasedCourses} />
          </div>
        </div>
      )}
      <div className="px-4 lg:px-8 py-4 rounded-md mb-4">
        <h2 className="text-lg font-semibold text-green-800">
          Recommended Courses
        </h2>
        <div className="mt-4">
          <CourseList courses={unPurchasedCourses} />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
