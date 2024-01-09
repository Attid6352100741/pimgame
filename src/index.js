import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './page/login';
import Course from './page/course';
import { UserProvider } from './components/UserContext';
import Games1 from './page/games1';
import Games2 from './page/games2';
import Games3 from './page/games3';
import Games4 from './page/games4';
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
          <Route path="/home/course/games/1" element={<Games1 />} />
          <Route path="/home/course/games/2" element={<Games2 />} />
          <Route path="/home/course/games/3" element={<Games3 />} />
          <Route path="/home/course/games/4" element={<Games4 />} />
          <Route path="/home/testracing" element={<Testracing />} />
          <Route path="/test" element={<test />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
