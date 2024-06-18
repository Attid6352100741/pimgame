import React, { useState } from 'react';
import { Button, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, getUserByEmail } from 'firebase/auth';
import pictureLogo from '../img/Logo.png';
import recovery from '../img/recovery.png';
import english from '../img/english.png';
import { app } from '../api/apiconfig';

function Forgotpassword() {
  const [username, setUsername] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handleCloseAlert = () => {
    setErrorAlert('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorAlert('');

    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, username);
      setOpenSnackbar(true);
    } catch (error) {
      setErrorAlert('Failed to send reset email. Please check your email address.');
      setTimeout(handleCloseAlert, 5000);
      console.error('Failed to send reset email:', error.message);
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
            <img src={pictureLogo} alt="Company Logo" style={{ width: '30%', height: 'auto' }} />
            <h2 style={{ marginBottom: '10%' }}>Recovery Account</h2>
            <Typography>Please fill your Email address</Typography>
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
            <div>
              <Button
                fullWidth
                variant="contained"
                color='error'
                sx={{ width: '20%', marginTop: '3%', marginRight: '2%' , backgroundColor:'#ff5f59'}}
                onClick={handleBack}
              >
                Back
              </Button>
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
                onClick={handleSubmit}
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

export default Forgotpassword;
