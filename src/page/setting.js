//SYSTEM
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, TextField, Avatar } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AppBarToolbar from '../components/AppBarToolbar';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import '../style/course.css';

//ICON
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

function Setting() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [animationBox2, setAnimationBox2] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);

    const userList = JSON.parse(localStorage.getItem('UserList')) || [];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUserClick = (userId) => {
        console.log(`User ${userId} clicked`);
    };

    const handleSearchNameChange = (event) => {
        const searchName = event.target.value.toLowerCase();
        const filteredUsers = userList.filter(user =>
            user.firstname.toLowerCase().includes(searchName) ||
            user.lastname.toLowerCase().includes(searchName)
        );
        setUsers(filteredUsers);
        setCurrentPage(1); 
    };

    const handleSearchStudentIDChange = (event) => {
        const searchStudentID = event.target.value.toLowerCase();
        const filteredUsers = userList.filter(user =>
            user.studentId.toLowerCase().includes(searchStudentID)
        );
        setUsers(filteredUsers);
        setCurrentPage(1);
    };

    const handleSearchRoleChange = (event, value) => {
        const searchRole = value ? value.toLowerCase() : '';
        const filteredUsers = searchRole
            ? userList.filter(user => user.role.toLowerCase() === searchRole)
            : userList;
        setUsers(filteredUsers);
        setCurrentPage(1);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        setAnimationBox2(true);
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
                                    transition: 'transform 0.2s ease-in-out',
                                    transform: animationBox2 ? 'translateY(0%)' : 'translateY(50%)',
                                    height: '75vh',
                                }}
                            >
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
                                                <ListItem button key={user.id} onClick={() => handleUserClick(user.id)}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt="Avatar"
                                                            src={JSON.parse(localStorage.getItem(`profileImgList`))[user.id]?.imageLink || ''}
                                                            sx={{ width: 40, height: 40, borderRadius: '50%' }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${user.firstname} ${user.lastname}`} secondary={`ID: ${user.studentId}`} />
                                                    <Tooltip title={user.role} arrow placement="top">
                                                        <Box
                                                            component={Avatar}
                                                            alt="Avatar"
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: '50%',
                                                                bgcolor: user.role === 'Teacher' ? '#FF5733' : '#26c742',
                                                                color: '#FFFFFF',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            {user.role === 'Teacher' && <ManageAccountsRoundedIcon />}
                                                            {user.role === 'Student' && <PersonRoundedIcon />}
                                                        </Box>
                                                    </Tooltip>
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                    <div style={{ position: 'fixed', bottom: '4%', left: '50%', transform: 'translateX(-50%)' }}>
                                        <Pagination
                                            count={Math.ceil(users.length / usersPerPage)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                        />
                                    </div>
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
