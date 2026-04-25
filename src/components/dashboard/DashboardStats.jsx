import styles from '../../styles/DashboardStats.module.css';
import coursesData from '../../assets/data/courses.json';
import courseModules from '../../assets/data/courseModules.json';
import {
  FaBookOpen,
  FaCheckCircle,
  FaHourglassHalf,
  FaChartLine,
} from 'react-icons/fa';
export default function DashboardStats() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const user = users.find((u) => String(u.id) === String(currentUser?.id));

  //To find completed course
  const enrolledCourses = user?.enrolledCourses || [];
  const completedCourses = enrolledCourses.filter((courseId) => {
    const moduleData = courseModules.find((m) => m.courseId === courseId);

    const totalModules = moduleData?.modules?.length || 0;
    const completedCount = user?.completedModules?.[courseId]?.length || 0;

    return totalModules > 0 && completedCount === totalModules;
  });

  //Lets find overall course progress
  const totalModulesAllCourses = enrolledCourses.reduce((sum, courseId) => {
    const moduleData = courseModules.find((m) => m.courseId === courseId);

    return sum + (moduleData?.modules?.length || 0);
  }, 0);

  const completedModulesAllCourses = enrolledCourses.reduce((sum, courseId) => {
    return sum + (user?.completedModules?.[courseId]?.length || 0);
  }, 0);
  const overallProgress =
    totalModulesAllCourses > 0
      ? Math.round((completedModulesAllCourses / totalModulesAllCourses) * 100)
      : 0;

  //Lets find In progress courses
  const inProgressCourses = enrolledCourses.filter((courseId) => {
    const moduleData = courseModules.find((m) => m.courseId === courseId);

    const totalModules = moduleData?.modules?.length || 0;
    const completedCount = user?.completedModules?.[courseId]?.length || 0;

    return completedCount >= 0 && completedCount < totalModules;
  });
  const stats = {
    enrolled: enrolledCourses.length,
    completed: completedCourses.length,
    progress: overallProgress,
    inProgress: inProgressCourses.length,
    remaining: coursesData.length - enrolledCourses.length,
  };

  return (
    <div className={styles.wrapper}>
      {/* LEFT: OVERALL PROGRESS */}
      <div className={styles.progressCard}>
        <h4>Overall Course Completion Progress</h4>

        <div className={styles.progressCircle}>
          <div
            className={styles.circle}
            style={{ '--progress': stats.progress }}
          >
            <span>{stats.progress}%</span>
          </div>
        </div>

        <p className={styles.label}>COMPLETION PROGRESS</p>
      </div>

      {/* MIDDLE */}
      <div className={styles.cardGroup}>
        <Stat
          label="Total enroll courses"
          value={stats.enrolled}
          icon={<FaBookOpen />}
        />
        <Stat
          label="Course completed"
          value={stats.completed}
          icon={<FaCheckCircle />}
        />
      </div>

      {/* RIGHT */}
      <div className={styles.cardGroup}>
        <Stat
          label="Courses to Explore"
          value={`${stats.remaining}`}
          icon={<FaChartLine />}
        />
        <Stat
          label="In Progress Courses"
          value={`${stats.inProgress}`}
          icon={<FaHourglassHalf />}
        />
      </div>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statContent}>
        <div className={styles.iconBox}>{icon}</div>

        <div className={styles.textBlock}>
          <p>{label}</p>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  );
}
