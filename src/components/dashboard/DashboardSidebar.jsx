// DashboardSidebar.jsx
import styles from '../../styles/DashboardSidebar.module.css';
import defaultAvatar from '../../assets/profile.png';
import {
  FaHome,
  FaBookOpen,
  FaUserGraduate,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function DashboardSidebar() {
  const user = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Guest User',
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login'; // redirect after logout
  };

  return (
    <aside className={styles.sidebar}>
      {/* TOP PROFILE */}
      <div className={styles.profileSection}>
        <img src={defaultAvatar} alt="profile" className={styles.avatar} />

        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userRole}>Student</p>
      </div>

      {/* MENU */}
      <nav className={styles.menu}>
        <a href="/dashboard" className={styles.menuItem}>
          <FaHome />
          <span>Dashboard</span>
        </a>

        <a href="/dashboard/mycourses" className={styles.menuItem}>
          <FaBookOpen />
          <span>My Courses</span>
        </a>

        <a href="/dashboard/profile" className={styles.menuItem}>
          <FaUser />
          <span>Edit Profile</span>
        </a>

        <button onClick={handleLogout} className={styles.menuItem}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
