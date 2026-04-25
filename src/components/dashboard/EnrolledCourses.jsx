import { useEffect, useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import styles from '../../styles/Dashboard.module.css';
import Footer from '../Footer';
import CourseCard from '../courses/CourseCard';
import coursesData from '../../assets/data/courses.json';

const EnrolledCourses = () => {
  const [currentCourses, setCurrentCourses] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!currentUser) return;

    // find full user
    const user = users.find((u) => String(u.id) === String(currentUser.id));

    if (!user) return;

    const enrolledIds = user.enrolledCourses || [];

    // 🔥 match with course.json
    const enrolledCourses = coursesData.filter((course) =>
      enrolledIds.includes(course.id)
    );

    setCurrentCourses(enrolledCourses);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />

        <main className={styles.content}>
          <DashboardHeader />

          <div className="container mt-5">
            <h2 className="mb-4 fw-bold text-center">My Courses</h2>

            <div className="row">
              {currentCourses.length === 0 ? (
                <p className="text-center">No enrolled courses yet.</p>
              ) : (
                currentCourses.map((course) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
                    <CourseCard course={course} />
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default EnrolledCourses;
