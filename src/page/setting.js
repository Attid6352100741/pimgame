import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';  // Make sure ListItemAvatar is also imported
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, TextField, CircularProgress, IconButton, Menu, MenuItem, Avatar } from "@mui/material";  // Include Avatar in the import statement
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AppBarToolbar from '../components/AppBarToolbar';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { getDatabase, ref, update, get } from 'firebase/database';
import '../style/course.css';

// ICON
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'; // Replace with appropriate icon

import { app } from '../api/apiconfig';

function Setting() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [searchName, setSearchName] = useState('');
    const [searchStudentID, setSearchStudentID] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUserClick = (userId) => {
        console.log(`User ${userId} clicked`);
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value.toLowerCase());
    };

    const handleSearchStudentIDChange = (event) => {
        setSearchStudentID(event.target.value.toLowerCase());
    };

    const handleSearchRoleChange = (event, value) => {
        setSearchRole(value ? value.toLowerCase() : '');
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        handleMenuClose();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const usersRef = ref(db, 'users');

                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const allUsers = Object.values(usersData);

                    const filteredUsers = allUsers.filter(user =>
                        (user.firstname.toLowerCase().includes(searchName) ||
                            user.lastname.toLowerCase().includes(searchName)) &&
                        user.studentId.toLowerCase().includes(searchStudentID) &&
                        (searchRole ? user.role.toLowerCase() === searchRole : true)
                    );

                    setUsers(filteredUsers);
                } else {
                    console.log('No users data available');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchName, searchStudentID, searchRole]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const toggleUserRole = async (userId, newRole) => {
        try {
            const db = getDatabase(app);
            const usersRef = ref(db, 'users');

            // ค้นหาผู้ใช้ที่ต้องการอัปเดตโดยใช้ userId ใน Firebase
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const allUsers = Object.entries(usersData);

                // หาข้อมูลของผู้ใช้ที่ต้องการอัปเดตโดยใช้ userId และ studentId
                allUsers.forEach(([key, user]) => {
                    if (user.studentId === userId) {
                        update(ref(db, `users/${key}`), { ...user, role: newRole });
                    }
                });

                // อัปเดต state ใน local สำหรับการแสดงผลทันที
                const updatedUsers = users.map(user => {
                    if (user.id === userId) {
                        return { ...user, role: newRole };
                    }
                    return user;
                });
                setUsers(updatedUsers);

                console.log('อัปเดตบทบาทผู้ใช้สำเร็จ');
            } else {
                console.log('No users data available');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตบทบาทผู้ใช้:', error);
        }
    };



    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f6f7f1', display: 'flex', flexDirection: 'column' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
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
                                    height: '75vh',
                                }}
                            >
                                {loading ? (
                                    <div style={{
                                        height: '50vh',
                                        width: '50vw',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <CircularProgress size={100} thickness={5} />
                                        <Typography style={{ marginTop: '5%' }}>Loading ... Please Wait</Typography>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <h2>Data Setting</h2>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '2%', alignItems: 'flex-end', width: '100%' }}>
                                            <div style={{ marginRight: '2%', flex: 1 }}>
                                                <Typography>Search Name</Typography>
                                                <TextField fullWidth onChange={handleSearchNameChange} />
                                            </div>
                                            <div style={{ marginRight: '2%', flex: 1 }}>
                                                <Typography>Search ID</Typography>
                                                <TextField fullWidth onChange={handleSearchStudentIDChange} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <Typography>Search Role</Typography>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={["Teacher", "Student"]}
                                                    sx={{ width: '100%' }}
                                                    onChange={handleSearchRoleChange}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </div>
                                        </div>
                                        <Divider />
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {currentUsers.length === 0 ? (
                                                <Typography style={{ width: '50vw', textAlign: 'center', color: 'gray', marginTop: '5%', height: '60vh' }}>No Data Found</Typography>
                                            ) : (
                                                <List style={{ width: '50vw' }}>
                                                    {currentUsers.map((user) => (
                                                        <ListItem key={user.id}>
                                                            <ListItemAvatar>
                                                                <Tooltip title={`${user.role}`} arrow placement="top">
                                                                    <Avatar
                                                                        alt="Avatar"
                                                                        src={(JSON.parse(localStorage.getItem('profileImgList')) || {})[user.id]?.imageLink || ''}
                                                                        sx={{
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: '50%',
                                                                            bgcolor: user.role === 'Teacher' ? '#26c742' : '#1976d2', // Green for Teacher, Blue for Student
                                                                        }}
                                                                    >
                                                                        {user.role === 'Teacher' ? <ManageAccountsRoundedIcon /> : <PersonRoundedIcon />}
                                                                    </Avatar>
                                                                </Tooltip>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={`${user.firstname} ${user.lastname}`} secondary={`ID: ${user.studentId}`} />
                                                            <Tooltip title={user.role} arrow placement="top">
                                                                <IconButton onClick={handleMenuOpen} color="primary">
                                                                    <UpdateRoundedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Menu
                                                                anchorEl={anchorEl}
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleMenuClose}
                                                            >
                                                                <MenuItem onClick={() => { toggleUserRole(user.id, 'Student'); handleMenuClose(); }}>Student</MenuItem>
                                                                <MenuItem onClick={() => { toggleUserRole(user.id, 'Teacher'); handleMenuClose(); }}>Teacher</MenuItem>
                                                            </Menu>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            )}
                                            <div style={{ position: 'fixed', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                                                <Pagination
                                                    count={Math.ceil(users.length / usersPerPage)}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Box>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Setting;
