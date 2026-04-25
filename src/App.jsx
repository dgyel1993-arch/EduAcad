import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { Routes, Route } from 'react-router-dom';

//Toast message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages
import HomePage from './components/HomePage';
import Courses from './components/courses/Courses';
import Dashboard from './components/dashboard/Dashboard';
//Auth Page
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/dashboard/Profile';

//Initial user Data
import usersData from './assets/data/users.json';
import DashboardDetailCourse from './components/dashboard/DashboardDetailCourse';
import EnrolledCourses from './components/dashboard/EnrolledCourses';
function App() {
  useEffect(() => {
    const existing = localStorage.getItem('users');

    if (!existing) {
      localStorage.setItem('users', JSON.stringify(usersData));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="dashboard/course/:id"
          element={<DashboardDetailCourse />}
        />
        <Route path="/dashboard/mycourses" element={<EnrolledCourses />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
