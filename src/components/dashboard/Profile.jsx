import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import ProfileForm from './ProfileForm';
import styles from '../../styles/Dashboard.module.css';

import Footer from '../Footer';
const Profile = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <DashboardSidebar />

        <main className={styles.content}>
          <DashboardHeader />
          <ProfileForm />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
