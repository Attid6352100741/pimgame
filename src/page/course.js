
import { Divider } from '@mui/material';
import { Typography, Button, TextField, Autocomplete } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CardActions, CardContent, CardMedia, Card } from "@mui/material";
import AppBarToolbar from '../components/AppBarToolbar';
import { useUser } from '../components/UserContext';
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

//ICON
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

function Course() {
    const { user, logout } = useUser();

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
    ];

    const fakeData = [
        { id: 1, name: 'Verb-1', owner: 'Owner 1', member: '24' },
    ];

    const groupedData = Array.from({ length: Math.ceil(fakeData.length / 4) }, (_, index) => fakeData.slice(index * 4, (index + 1) * 4));

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} />
            <Container component="main" maxWidth="xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='box1' style={{ marginTop: '2%', width: '70vw', height: '83vh', backgroundColor: 'white', borderRadius: '20px' }}>
                    <div className='header' style={{ padding: '4%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', width: '50%' }}>
                            <SchoolOutlinedIcon style={{ marginRight: '3%', fontSize: '45px' }} />
                            <Typography style={{ fontSize: '30px', fontWeight: 'bold', }}>Course Management</Typography>
                        </div>
                        <Button variant="contained"
                            size="small"
                            style={{ width: '20%' }}
                            sx={{
                                width: '20%',
                                backgroundColor: '#68c957',
                                '&:hover': {
                                    backgroundColor: '#4f964c',
                                },
                            }}
                            startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} />} >Create new course</Button>
                    </div>
                    <Divider sx={{ margin: '0.5%', border: '1px solid gray' }} />
                    <div className='content' style={{ display: 'flex', margin: '2%', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2%' }}>
                            <Typography>Search Name</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>Search Owner</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div style={{ textAlign: 'left', marginLeft: '2%   ' }}>
                            <Typography>Total Course 5</Typography>
                        </div>
                    </div>
                    <div className='content' style={{ display: 'flex', margin: '2%', flexWrap: 'wrap' }}>
                        {groupedData.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px' }}>
                                {row.map((item) => (
                                    <Card key={item.id} sx={{ minWidth: 300, marginRight: '2%' }}>
                                        <CardContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {item.name}
                                                </Typography>
                                                <Typography component="div" style={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                    <PeopleAltOutlinedIcon fontSize="small" style={{ marginRight: '5px' }} />
                                                    {item.member}
                                                </Typography>
                                            </div>
                                            <Typography variant="body2" color="text.secondary">
                                                Owner: {item.owner}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Visit</Button>
                                            <Button size="small">Setting</Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Course;
