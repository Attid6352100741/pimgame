import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './page/login';
import Course from './page/course';
import { UserProvider } from './components/UserContext';
import Games from './page/games';
import Home from './page/home';
import Testracing from './page/test_racing';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/course" element={<Course />} />
          <Route path="/home/course/games/:courseId/week/:week" element={<Games />} />
          <Route path="/home/testracing" element={<Testracing />} />
          <Route path="/test" element={<Games />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
