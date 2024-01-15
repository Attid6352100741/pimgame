import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Button from '@mui/material/Button';
import systempicture from '../gif/system.gif'
import coursepicture from '../gif/course.gif'
import gamespicture from '../gif/games.gif'

import '../style/course.css';

function Home() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const isStudent = user && user.roll === 'Student';

    const handleClose = () => setOpenDialog(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCourse = () => {
        navigate('/home/course');
    };

    const handleTestRacing = () => {
        navigate('/home/testracing');
    };

    useEffect(() => {
        setOpenDialog(true);
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {/* First Box */}
                    <div style={{ flex: '1 0 100%', maxWidth: '330px' }}>
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
                                transition: 'transform .7s ease-in-out',
                                transform: openDialog ? 'translateY(+70px)' : 'translateY(-150)',
                            }}
                        >
                            <div style={{
                                backgroundImage: `url(${coursepicture})`,
                                backgroundSize: 'contain',
                                width: '100%',
                                height: '150px',
                            }}>
                            </div>
                            <div>
                                <Button variant="contained" onClick={handleTestRacing}>Test Racing</Button>
                            </div>
                        </Box>
                    </div>

                    {/* Second Box */}
                    <div style={{ flex: '1 0 100%', maxWidth: '350px' }}>
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
                                transition: 'transform 1s ease-in-out',
                                transform: openDialog ? 'translateY(+70px)' : 'translateY(-120)',
                            }}
                        >
                            <div style={{
                                backgroundImage: `url(${gamespicture})`,
                                backgroundSize: 'contain',
                                width: '100%',
                                height: '150px',
                                margin: '0px',
                                padding: '0px',
                                overflowY: 'auto',
                            }}>
                            </div>
                            <div>
                                <Button variant="contained" onClick={handleCourse}>Course</Button>
                            </div>
                        </Box>
                    </div>
                    {/* Third Box */}
                    {isStudent ? null : (
                        <div style={{ flex: '1 0 100%', maxWidth: '250px' }}>
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
                                <div style={{
                                    backgroundImage: `url(${systempicture})`,
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '150px',
                                    margin: '0px',
                                    padding: '0px',
                                    overflowY: 'auto',
                                }}>
                                </div>
                                <div>
                                    <Button variant="contained">Setting</Button>
                                </div>
                            </Box>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
