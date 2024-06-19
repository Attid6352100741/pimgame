import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography, Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useUser } from '../components/UserContext';
import AppBarToolbar from '../components/AppBarToolbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Profile() {
    const { user, logout } = useUser();

    // Retrieve userData from localStorage
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='header' style={{ backgroundColor: 'white', width: '70vw', height: 'auto', borderRadius: '10px', marginTop: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%' }}>
                        <Avatar alt={userData?.firstname + ' ' + userData?.lastname} src="/static/images/avatar/3.jpg" sx={{ width: 150, height: 150 }} />
                        <h2>{userData?.firstname + ' ' + userData?.lastname}</h2>
                        <Typography>{userData?.studentId}</Typography>
                    </div>
                    <Divider sx={{ margin: '2%', border: '1px solid gray', width: '97%' }} />

                    <div className='content2' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <div className='box1' style={{ width: '100%', height: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                <h2>History Test</h2>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid gray', padding: '8px', textAlign: 'center', width: '20vw' }}>Course</th>
                                        <th style={{ border: '1px solid gray', padding: '8px', textAlign: 'center', width: '20vw' }}>Score</th>
                                        <th style={{ border: '1px solid gray', padding: '8px', textAlign: 'center', width: '20vw' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example rows */}
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 1</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>90</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-07</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                        <div className='box2' style={{ width: '100%', height: '100%', marginLeft: '5%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                    <Typography>Firstname</Typography>
                                    <TextField
                                        disabled
                                        value={userData?.firstname}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', fontWeight: 'bold' }
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '3%' }}>
                                    <Typography>Lastname</Typography>
                                    <TextField
                                        disabled
                                        value={userData?.lastname}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', fontWeight: 'bold' }
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                    <Typography>ID</Typography>
                                    <TextField
                                        disabled
                                        value={userData?.studentId}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', fontWeight: 'bold' }
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '3%' }}>
                                    <Typography>Role</Typography>
                                    <TextField
                                        disabled
                                        value={userData?.role}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', fontWeight: 'bold' }
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Typography>Email</Typography>
                                    <TextField
                                        disabled
                                        value={userData?.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlinedIcon style={{ fontSize: '30' }} />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', fontWeight: 'bold' }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div >
    );
}

export default Profile;
