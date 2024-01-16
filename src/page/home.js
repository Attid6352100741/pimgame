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

import '../style/home.css';

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
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" className="container">
                <div className="responsive-container">
                    {/* First Box */}
                    <div>
                        <Box
                            sx={{
                                marginTop: 5,
                                marginRight: '10px',
                                marginBottom: '20px',
                                padding: "20px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: "15px",
                                width: '20vw',
                                height: '35vh',
                                transition: 'transform .7s ease-in-out',
                            }}
                        >
                            <div style={{
                                backgroundImage: `url(${coursepicture})`,
                                backgroundSize: 'contain',
                                width: '20vw',
                                height: '30vh',
                            }}>
                            </div>
                            <div>
                                <Button variant="contained" onClick={handleTestRacing} sx={{ width: '8vw', marginTop: '10%' }}>Racing</Button>
                            </div>
                        </Box>
                    </div>

                    {/* Second Box */}
                    <div>
                        <Box
                            sx={{
                                marginTop: 5,
                                marginRight: '10px',
                                marginBottom: '20px',
                                padding: "20px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: "15px",
                                width: '20vw',
                                height: '35vh',
                                transition: 'transform 1s ease-in-out',
                            }}
                        >
                            <div style={{
                                backgroundImage: `url(${gamespicture})`,
                                backgroundSize: 'contain',
                                width: '20vw',
                                height: '30vh',
                            }}>
                            </div>
                            <div>
                                <Button variant="contained" onClick={handleCourse} sx={{ width: '8vw', marginTop: '10%' }}>Course</Button>
                            </div>
                        </Box>
                    </div>

                    {/* Third Box */}
                    {isStudent ? null : (
                        <div>
                            <Box
                                sx={{
                                    marginTop: 5,
                                    marginRight: '10px',
                                    marginBottom: '20px',
                                    padding: "20px",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    bgcolor: 'background.paper',
                                    borderRadius: "15px",
                                    width: '20vw',
                                    height: '35vh',
                                    transition: 'transform 0.4s ease-in-out',
                                }}
                            >
                                <div style={{
                                    backgroundImage: `url(${systempicture})`,
                                    backgroundSize: 'cover',
                                    width: '20vw',
                                    height: '30vh',
                                }}>
                                </div>
                                <div>
                                    <Button variant="contained" sx={{ width: '8vw', marginTop: '10%' }}>Setting</Button>
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
