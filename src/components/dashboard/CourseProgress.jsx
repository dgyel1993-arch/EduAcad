import styles from '../../styles/CourseProgress.module.css';
import allCourses from '../../assets/data/courses.json';
import courseModules from '../../assets/data/courseModules.json';
import { useNavigate } from 'react-router-dom';

export default function CourseProgress() {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const user = users.find((u) => String(u.id) === String(currentUser?.id));

  const enrolledCourses = user?.enrolledCourses || [];
  const completedModules = user?.completedModules || {};

  const courses = enrolledCourses.map((courseId) => {
    const course = allCourses.find((c) => c.id === courseId);
    console.log(course.title);

    const moduleData = courseModules.find((m) => m.courseId === courseId);

    const totalModules = moduleData?.modules?.length || 0;
    const completedCount = completedModules[courseId]?.length || 0;

    return {
      id: courseId,
      name: course?.title,
      description: course?.description,
      progress: Math.round((completedCount / totalModules) * 100),
    };
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>My Course Progress</h3>

      <div className={styles.grid}>
        {courses.map((course) => (
          <div key={course.courseId} className={styles.card}>
            <div className={styles.courseName}>{course.name}</div>
            <p className={styles.courseDescription}>{course.description}</p>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            <div className={styles.percent}>{course.progress}% completed</div>
            <button
              className={styles.continueBtn}
              onClick={() => navigate(`/dashboard/course/${course.id}`)}
            >
              Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
