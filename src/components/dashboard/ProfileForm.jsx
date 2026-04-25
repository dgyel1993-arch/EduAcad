import styles from '../../styles/ProfileForm.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, []);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const updatedUsers = users.map((u) =>
      String(u.id) === String(currentUser.id) ? { ...u, name, email, phone } : u
    );

    const updatedUser = {
      ...currentUser,
      name,
      email,
      phone,
    };

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    toast.success('Profile updated successfully!');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* LEFT SIDE - FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>My Profile</h2>
          <p className={styles.subtitle}>Update your personal information</p>

          <form className={styles.form}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - INFO PANEL */}
        <div className={styles.right}>
          <h2>Profile Settings</h2>
          <p>
            Keep your profile updated to get better learning recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileForm;
