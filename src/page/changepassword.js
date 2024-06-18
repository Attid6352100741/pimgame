import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import pictureLogo from '../img/Logo.png';
import recovery from '../img/recovery.png';
import english from '../img/english.png';
import { app } from '../api/apiconfig';

function Changepassword() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ oobCode ถ้ามีค่า
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode');

    if (oobCode) {
      // ดึง email จาก oobCode
      const auth = getAuth(app);
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email);
        })
        .catch((error) => {
          console.error('Error verifying password reset code:', error);
          setErrorAlert('Invalid or expired password reset code. Please request a new one.');
        });
    } else {
      // ไม่มี oobCode
      setErrorAlert('Invalid or expired password reset code. Please request a new one.');
    }
  }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleCloseAlert = () => {
    setErrorAlert('');
  };

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      setErrorAlert('Passwords do not match. Please try again.');
      return;
    }

const queryParams = new URLSearchParams(window.location.search);
const oobCode = queryParams.get('oobCode');

    const auth = getAuth(app);
    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        console.log(`Verified password reset code for email: ${email}`);
        confirmPasswordReset(auth, oobCode, password)
          .then(() => {
            console.log('Password reset successful');
            setOpenSnackbar(true);
          })
          .catch((error) => {
            console.error('Error resetting password:', error);
            setErrorAlert('Error resetting password. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Error verifying password reset code:', error);
        setErrorAlert('Invalid or expired password reset code. Please request a new one.');
      });
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
            <img src={pictureLogo} alt="Company Logo" style={{ width: '30%', height: 'auto' }} />
            <h2 style={{ marginBottom: '10%' }}>Recovery Account</h2>
            <Typography>Type your new password</Typography>
            <TextField
              style={{ width: '70%' }}
              margin="normal"
              id="email"
              disabled
              label="Email"
              name="email"
              type="email"
              value={email}
            />
            <TextField
              style={{ width: '70%' }}
              margin="normal"
              id="password"
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              style={{ width: '70%' }}
              margin="normal"
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  width: '45%',
                  marginTop: '3%',
                  backgroundColor: '#68c957',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#4f964c',
                  },
                }}
                onClick={handleResetPassword}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
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
            }}
            onClose={handleCloseAlert}
          >
            {errorAlert}
          </Alert>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiAlert-filledSuccess': {
              backgroundColor: (theme) => theme.palette.success.main,
            },
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: '20px',
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
            Email reset password has been sent.
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
        <img src={recovery} alt="Company Logo" style={{ width: '100%', height: 'auto' }} />
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
