import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import {
    AppBar,
    Typography,
    Container,
    Snackbar,
    Alert,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useUser } from '../components/UserContext';
import AppBarToolbar from '../components/AppBarToolbar';

//ICON
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Profile() {
    const { user, logout } = useUser();

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='header' style={{ backgroundColor: 'white', width: '70vw', height: 'auto', borderRadius: '10px', marginTop: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%' }}>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 150, height: 150 }} />
                        <h2>Attid Kingkoiklang</h2>
                        <Typography>6352100741</Typography>
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
                                    {/* เพิ่มแถวข้อมูลตามที่ต้องการ */}
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 1</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>90</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-07</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 2</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>85</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-08</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 3</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>42</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-09</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 4</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>12</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-10</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>Course 5</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>86</td>
                                        <td style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>2024-03-11</td>
                                    </tr>
                                    {/* เพิ่มแถวข้อมูลตามที่ต้องการ 3 แถวถึง 5 แถว */}
                                </tbody>
                            </table>
                        </div>
                        <div className='box2' style={{ width: '100%', height: '100%', marginLeft: '5%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                    <Typography>Firstname</Typography>
                                    <TextField
                                        disabled
                                        value={'Attid'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton disabled>
                                                        <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                    </IconButton>
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
                                        value={'Kingkoiklang'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton disabled>
                                                        <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                    </IconButton>
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
                                        value={'6352100741'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton disabled>
                                                        <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                    </IconButton>
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
                                        value={'Student'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton disabled>
                                                        <PersonOutlineOutlinedIcon style={{ fontSize: '30' }} />
                                                    </IconButton>
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
                                        value={'attid.1987@gmail.com'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton disabled>
                                                        <EmailOutlinedIcon style={{ fontSize: '30' }} />
                                                    </IconButton>
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
