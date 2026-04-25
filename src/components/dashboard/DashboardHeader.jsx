import { useState } from 'react';
import styles from '../../styles/DashboardHeader.module.css';
import { FiSearch, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import coursesData from '../../assets/data/courses.json';

export default function DashboardHeader() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
    <header className={styles.header}>
      <div className={styles.rightSection}>
        {/* SEARCH */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />

            <input
              type="text"
              placeholder="Search courses..."
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* DROPDOWN */}
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

        {/* NOTIFICATION */}
        <button className={styles.notifyBtn}>
          <FiBell />
          <span className={styles.dot}></span>
        </button>
      </div>
    </header>
  );
}
