import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import styles from '../../styles/Dashboard.module.css';
import Footer from '../Footer';
import SingleCourse from './SingleCourse';
const DashboardDetailCourse = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />

        <main className={styles.content}>
          <DashboardHeader />
          <SingleCourse />
        </main>
      </div>
      <Footer />
    </>
  );
};
export default DashboardDetailCourse;
