import { useState } from 'react';
import { useParams } from 'react-router-dom';

import courseList from '../../assets/data/courses.json';
import moduleList from '../../assets/data/courseModules.json';
import styles from '../../styles/CourseDetail.module.css';

import Header from '../Header';
import Footer from '../Footer';

const CourseDetail = () => {
  const { id } = useParams();

  // Find course
  const course = courseList.find((c) => c.id === parseInt(id));

  // Find modules
  const moduleData = moduleList.find((m) => m.courseId === parseInt(id));

  const modules = moduleData ? moduleData.modules : [];

  // Enroll state
  const [enrolled, setEnrolled] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleEnroll = () => {
    setEnrolled(true);
  };

  const openVideo = (videoUrl) => {
    setActiveVideo(videoUrl);
    setShowModal(true);
  };

  if (!course) return <h2 className="container mt-5">Course not found</h2>;

  return (
    <>
      <Header />
      <div className={`container mt-5 ${styles.container}`}>
        {/* Course Info */}
        <h2 className={styles.title}>{course.title}</h2>
        <p className={styles.description}>{course.description}</p>

        {/* Enroll Button */}
        <div className="mb-4">
          {!enrolled ? (
            <button className={styles.primaryBtn} onClick={handleEnroll}>
              Enroll Now
            </button>
          ) : (
            <button className={styles.successBtn}>Enrolled ✔</button>
          )}
        </div>

        <hr />

        {/* Modules */}
        <h4 className="mb-3">Course Modules</h4>

        {modules.length === 0 ? (
          <p>No modules available for this course</p>
        ) : (
          <div className={styles.moduleItem}>
            {modules.map((mod) => (
              <div
                key={mod.moduleId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  📘 {mod.title}
                  <div className="text-muted small">⏱ {mod.duration}</div>
                </div>

                <button
                  className={styles.watchBtn}
                  onClick={() => openVideo(mod.videoUrl)}
                >
                  Watch
                </button>
              </div>
            ))}
          </div>
        )}

        {/* VIDEO MODAL */}
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

      <Footer />
    </>
  );
};

export default CourseDetail;
