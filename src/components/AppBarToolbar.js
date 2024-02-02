//SYSTEM
import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Dialog, DialogTitle, Button, Menu, MenuItem } from "@mui/material";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

//ICON
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const AppBarToolbar = ({ user: propUser }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [testHistory, setTestHistory] = useState([]);
    const handleClickOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
    const handleOpenFileInput = () => fileInputRef.current.click();
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const fileInputRef = useRef(null);
    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    const user = propUser || localUser;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                localStorage.setItem(`userImage_${user.id}`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const historyReset = () => {
        const courseData = [
            { id: 1, name: 'English Verb 1' },
            { id: 2, name: 'English Verb 2' },
            { id: 3, name: 'English Verb 3' },
            { id: 4, name: 'English Verb 4' },
        ];

        courseData.forEach((course) => {
            localStorage.removeItem(`game${course.id}Score_${user.id}`);
            localStorage.removeItem(`round_course${course.id}_${user.id}`);
        });

        localStorage.removeItem(`testHistory_${user.id}`);
        setTestHistory([]);
        handleClose();
        handleClickOpen();
        window.location.reload();
    };


    useEffect(() => {
        const storedTestHistory = JSON.parse(localStorage.getItem(`testHistory_${user?.id || ''}`));

        if (storedTestHistory) {
            setTestHistory(storedTestHistory);
        }

        const storedUserImage = localStorage.getItem(`userImage_${user?.id || ''}`);
        if (storedUserImage) {
            setSelectedImage(storedUserImage);
        }
    }, [user?.id]);

    const handleLogout = () => {
        localStorage.removeItem('user', JSON.stringify);
    };


    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '75px', bgcolor: '#51ade0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>
                            <IconButton
                                sx={{ m: 1, bgcolor: isHovered ? '#1F81FE' : 'primary.main', ':hover': { bgcolor: '#1F81FE' }, cursor: 'pointer' }}
                            >
                                {selectedImage ? (
                                    <Avatar
                                        alt="Avatar"
                                        src={selectedImage}
                                        sx={{ width: 40, height: 40, borderRadius: '50%' }}
                                    />
                                ) : (
                                    <PersonIcon />
                                )}
                            </IconButton>
                            <input
                                ref={fileInputRef}
                                id="file-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </label>
                        <Typography variant="h6" component="div" sx={{ marginLeft: 1 }}>
                            Hello! Welcome [ {user.firstname} {user.lastname} ]
                        </Typography>
                    </div>
                    <div>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem component={Link} to="/home" onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <HomeOutlinedIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText> Home</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => { handleMenuClose(); handleClickOpen(); }}>
                                <ListItemIcon>
                                    <AssignmentIndOutlinedIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem component={Link} to="/login" onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutOutlinedIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '15px',
                    "& .MuiDialog-paper": {
                        maxWidth: '100%',
                    },
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    {/* Profile Section */}
                    <div style={{ marginRight: '20px' }}>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '-20px' }}>
                                    <p>{user.username}</p>
                                </div>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="Avatar"
                                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <PersonIcon sx={{ width: 80, height: 80 }} />
                                    )}
                                </Avatar>
                                <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
                                    <TextField
                                        label="Firstname"
                                        id="outlined-read-only-input"
                                        defaultValue={user.firstname}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        label="Lastname"
                                        id="outlined-read-only-input"
                                        defaultValue={user.lastname}
                                        sx={{ marginLeft: '1%' }}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
                                    <TextField
                                        label="StudentID"
                                        id="outlined-read-only-input"
                                        defaultValue={user.personid}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </DialogTitle>
                    </div>

                    {/* History Section */}
                    <div>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '-20px' }}>
                                <p>History Test</p>
                            </div>
                            <div style={{ border: '1px solid black', padding: '10px', minWidth: '500px', minHeight: '200px' }}>
                                <table style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Course</th>
                                            <th>Score</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testHistory && testHistory.map((test, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{test.course}</td>
                                                <td>{test.score}</td>
                                                <td>{test.date}</td>
                                                <td>{test.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', marginTop: '15px', width: '100%' }}>
                                <Button onClick={handleOpenFileInput} variant="contained" endIcon={<AddPhotoAlternateIcon />} style={{ backgroundColor: '#4b76db', marginLeft: '15px' }}>
                                    Change Image
                                </Button>
                                <Button onClick={historyReset} variant="contained" endIcon={<RestartAltIcon />} style={{ backgroundColor: '#4b76db', marginLeft: '15px' }}>
                                    Clear All Test
                                </Button>
                            </div>
                        </DialogTitle>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AppBarToolbar;
