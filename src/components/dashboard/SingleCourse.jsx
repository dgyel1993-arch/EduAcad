import { useParams } from 'react-router-dom';
import courses from '../../assets/data/courses.json';
import styles from '../../styles/SingleCourse.module.css';
import modules from '../../assets/data/courseModules.json';
import { useState, useEffect } from 'react';
export default function SingleCourse() {
  const [enrolled, setEnrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!currentUser) return;

    const user = users.find((u) => String(u.id) === String(currentUser.id));

    setUserData(user);

    if (user?.enrolledCourses.includes(Number(id))) {
      setEnrolled(true);
    }
  }, [id]);

  const handleEnroll = (courseId) => {
    if (enrolled) {
      setEnrolled(true);
      return user; // stop duplicate
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(currentUser);

    const updatedUsers = users.map((user) => {
      console.log(currentUser.id, user.id);
      if (String(user.id) === String(currentUser.id)) {
        const alreadyEnrolled = user.enrolledCourses.includes(courseId);

        return {
          ...user,
          enrolledCourses: alreadyEnrolled
            ? user.enrolledCourses
            : [...user.enrolledCourses, courseId],
        };
      }
      return user;
    });
    console.log('updated user', updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setEnrolled(true);
  };

  //function to handle mark as complete functionality
  const handleMarkComplete = (courseId, moduleId) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const updatedUsers = users.map((user) => {
      if (String(user.id) === String(currentUser.id)) {
        const completed = user.completedModules || {};
        const courseModules = completed[courseId] || [];

        const alreadyCompleted = courseModules.includes(moduleId);

        return {
          ...user,
          completedModules: {
            ...completed,
            [courseId]: alreadyCompleted
              ? courseModules
              : [...courseModules, moduleId],
          },
        };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    const updatedUser = updatedUsers.find(
      (u) => String(u.id) === String(currentUser.id)
    );

    setUserData(updatedUser);
  };

  //check if the module is completed
  const isCompleted = (moduleId) => {
    return userData?.completedModules?.[course.id]?.includes(moduleId);
  };

  const openVideo = (url) => {
    setActiveVideo(url);
    setShowModal(true);
  };

  const moduleData = modules.find((m) => m.courseId === Number(id));
  const courseModules = moduleData ? moduleData.modules : [];
  console.log(courseModules);

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <h2>Course not found</h2>;
  }
  //getting first video for preview
  const previewVideo = courseModules[0]?.videoUrl;
  return (
    <div className={styles.dashboardCourse}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>
      </div>

      {/* MAIN */}
      <div className={styles.main}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          {/* MODULES */}
          <div className={styles.section}>
            <h4>Course Modules</h4>

            {courseModules.length === 0 ? (
              <p>No modules available for this course</p>
            ) : (
              <div className={styles.moduleList}>
                {courseModules.map((mod) => (
                  <div key={mod.moduleId} className={styles.moduleItem}>
                    <div>
                      📘 {mod.title}
                      <div className={styles.duration}>⏱ {mod.duration}</div>
                    </div>

                    {enrolled ? (
                      <div className={styles.actions}>
                        <button
                          className={styles.watchBtn}
                          onClick={() => openVideo(mod.videoUrl)}
                        >
                          Watch
                        </button>

                        <button
                          className={styles.completeBtn}
                          onClick={() =>
                            handleMarkComplete(course.id, mod.moduleId)
                          }
                          disabled={isCompleted(mod.moduleId)}
                        >
                          {isCompleted(mod.moduleId)
                            ? '✔ Completed'
                            : 'Mark Complete'}
                        </button>
                      </div>
                    ) : (
                      <button className={styles.lockedBtn} disabled>
                        🔒 Enroll to Access
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (STICKY CARD) */}
        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.preview}>
              {previewVideo ? (
                <div className={styles.videoWrapper}>
                  <iframe
                    src={previewVideo}
                    title="Course Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>No preview available</p>
              )}
            </div>

            {!enrolled ? (
              <button
                className={styles.primaryBtn}
                onClick={() => handleEnroll(course.id)}
              >
                Enroll Now
              </button>
            ) : (
              <button className={styles.successBtn}>Enrolled ✔</button>
            )}

            <p className={styles.note}>Lifetime access</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <h5 className="modal-title">Course Video</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={activeVideo}
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
