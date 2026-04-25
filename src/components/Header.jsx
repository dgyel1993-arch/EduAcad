import { useState } from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import coursesData from '../assets/data/courses.json';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // live filter
  const filteredCourses = query
    ? coursesData.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (courseId) => {
    setQuery('');
    navigate(`/dashboard/course/${courseId}`);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        {/* LOGO */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="EduAcad Logo" height="80" />
        </a>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE AREA */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* MENU */}
          <ul className="navbar-nav me-4">
            <li className="nav-item">
              <Link className={`nav-link ${styles.menuText}`} to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${styles.menuText}`} to="/courses">
                Courses
              </Link>
            </li>
          </ul>

          {/* SEARCH */}
          <div className={styles.searchWrapper}>
            <input
              className={`form-control ${styles.searchBox}`}
              type="search"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* DROPDOWN RESULTS */}
            {query && (
              <div className={styles.searchDropdown}>
                {filteredCourses.length === 0 ? (
                  <p className={styles.noResults}>No courses found</p>
                ) : (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className={styles.searchItem}
                      onClick={() => handleSelect(course.id)}
                    >
                      <img src={course.thumbnail} alt={course.title} />
                      <div>
                        <p>{course.title}</p>
                        <span>{course.category}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div
            className={`d-flex gap-2 ms-lg-auto mt-3 mt-lg-0 ${styles.authButtons}`}
          >
            <button
              className={`btn ${styles.loginBtn}`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>

            <button
              className={`btn ${styles.signupBtn}`}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
