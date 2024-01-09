import React, { useState, useEffect } from 'react';
import { Button, Typography, Avatar, Box } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';

import '../style/course.css';

function Testracing() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [inviteCode, setInviteCode] = useState('');

    const handleClose = () => setOpenDialog(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const generateInviteCode = () => {
        // Generate a random 6-digit code
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        setInviteCode(randomCode.toString());
    };

    useEffect(() => {
        setOpenDialog(true);
        generateInviteCode(); // Generate invite code when component mounts
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <div style={{ marginTop: 5 }}>
                <Box
                    sx={{
                        width: '300px',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: "15px",
                        transition: 'transform 0.4s ease-in-out',
                        transform: openDialog ? 'translateY(+20px)' : 'translateY(-150)',
                        marginLeft: 'auto',
                        marginRight: '20px'
                    }}
                >
                    <div>
                        <Typography style={{ marginTop: '10%' }}>Invite Code</Typography>
                        <Typography>{inviteCode}</Typography>
                    </div>
                </Box>
            </div>
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
                    {/* First Box */}
                    <div>
                        <Box
                            sx={{
                                marginTop: 5,
                                marginRight: '10px',
                                padding: "20px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: "15px",
                                transition: 'transform 0.4s ease-in-out',
                                transform: openDialog ? 'translateY(+70px)' : 'translateY(-150)',
                            }}
                        >
                            <div style={{ border: '2px solid #808080', minWidth: '200px', minHeight: '200px' }}>

                            </div>
                        </Box>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Testracing;
