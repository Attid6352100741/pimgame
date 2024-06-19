import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './page/login';
import Course from './page/course';
import { UserProvider } from './components/UserContext';
import Home from './page/home';
import Courstsetting from './page/cousrtsetting';
import Register from './page/register';
import Group from './page/group';
import Setting from './page/setting';
import Uploadfile from './page/uploadfile';
import Forgotpassword from './page/forgotpassword';
import Racing from './page/racingtest';
import Profile from './page/profile';
import Gamestest from './page/games';
import { Games } from '@mui/icons-material';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/group" element={<Group />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/racing" element={<Racing />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploadfile" element={<Uploadfile />} />
          <Route path="/games" element={<Gamestest />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
