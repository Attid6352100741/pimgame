import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Typography, Avatar, Dialog, DialogTitle, Button, Menu, MenuItem, TextField } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';

//Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//PICTURE
import banner1 from "../img/racing1.png"
import banner2 from "../img/racing2.png"

//ICON
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

function Racing() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='banner' style={{ width: '100vw', height: '25vh', backgroundColor: 'black', overflow: 'hidden' }}>
                    <Slider autoplay={true} autoplaySpeed={5000} infinite={true} speed={2000}>
                        <div>
                            <img src={banner1} alt="Slide 1" style={{ width: '100%', height: '30.4vh', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <img src={banner2} alt="Slide 2" style={{ width: '100%', height: '30.4vh', objectFit: 'contain' }} />
                        </div>
                    </Slider>
                </div>
                <div className='code' style={{ marginTop: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>ENTER YOUR CODE GAME</Typography>
                    <div className='status' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField style={{ width: '20vw', backgroundColor: 'white', border: 'solid 1px' }}>
                        </TextField>
                        <div style={{ display:'flex' , flexDirection:'row' , width:'100%'}}>
                            <Button variant="contained"
                                size="small"
                                sx={{
                                    marginTop: '5%',
                                    width: '100%',
                                    height: '4vh',
                                    backgroundColor: '#19b4bd',
                                    '&:hover': {
                                        backgroundColor: '#0f9299',
                                    },
                                }}
                                startIcon={<PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 25 }} />} >Create new room
                            </Button>
                            <Button variant="contained"
                                size="small"
                                sx={{
                                    marginLeft:'2%',
                                    marginTop: '5%',
                                    width: '100%',
                                    height: '4vh',
                                    backgroundColor: '#68c957',
                                    '&:hover': {
                                        backgroundColor: '#4f964c',
                                    },
                                }}
                                startIcon={<PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 25 }} />} >Connect
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Racing;
