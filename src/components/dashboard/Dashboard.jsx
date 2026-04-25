import DashboardSidebar from './DashboardSidebar';
import styles from '../../styles/Dashboard.module.css';
import DashboardHeader from './DashboardHeader';
import Footer from '../Footer';
import CourseProgress from './CourseProgress';
import DashboardStats from './DashboardStats';
import PopularCourses from './PopularCourses';
const Dashboard = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />

        <main className={styles.content}>
          <DashboardHeader />
          <DashboardStats />
          <CourseProgress />
          <PopularCourses />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
