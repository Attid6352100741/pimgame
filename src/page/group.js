import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import { Divider, Card, CardContent, CardActions, Select, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/material';
import AppBarToolbar from '../components/AppBarToolbar';
import { useUser } from '../components/UserContext';
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Popper, Paper } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addUserToFirebase } from '../api/apiconfig';
import { getUsersFromFirebase } from '../api/apiconfig';

//ICON
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

function Group() {
    const { user, logout } = useUser();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [owner, setOwner] = useState(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [userNames, setUserNames] = useState([]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleCreateGroupClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        const groupName = document.getElementById('group-name').value;
        const members = ['member1', 'member2', 'member3'];

        setOwner(null);

        const newGroup = {
            name: groupName,
            owner: owner ? `${owner.firstname} ${owner.lastname}` : null,
            members: members,
        };

        addUserToFirebase(newGroup)
            .then(() => {
                console.log('Group added successfully to Firebase');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Error adding group to Firebase:', error);
            });

        setDialogOpen(false);
    };



    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
    ];

    const fakeData = [
        { id: 1, name: 'DIT-63', owner: 'Owner 1', member: '24' },
    ];

    const groupedData = Array.from({ length: Math.ceil(fakeData.length / 4) }, (_, index) => fakeData.slice(index * 4, (index + 1) * 4));

    useEffect(() => {
        getUsersFromFirebase().then((usersData) => {
            console.log('Users data from Firebase:', usersData);

            if (Array.isArray(usersData) || typeof usersData === 'object') {
                const dataArray = Array.isArray(usersData) ? usersData : Object.values(usersData);

                const teacherOptions = dataArray
                    .filter((user) => user.role === 'Teacher')
                    .map((user) => ({
                        label: `${user.firstname} ${user.lastname}`,
                        value: `${user.firstname} ${user.lastname}`,
                    }));

                setUserData(dataArray);
                setUserOptions(teacherOptions);
            } else {
                console.error('Invalid data format from Firebase:', usersData);
            }
        });
    }, []);

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} />
            <Container component="main" maxWidth="xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='box1' style={{ marginTop: '2%', width: '70vw', height: '83vh', backgroundColor: 'white', borderRadius: '20px' }}>
                    <div className='header' style={{ padding: '4%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', width: '50%' }}>
                            <PeopleAltOutlinedIcon style={{ marginRight: '3%', fontSize: '45px' }} />
                            <Typography style={{ fontSize: '30px', fontWeight: 'bold', }}>Group Management</Typography>
                        </div>

                        <Button
                            variant="contained"
                            size="small"
                            style={{ width: '20%' }}
                            sx={{
                                width: '20%',
                                backgroundColor: '#68c957',
                                '&:hover': {
                                    backgroundColor: '#4f964c',
                                },
                            }}
                            startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} />}
                            onClick={handleCreateGroupClick}
                        >
                            Create new group
                        </Button>
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
                                sx={{ width: 300 }}
                                id="owner"
                                options={userOptions}
                                fullWidth
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} />}
                                value={owner}
                                onChange={(e, newValue) => setOwner(newValue || null)}
                                PaperComponent={({ children }) => (
                                    <Paper elevation={3}>
                                        {children}
                                    </Paper>
                                )}
                            />
                        </div>
                        <div style={{ textAlign: 'left', marginLeft: '2%   ' }}>
                            <Typography>Total Group 12</Typography>
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


            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '25vw', height: '15vh' }}>
                        <div style={{ width: '50%', marginRight: '5%' }}>
                            <Typography>Group Name</Typography>
                            <TextField id="group-name" fullWidth />
                        </div>
                        <div style={{ width: '50%' }}>
                            <Typography>Owner</Typography>
                            <Autocomplete
                                disablePortal
                                id="owner"
                                options={userOptions}
                                fullWidth
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} />}
                                value={owner}
                                onChange={(e, newValue) => setOwner(newValue || null)}
                                PaperComponent={({ children }) => (
                                    <Paper elevation={3}>
                                        {children}
                                    </Paper>
                                )}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleCloseDialog}>
                        Create Group
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                    Group created successfully!
                </MuiAlert>
            </Snackbar>

        </div>
    );
}

export default Group;
