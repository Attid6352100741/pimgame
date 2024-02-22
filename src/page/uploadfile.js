//SYSTEM
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Avatar } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import '../style/course.css';

//ICON
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

function Uploadfile() {
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
                                    width: '70vw'
                                }}
                            >
                                <div>
                                    <h2>UploadFile Excel Test</h2>
                                </div>
                                <div style={{ marginTop: '3%' }}>
                                    <Typography>  </Typography>
                                    <TextField></TextField>
                                </div>
                            </Box>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Uploadfile;
