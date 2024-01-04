import { Button, Toolbar, IconButton, Typography, Avatar, Tooltip, Box } from "@mui/material";
import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import loginBackground from '../img/login.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CallIcon from '@mui/icons-material/Call';
import { Link } from 'react-router-dom';

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

    const testUsers = [
      { id: '1', username: 'Raccoon', password: '123' , firstname:'Micheal' , lastname:'Johansan' , personid:'6852100741'},
      { id: '2', username: 'Cat', password: '123' , firstname:'Steven' , lastname:'Blackburgur' , personid:'6852100732'},
      { id: '3', username: 'Dog', password: '123' , firstname:'Jonathan' , lastname:'Bermington' , personid:'6852100748'},
    ];

    const lowerCaseUsername = username.toLowerCase();
    const lowerCasePassword = password.toLowerCase();

    const user = testUsers.find((u) => u.username.toLowerCase() === lowerCaseUsername && u.password === lowerCasePassword);

    if (user) {
      login(user.id, user.username, user.firstname, user.lastname, user.personid);
      setLoginStatus('success');
      console.log('เข้าสู่ระบบสำเร็จ');
      console.log('User', user);
      setTimeout(() => {
        navigate('/course');
      }, 1000); 
    } else {
      setLoginStatus('error');
      console.log('ชื่อผู้ใช้หรือรหัสผ่านผิด');
    }
  };

  return (
    <div className='main-content' style={{ height: '100vh', backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', margin: '0px', padding: '0px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#8ac3e3' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* เนื้อหาใน Toolbar ด้านบน */}
        </div>
      </Toolbar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            padding: "50px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: "15px",
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
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
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
              เข้าสู่ระบบ
            </Button>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p style={{ color: 'gray', fontSize: '16px', margin: '0' }}>
              {loginStatus === 'success' && (
                <div style={{ color: 'green', marginBottom: '10px' }}>
                  เข้าสู่ระบบสำเร็จ
                </div>
              )}
              {loginStatus === 'error' && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  ชื่อผู้ใช้ หรือ รหัสผ่านผิดพลาด
                </div>
              )}
            </p>
          </Box>
        </Box>
      </Container>


      <Toolbar sx={{ bgcolor: '#8ac3e3', position: 'absolute', bottom: '0', left: '0', width: '97.5%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', bottom: '0', right: '0', marginRight: '3%' }}>
            <Tooltip title="Facebook">
              <IconButton
                component={Link}
                to="https://www.facebook.com/"
                sx={{
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <FacebookIcon sx={{ width: '3rem', height: '3rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward to Inbox" style={{marginLeft:'1vw'}}>
              <IconButton
                component={Link}
                to="https://mail.google.com/"
                sx={{
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <ForwardToInboxIcon sx={{ width: '3rem', height: '3rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram" style={{marginLeft:'1vw'}}>
              <IconButton
                component={Link}
                to="https://www.instagram.com/"
                sx={{
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <InstagramIcon sx={{ width: '3rem', height: '3rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Call : 0123-456-789" style={{marginLeft:'1vw'}}>
              <IconButton
                sx={{
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <CallIcon sx={{ width: '3rem', height: '3rem' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Toolbar>
    </div>
  );
}

export default Login;
