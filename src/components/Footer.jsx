import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row text-center text-md-start">
          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h4 className={styles.logo}>EduAcad</h4>
            <p className={styles.text}>
              Learn anytime, anywhere. Build your future with expert-led online
              courses.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-4 mb-4">
            <h5 className={styles.heading}>Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <a href="#" className={styles.link}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Courses
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-4">
            <h5 className={styles.heading}>Contact</h5>
            <p className={styles.text}>Email: support@eduacad.com</p>
            <p className={styles.text}>Phone: +61-XXXXXXXX</p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottom}>
          <small>
            © {new Date().getFullYear()} EduAcad. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
