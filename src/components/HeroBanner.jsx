import styles from '../styles/HeroBanner.module.css';
import heroImg from '../assets/education.png'; // optional local image
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

export default function HeroBanner() {
  const navigate = useNavigate();
  return (
    <section className={`container-fluid ${styles.heroSection}`}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Learn Skills That <span>Shape Your Future</span>
          </h1>
          <p className={styles.subtitle}>
            EduAcade is your online learning platform where you can explore
            courses in programming, design, data science, and more — anytime,
            anywhere.
          </p>

          <div className={styles.btnGroup}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate('/login')}
            >
              Get Started
            </button>
            <button
              className={styles.outlineBtn}
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.rightContent}>
          <img src={heroImg} alt="Hero" />
        </div>
      </div>
    </section>
  );
}
