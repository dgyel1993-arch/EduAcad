import styles from '../../styles/PopularCourses.module.css';
import courses from '../../assets/data/courses.json';
import { useNavigate } from 'react-router-dom';
export default function PopularCourses() {
  const navigate = useNavigate();
  const sortedCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Popular Courses</h3>

      <div className={styles.grid}>
        {sortedCourses.map((course) => (
          <div key={course.id} className={styles.card}>
            <div className={styles.courseName}>{course.title}</div>

            <div className={styles.rating}>⭐ {course.rating}</div>

            <div className={styles.students}>
              {course.students} students enrolled
            </div>

            <button
              className={styles.btn}
              onClick={() => navigate(`/dashboard/course/${course.id}`)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
