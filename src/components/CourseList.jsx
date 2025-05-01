import { useNavigate } from "react-router";
import CourseCard from "./CourseCard";

function CourseList({ courses }) {
  const navigate = useNavigate();
  const purchasedCoursesIds = JSON.parse(
    localStorage.getItem("purchasedCourses") || "[]"
  );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      {courses.map((course) => {
        const isPurchased = purchasedCoursesIds.includes(course._id);

        return (
          <div
            key={course.id}
            onClick={() => {
              navigate(
                isPurchased ? `${course._id}/content` : `${course._id}/detail`,
                { state: { course } }
              );
            }}
            className="cursor-pointer"
          >
            <CourseCard {...course} isPurchased={isPurchased} />
          </div>
        );
      })}
    </div>
  );
}

export default CourseList;
