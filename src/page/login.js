import { Button, Typography, Avatar, Box, Alert, Snackbar } from "@mui/material";
import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import loginBackground from '../img/login.jpg';
import '../style/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorAlert, setErrorAlert] = useState('');

  const navigate = useNavigate();
  const { login } = useUser();

  const handleCloseSnackbar = () => {
    setLoginStatus(null);
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleCloseAlert = () => {
    setErrorAlert('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    setErrorAlert('');
  
    const userList = JSON.parse(localStorage.getItem('UserList')) || [];
    if (username.length !== 10 || !/^\d+$/.test(username)) {
      setErrorAlert('Student ID must be exactly 10 digits and contain only numeric characters');
      setTimeout(handleCloseAlert, 5000);
      return;
    }
  
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
      setErrorAlert('Username or Password Incorrect');
      setTimeout(handleCloseAlert, 5000);
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
      <Container component="main" maxWidth="30vw">
        <Box
          sx={{
            padding: "3%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: "15px",
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
            maxWidth: '25vw',
            margin: 'auto',
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
              label="Student ID"
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
            <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ width: '20%', marginRight: '2%' }}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="success"
                sx={{ width: '25%' }}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>


            {errorAlert && (
              <Alert
                severity="error"
                sx={{
                  position: 'fixed',
                  top: 'auto',
                  bottom: 0,
                  right: 0,
                  margin: '20px',
                }}
                onClose={handleCloseAlert}
              >
                {errorAlert}
              </Alert>
            )}
            <Snackbar
              open={loginStatus === 'success'}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              sx={{
                '& .MuiAlert-filledSuccess': {
                  backgroundColor: theme => theme.palette.success.main,
                },
              }}
            >
              <Alert
                severity="success"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  textAlign: 'right',
                }}
                onClose={handleCloseSnackbar}
              >
                Login Successful
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
