//login.js

import React, { useState } from 'react';
import { Button, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database'; // เพิ่มการ import สำหรับ Firebase Realtime Database
import pictureLogo from '../img/Logo.png';
import qrcode from '../img/qrcode.png';
import english from '../img/english.png';
import { app } from '../api/apiconfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorAlert, setErrorAlert] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const userEmail = userCredential.user.email; // อีเมลของผู้ใช้ที่ login สำเร็จ

      const db = getDatabase(app); // Firebase Realtime Database instance
      const usersRef = ref(db, 'users');

      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.email === userEmail) {
            // บันทึกข้อมูลใน local storage
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        });
      }

      setLoginStatus('success');
      setOpenSnackbar(true);
      navigate('/home');
    } catch (error) {
      setLoginStatus('error');
      setErrorAlert('Email or Password Incorrect');
      setTimeout(handleCloseAlert, 5000);
      console.error('Email or Password Incorrect', error.message);
    }
  };

  return (
    <div className="main" style={{ backgroundColor: 'pink', width: '100vw', height: '100vh', display: 'flex' }}>
      <div className="header1" style={{ backgroundColor: '#f6f7f1', width: '70%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
        <div className="content" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div className="login" style={{ textAlign: 'center', width: '50%' }}>
            <img src={pictureLogo} alt="Company Logo" style={{ width: '30%', height: 'auto', marginBottom: '10%' }} />
            <Typography>Please login to your account</Typography>
            <TextField
              style={{ width: '70%' }}
              margin="normal"
              id="username"
              label="Email address"
              name="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              style={{ width: '70%' }}
              margin="normal"
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
              sx={{
                width: '70%', marginTop: '3%', backgroundColor: '#22b8d6',
                '&:hover': {
                  backgroundColor: '#188aa1',
                },
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '3%' }}>
                <Link to="/forgotpassword" underline="hover">
                  Forgot password?
                </Link>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  width: '25%', marginLeft: '3%', backgroundColor: '#68c957',
                  '&:hover': {
                    backgroundColor: '#4f964c',
                  },
                }}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>

        {errorAlert && (
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              margin: '20px',
              textAlign: 'right',
            }}
            onClose={handleCloseAlert}
          >
            {errorAlert}
          </Alert>
        )}

        {/* Snackbar for Success */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{
            '& .MuiAlert-filledSuccess': {
              backgroundColor: (theme) => theme.palette.success.main,
            },
            position: 'absolute',
            bottom: 0,
            left: 0,
            margin: '20px',
          }}
        >
          <Alert
            severity="success"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
            onClose={handleCloseSnackbar}
          >
            Login Successful
          </Alert>
        </Snackbar>
      </div>


      <div className="header2" style={{ backgroundColor: 'white', width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
        <img src={english} alt="Company Logo" style={{ width: '100%', height: 'auto' }} />
        <img src={qrcode} alt="Company Logo" style={{ width: '100%', height: 'auto' }} />
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Login;
