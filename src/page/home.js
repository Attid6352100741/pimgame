import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Typography, Avatar, Dialog, DialogTitle, Button, Menu, MenuItem } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';

// Mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Pictures
import banner1 from "../img/banner1.png";
import banner2 from "../img/banner2.png";
import group from "../img/group.png";
import course from "../img/course.png";
import race from "../img/race.png";

function Home() {
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
                <div className='banner' style={{ width: '100vw', height: '30vh', backgroundColor: 'black', overflow: 'hidden' }}>
                    <Slider autoplay={true} autoplaySpeed={5000} infinite={true} speed={2000}>
                        <div>
                            <img src={banner1} alt="Slide 1" style={{ width: '100%', height: '30.4vh', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <img src={banner2} alt="Slide 2" style={{ width: '100%', height: '30.4vh', objectFit: 'contain' }} />
                        </div>
                    </Slider>
                </div>
                <div className='title' style={{ marginTop: '10%' }}>
                    <Typography variant="h3" style={{ fontWeight: 'bold', fontSize: '24px' }}>
                        Status Board
                    </Typography>
                </div>
                <div className='status' style={{ display: 'flex' }}>
                    <List style={{ width: '100vw', display: 'flex' }}>
                        <ListItem>
                            <Card sx={{ maxWidth: 700 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="100%"
                                    image={group}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Group
                                    </Typography>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        ENG Group template
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ width: '100%', height: '4vh' }}
                                        onClick={() => navigate('/group')}
                                    >
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                        <ListItem>
                            <Card sx={{ maxWidth: 700 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="100%"
                                    image={course}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Course
                                    </Typography>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        ENG Course template
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ width: '100%', height: '4vh', backgroundColor: '#68c957' }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#4f964c',
                                            },
                                        }}
                                        onClick={() => navigate('/course')}
                                    >
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                        <ListItem>
                            <Card sx={{ maxWidth: 700 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="100%"
                                    image={race}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Race
                                    </Typography>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        ENG Race template
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ width: '100%', height: '4vh', backgroundColor: '#e85046' }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#cf3a30',
                                            },
                                        }}
                                        onClick={() => navigate('/racing')}
                                    >
                                        Enter Code
                                    </Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                    </List>
                </div>
            </Container>
        </div>
    );
}

export default Home;
