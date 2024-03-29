import { Button, Typography, Avatar, Box, Alert, Snackbar } from "@mui/material";
import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import loginBackground from '../img/login.jpg';
import '../style/login.css';

//-------------API-----------------
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../api/apiconfig';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setErrorAlert('');
  
    try {
      const auth = getAuth(app);
  
      // Sign in with email and password using the provided username (StudentID)
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
  
      // Get user data from Firebase
      const userData = userCredential.user;
  
      // Now you can use userData to perform actions, such as logging in and navigating to the home page
      login(userData.uid, username, userData.displayName, '', ''); // Assuming displayName contains both first and last name
      setLoginStatus('success');
      console.log('Login Success');
  
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setLoginStatus('error');
      setErrorAlert('Student ID or Password Incorrect');
      setTimeout(handleCloseAlert, 5000);
      console.log('Student ID or Password Incorrect', error.message);
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
