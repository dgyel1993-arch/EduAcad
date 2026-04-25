import { useState } from 'react';
import styles from '../../styles/SignupForm.module.css';
import heroImg from '../../assets/education.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Password match validation
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    //Password length validation
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      toast.error('User already exists');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      courses: [],
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    toast.success('Signup successful!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* LEFT SIDE - FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>
            Join EduAcade and start learning today
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </span>
            </div>

            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />

              <span
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
              </span>
            </div>

            <button type="submit" className={styles.primaryBtn}>
              SIGN UP
            </button>
          </form>
          <p className={styles.switchText}>
            Already have an account?{' '}
            <a href="/login" className={styles.switchLink}>
              Sign in
            </a>
          </p>
        </div>

        {/* RIGHT SIDE - INFO PANEL */}
        <div className={styles.right}>
          <h2>Welcome to EduAcade</h2>

          <p>Learn programming, design, AI and more with structured courses.</p>

          <img src={heroImg} alt="learning" />
        </div>
      </div>
    </div>
  );
}
