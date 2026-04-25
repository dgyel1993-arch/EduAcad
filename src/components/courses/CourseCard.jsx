import styles from '../../styles/CourseCard.module.css';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  return (
    <div className={styles.card}>
      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className={styles.thumbnail}
      />

      <div className={styles.body}>
        <span className={styles.category}>{course.category}</span>

        <h5 className={styles.title}>{course.title}</h5>

        {/* <p className={styles.description}>{course.description}</p> */}

        <p style={{ fontSize: '13px' }}>
          <strong>Instructor:</strong> {course.instructor}
        </p>

        <div className={styles.meta}>
          <span>⏱ {course.duration}</span>
          <span>📘 {course.level}</span>
        </div>

        <div className={styles.meta}>
          <span>⭐ {course.rating}</span>
          <span>👨‍🎓 {course.students}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className={styles.price}>${course.price}</span>

          {loggedInUser && (
            <button
              className={styles.button}
              onClick={() => navigate(`/dashboard/course/${course.id}`)}
            >
              View Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
