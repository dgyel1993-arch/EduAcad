import courseList from '../../assets/data/courses.json';
import { useState } from 'react';
import CourseCard from './CourseCard';

export default function CourseList() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const currentCourses = courseList.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(courseList.length / coursesPerPage);

  return (
    <div className="container mt-5">
      {/* Title */}
      <h2 className="mb-4 fw-bold text-center">Our Courses</h2>

      {/* Course Grid */}
      <div className="row">
        {currentCourses.map((course) => (
          <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1
                ? 'btn-warning text-white'
                : 'btn-outline-warning'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
