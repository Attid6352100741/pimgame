// register.js
import { Button, Typography, Avatar, Box, Alert, Snackbar } from "@mui/material";
import { addUserToFirebase, getUsersFromFirebase } from '../api/apiconfig';
import pictureLogo from '../img/Logo.png'
import React, { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Autocomplete from '@mui/material/Autocomplete';
import english from '../img/english.png'
import qrcode from '../img/qrcode.png';
import '../style/login.css';

function Register() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const roleList = useMemo(() => ["Teacher", "Student"], []);
  const [errorAlert, setErrorAlert] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleCloseSnackbar = () => {
    setRegisterSuccess(false);
  };

  const handleFirstnameChange = (event) => {
    const newFirstname = event.target.value;
    setFirstname(newFirstname);
  };

  const handleLastnameChange = (event) => {
    const newLastname = event.target.value;
    setLastname(newLastname);
  };

  const handleRoleChange = (event, newValue) => {
    if (newValue) {
      setRole(newValue);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleCloseAlert = () => {
    setErrorAlert('');
  };

  const handleBack = () => {
    navigate('/login');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorAlert('');

    if (await isDuplicateData()) {
      setErrorAlert('Student ID or Email already exists');
      setTimeout(handleCloseAlert, 5000);
      return;
    }

    if (password.length < 6) {
      setErrorAlert('Password must be at least 6 characters long');
      setTimeout(handleCloseAlert, 5000);
      return;
    }

    if (password !== confirmPassword) {
      setErrorAlert('Password and Confirm Password do not match');
      setTimeout(handleCloseAlert, 5000);
      return;
    }

    if (!studentId || !firstname || !lastname || !email || !role) {
      setErrorAlert('Please fill in all required fields');
      setTimeout(handleCloseAlert, 5000);
      return;
    }

    const newUser = {
      studentId,
      email,
      firstname,
      lastname,
      password,
      role,
    };

    try {
      await addUserToFirebase(newUser);
      setRegisterSuccess(true);
      getUsersFromFirebase();
    } catch (error) {
      console.error('Error adding user to Firebase:', error);
      setErrorAlert('Failed to register. Please try again.');
    }
  };

  const isDuplicateData = async () => {
    try {
      const usersData = await getUsersFromFirebase();
      const duplicateStudentId = Object.values(usersData).some(user => user.studentId === studentId);
      const duplicateEmail = Object.values(usersData).some(user => user.email === email);

      return duplicateStudentId || duplicateEmail;
    } catch (error) {
      console.error('Error checking for duplicate data:', error);
      return false;
    }
  };

  const navigate = useNavigate();
  if (registerSuccess) {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }

  return (
    <div className="main" style={{ backgroundColor: 'pink', width: '100vw', height: '100vh', display: 'flex' }}>
      <div className="header1" style={{ backgroundColor: '#f6f7f1', width: '70%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
        <div className="content" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Box sx={{ mt: 1 }}>
            <div style={{ textAlign: 'center' }}>
              <img src={pictureLogo} alt="Company Logo" style={{ width: '20%', height: 'auto' }} />
              <h2 style={{}}>Register Account</h2>
            </div>
            <TextField
              style={{ width: '100%' }}
              margin="normal"
              required
              id="studentId"
              label="Student ID"
              name="studentId"
              autoFocus
              value={studentId}
              onChange={(event) => {
                const inputText = event.target.value;
                const numericInput = inputText.replace(/\D/g, '');
                setStudentId(numericInput.slice(0, 10));
              }}
            />

            <div style={{ display: 'flex' }}>
              <TextField
                style={{ width: '100%', marginRight: '2%' }}
                margin="normal"
                required
                id="firstname"
                label="FisrtName"
                name="firstname"
                autoFocus
                value={firstname}
                onChange={handleFirstnameChange}
              />
              <TextField
                style={{ width: '100%' }}
                margin="normal"
                required
                id="lastname"
                label="LastName"
                name="lastname"
                autoFocus
                value={lastname}
                onChange={handleLastnameChange}
              />
            </div>
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
            <TextField
              style={{ width: '100%' }}
              margin="normal"
              required
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <TextField
              style={{ width: '100%' }}
              margin="normal"
              required
              name="email"
              label="Email"
              type="email"
              id="email "
              value={email}
              onChange={handleEmailChange}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={roleList}
              sx={{ width: '100%', marginTop: '3%' }}
              onChange={handleRoleChange}
              renderInput={(params) => <TextField {...params} label="Role" />}
            />
            <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ width: '20%', marginRight: '2%' , backgroundColor:'#ff5f59'}}
                onClick={handleBack}
              >
                Back
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  width: '20%',
                  backgroundColor: '#68c957',
                  '&:hover': {
                    backgroundColor: '#4f964c',
                  },
                }}
                onClick={handleSubmit}
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
              open={registerSuccess}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              message="Register Successful"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                Register Successful
              </Alert>
            </Snackbar>
          </Box>
        </div>
        {/* Footer */}
        <div className="footer" style={{ backgroundColor: '#3fab3f', width: '100%', textAlign: 'center', height: '5%' }}>
          <Typography variant="caption" style={{ color: 'white' }}>
            © Panyapiwat institute of management.
          </Typography>
        </div>
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

export default Register;
