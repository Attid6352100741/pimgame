import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, DialogTitle, Dialog, Typography, TextField, DialogContent, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Snackbar, SnackbarContent } from '@mui/material';
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import QRCode from 'qrcode.react';
import groupPicture from '../img/group.png';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotesIcon from '@mui/icons-material/Notes';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

function QrCodeDisplay({ ssid }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <QRCode value={ssid} />
        </div>
    );
}

function Group() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [openCreateDialog, setCreateDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredGroups = JSON.parse(localStorage.getItem('GroupList') || '[]').filter((group) => {
        const groupNameLowerCase = group.groupName.toLowerCase();
        const searchInputLowerCase = searchInput.toLowerCase();
        return groupNameLowerCase.includes(searchInputLowerCase);
    });

    const [formData, setFormData] = useState({
        id: '',
        ssid: '',
        groupName: '',
        periodDay: '',
        description: '',
    });

    const handleCloseCreate = () => setCreateDialog(false);

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleCreateGroup = () => {
        const { groupName, periodDay, description } = formData;

        if (!groupName || !periodDay || !description) {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarOpen(true);
            return;
        }

        const existingGroups = JSON.parse(localStorage.getItem('GroupList')) || [];

        const newGroup = {
            id: existingGroups.length + 1,
            ssid: uuidv4(),
            groupName,
            periodDay,
            description,
        };

        const updatedGroups = [...existingGroups, newGroup];
        localStorage.setItem('GroupList', JSON.stringify(updatedGroups));

        setFormData({
            id: '',
            ssid: '',
            groupName: '',
            periodDay: '',
            description: '',
        });

        setCreateDialog(false);
    };

    const handleDeleteGroup = (groupId) => {
        const existingGroups = JSON.parse(localStorage.getItem('GroupList')) || [];

        const updatedGroups = existingGroups.filter((group) => group.id !== groupId);

        localStorage.setItem('GroupList', JSON.stringify(updatedGroups));
        setSnackbarMessage('Group deleted successfully.');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if (openCreateDialog) {
            setCreateDialog(true);
        }
    }, [openCreateDialog]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="responsive-container">
                    <Box
                        sx={{
                            marginTop: 5,
                            padding: "50px",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            bgcolor: 'background.paper',
                            borderRadius: "15px",
                            width: '50vw',
                            transition: 'transform 1s ease-in-out',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <h2 style={{ margin: 0, padding: 0, fontSize: '1.5rem', flex: '1' }}>Group Management</h2>
                            <Tooltip title="New Group">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#7bd959',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        minWidth: 'auto',
                                        marginLeft: '10px',
                                        '&:hover': {
                                            backgroundColor: '#60ad44',
                                        },
                                    }}
                                    onClick={() => setCreateDialog(true)}
                                >
                                    <AddIcon style={{ color: 'white' }} />
                                </Button>
                            </Tooltip>
                        </div>
                        <div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    value={searchInput}
                                    onChange={handleSearchInputChange}
                                />
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <List style={{ width: '100%' }}>
                                {filteredGroups.length === 0 ? (
                                    <ListItem>
                                        <ListItemText primary="No data" />
                                    </ListItem>
                                ) : filteredGroups.map((group) => (
                                    <ListItem key={group.id} button style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <ListItemText
                                                primary={group.groupName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            Period Day: {group.periodDay}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            Description: {group.description}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography>
                                                Invite QRCode
                                                <QrCodeDisplay ssid={group.ssid} />
                                            </Typography>
                                        </div>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteGroup(group.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <br></br>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteGroup(group.id)}>
                                                <SettingsIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Box>
                </div>
            </Container>




            <Dialog
                open={openCreateDialog}
                onClose={handleCloseCreate}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '15px',
                }}
            >
                <div>
                    <DialogTitle sx={{ textAlign: 'start' }}>
                        <h4>Create New Group</h4>
                    </DialogTitle>
                    <DialogContent>
                        <div style={{
                            backgroundImage: `url(${groupPicture})`,
                            backgroundSize: 'contain',
                            width: '23vw',
                            height: '32vh',
                            marginBottom: '5%'
                        }}>
                        </div>
                        <div style={{ display: 'flex', flex: 1 }}>
                            <div style={{ flex: 1, marginRight: '2%' }}>
                                <Tooltip title="Text and Number">
                                    <div>
                                        <Typography style={{ marginBottom: '-5%' }}>
                                            Group Name
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => handleInputChange('groupName', e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <AssignmentIcon style={{ color: 'grey', marginRight: '5%' }} />
                                                ),
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                <Tooltip title="Number Only">
                                    <div style={{ display: 'flex', flex: 1 }}>
                                        <Tooltip title="Number Only">
                                            <div>
                                                <Typography style={{ marginBottom: '-5%' }}>
                                                    Period Day
                                                </Typography>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        type="number"
                                                        onChange={(e) => handleInputChange('periodDay', e.target.value)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <EditCalendarIcon style={{ color: 'grey', marginRight: '5%' }} />
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flex: 1 }}>
                            <div style={{ flex: 1 }}>
                                <Tooltip title="Text and Number">
                                    <div>
                                        <Typography style={{ marginBottom: '-3%' }}>
                                            Description
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <NotesIcon style={{ color: 'grey', marginRight: '5%' }} />
                                                ),
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateGroup}
                            >
                                Create
                            </Button>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: '#e39032',
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>

        </div>
    );
}

export default Group;
