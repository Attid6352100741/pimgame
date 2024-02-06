import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, TextField } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Divider from '@mui/material/Divider';

import '../style/course.css';

function Setting() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [animationBox1, setAnimationBox1] = useState(false);
    const [animationBox2, setAnimationBox2] = useState(false);
    const [users, setUsers] = useState([]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUserClick = (userId) => {
        console.log(`User ${userId} clicked`);
    };

    useEffect(() => {
        setAnimationBox1(true);
        setAnimationBox2(true);
        const userList = JSON.parse(localStorage.getItem('UserList')) || [];
        setUsers(userList);
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
                    {/* First Box */}
                    <div style={{ marginTop: '2.2%', width: '100%' }}>
                        <div style={{ marginLeft: '1%', width: '100%' }}>
                            <Box
                                sx={{
                                    marginTop: 2,
                                    padding: "30px",
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    bgcolor: 'background.paper',
                                    borderRadius: "15px",
                                    transition: 'transform 0.6s ease-in-out',
                                    transform: animationBox2 ? 'translateY(0%)' : 'translateY(50%)',
                                }}
                            >
                                <div>
                                    <h2>Data Setting</h2>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '2%', alignItems: 'flex-end', width: '100%' }}>
                                    <div style={{ marginRight: '2%', flex: 1 }}>
                                        <Typography>Search Name</Typography>
                                        <TextField fullWidth />
                                    </div>
                                    <div style={{ marginRight: '2%', flex: 1 }}>
                                        <Typography>Search StudentID</Typography>
                                        <TextField fullWidth />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Typography>Search Role</Typography>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={["Teacher", "Student"]}
                                            sx={{ width: '100%' }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex'  }}>
                                    <List style={{ width: '50vw' }}>
                                        {users.map((user) => (
                                            <ListItem button key={user.id} onClick={() => handleUserClick(user.id)}>
                                                <ListItemAvatar>
                                                    {/* You can display user avatar or icon here */}
                                                </ListItemAvatar>
                                                <ListItemText primary={`${user.firstname} ${user.lastname}`} secondary={`ID: ${user.studentId}, Role: ${user.role}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </Box>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Setting;
