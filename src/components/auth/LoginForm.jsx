import { useState } from 'react';
import styles from '../../styles/LoginForm.module.css';
import heroImg from '../../assets/education.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      toast.error('Invalid email or password!');
      setForm({
        email: '',
        password: '',
      });
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    toast.success('Login successful!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* LEFT SIDE - FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>
            Login to continue learning on EduAcade
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.primaryBtn}>
              LOGIN
            </button>
          </form>
          <p className={styles.switchText}>
            Don't have an account?{' '}
            <a href="/signup" className={styles.switchLink}>
              Sign Up
            </a>
          </p>
        </div>

        {/* RIGHT SIDE - INFO PANEL */}
        <div className={styles.right}>
          <h2>Start Learning Again</h2>

          <p>
            Access your courses, continue progress, and explore new skills with
            EduAcade.
          </p>

          <img src={heroImg} alt="learning" />
        </div>
      </div>
    </div>
  );
}
