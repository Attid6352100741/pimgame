import { Button, Typography, Avatar, Box } from "@mui/material";
import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import loginBackground from '../img/login.jpg';
import { Link } from 'react-router-dom';
import '../style/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userList = JSON.parse(localStorage.getItem('UserList')) || [];

    const user = userList.find((u) => u.studentId === username && u.password === password);

    if (user) {
      login(user.id, user.studentId, user.firstname, user.lastname, user.role);
      setLoginStatus('success');
      console.log('Login Success');
      console.log('User', user);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setLoginStatus('error');
      console.log('StudentID or Password Incorrect');
    }
  };


  return (
    <div className='main-content' style={{
      height: '100vh',
      backgroundImage: `url(${loginBackground})`,
      backgroundSize: 'cover',
      margin: '0px',
      padding: '0px',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: "10%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: "15px",
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              style={{ width: '100%' }}
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              style={{ width: '100%' }}
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
          <div>
            <Typography variant="body2">
              Don't have an account?
              <Link to="/register" style={{ textDecoration: 'underline', marginLeft: '4px' }}>
                Register here
              </Link>
            </Typography>
          </div>
          <Box style={{ textAlign: 'center', marginTop: '10px' }}>
            {loginStatus === 'success' && (
              <div style={{ color: 'green', marginBottom: '10px' }}>
                Login Success
              </div>
            )}
            {loginStatus === 'error' && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                Username or Password Incorrect
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
