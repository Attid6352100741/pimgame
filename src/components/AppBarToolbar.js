// apptoolbar.js

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getUsersFromFirebase } from '../api/apiconfig';

// ICONS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

const AppBarToolbar = ({ user: propUser }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Read user data from local storage
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
        setUserData(userDataFromLocalStorage || {});
        setUserRole(userDataFromLocalStorage?.role || '');
    }, []);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '75px', bgcolor: '#3fab3f' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography style={{ marginRight: '8px' }}>{`${userData.firstname} ${userData.lastname} [${userData.role}]`}</Typography>
                        <Avatar alt={`${userData.firstname} ${userData.lastname}`} src={userData.profileImageUrl} sx={{ width: 40, height: 40 }} />
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                style={{ height: '100vh', overflowY: 'auto' }}
                disableAutoFocusItem
            >
                <div className='footer' style={{ backgroundColor: '#3fab3f', height: '6.6%' }}>
                    <div className='menu' style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                        <h3>Discovery Menu</h3>
                    </div>
                </div>
                <List style={{ width: '15vw' }}>
                    <ListItem button component="a" href="/home" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                    <ListItem button component="a" href="/group" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <PeopleAltOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Group" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                    <ListItem button component="a" href="/course" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <SchoolOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Course" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                    <ListItem button component="a" href="/racing" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <SportsEsportsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Racing Word Games" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                    <ListItem button component="a" href="/profile" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                    {userRole === 'Teacher' && (
                        <>
                            <ListItem button component="a" href="/uploadfile" style={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemIcon>
                                    <FileUploadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Upload File" />
                            </ListItem>
                            <Divider style={{ margin: '10px 0' }} />
                            <ListItem button component="a" href="/setting" style={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemIcon>
                                    <ManageAccountsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Management" />
                            </ListItem>
                            <Divider style={{ margin: '10px 0' }} />
                        </>
                    )}
                    <ListItem button component="a" href="/login" style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <LogoutOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                    <Divider style={{ margin: '10px 0' }} />
                </List>
                <div className='footer' style={{ backgroundColor: '#3fab3f', height: '3%', position: 'absolute', bottom: 0, width: '100%' }}>
                </div>
            </Drawer>
        </>
    );
};

export default AppBarToolbar;
