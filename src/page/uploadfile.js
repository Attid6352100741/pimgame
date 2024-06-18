import React, { useState } from 'react';
import { Typography, Container, Snackbar, Alert, Tooltip, Table } from '@mui/material';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IconButton, Button, Dialog, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useUser } from '../components/UserContext';
import AppBarToolbar from '../components/AppBarToolbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';

function Uploadfile() {
    const [editedData, setEditedData] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { user, logout } = useUser();
    const [editableRowId, setEditableRowId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const [data, setData] = useState([
        { id: 1, name: 'File Name 1', detail: 'File Detail 1', type: 'File Size 1', uploadBy: 'Uploaded User 1', lastEdit: 'Last Edited Time 1' },
        { id: 2, name: 'File Name 2', detail: 'File Detail 2', type: 'File Size 2', uploadBy: 'Uploaded User 2', lastEdit: 'Last Edited Time 2' },
    ]);

    const handleLogout = () => {
        logout();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleEditChange = (field, value) => {
        setEditedData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleEdit = (rowId) => {
        setEditableRowId(rowId);
        const rowToEdit = data.find((item) => item.id === rowId);
        setEditedData(rowToEdit);
    };

    const handleSave = () => {
        const newData = data.map((item) =>
            item.id === editableRowId ? { ...item, ...editedData } : item
        );
        setData(newData);
        setEditableRowId(null);
    };

    const handleCancel = () => {
        setEditableRowId(null);
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (fileExtension !== 'xls' && fileExtension !== 'xlsx') {
                setSnackbarMessage('Only Excel (.xls, .xlsx) files are allowed.');
                setSnackbarOpen(true);
                event.target.value = null;
            } else {
                // ใช้ FileReader เพื่ออ่านไฟล์ Excel
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // ในที่นี้เราสมมติว่าไฟล์ Excel มี sheet เดียว
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    
                    // แปลงข้อมูลใน sheet เป็น JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    // แสดงค่า JSON ทั้งหมดใน console log
                    console.log('Excel Data:', jsonData);
                };

                // อ่านไฟล์ Excel
                reader.readAsArrayBuffer(selectedFile);
            }
        }
    };

    const handleOpenDeleteDialog = (rowId) => {
        const fileToDelete = data.find((item) => item.id === rowId);
        setDeleteItemId(rowId);
        setDeleteDialogOpen(true);
        setSnackbarMessage(`Confirm to delete: ${fileToDelete.name}`);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteItemId(null);
        setDeleteDialogOpen(false);
    };

    const handleDelete = () => {
        const newData = data.filter((item) => item.id !== deleteItemId);
        setData(newData);
        handleCloseDeleteDialog();
    };

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='header' style={{ backgroundColor: 'white', width: '60vw', height: '20vh', borderRadius: '10px', marginTop: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ marginLeft: '3%', width: '30%' }}>
                        <Typography variant="h3" style={{ fontWeight: 'bold', fontSize: '24px' }}>
                            Upload File Excel
                        </Typography>
                        <Typography variant="caption" style={{ fontWeight: 'lighter', fontSize: '15px' }}>
                            Total File upload {data.length} File
                        </Typography>
                    </div>
                    <div className='uploadfile' style={{ width: '100%', height: '100%', backgroundColor: '#f2f2f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                        <label htmlFor="fileInput" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <CloudUploadIcon fontSize="large" style={{}} />
                                <Typography variant="caption" style={{ marginTop: '5px' }}>Upload File</Typography>
                                <Typography variant="caption" style={{ marginTop: '5px', color: 'red' }}>Only excel or xls files can be uploaded.</Typography>
                            </div>
                            <input type="file" id="fileInput" accept=".xls, .xlsx" style={{ display: 'none' }} onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <div className='table' style={{ backgroundColor: 'gray', width: '70vw', height: '100%', marginTop: '10%' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '20%' }}>Name</TableCell>
                                    <TableCell style={{ width: '20%' }}>Detail</TableCell>
                                    <TableCell style={{ width: '20%' }}>Type</TableCell>
                                    <TableCell style={{ width: '20%' }}>Upload By</TableCell>
                                    <TableCell style={{ width: '20%' }}>Last Edit</TableCell>
                                    <TableCell style={{ width: '10%' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <TextField
                                                    type="text"
                                                    value={editedData.name}
                                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                row.name
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <TextField
                                                    type="text"
                                                    value={editedData.detail}
                                                    onChange={(e) => handleEditChange('detail', e.target.value)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                row.detail
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <TextField
                                                    type="text"
                                                    value={editedData.type}
                                                    onChange={(e) => handleEditChange('type', e.target.value)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                row.type
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <TextField
                                                    type="text"
                                                    value={editedData.uploadBy}
                                                    disabled
                                                    onChange={(e) => handleEditChange('uploadBy', e.target.value)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                row.uploadBy
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <TextField
                                                    type="text"
                                                    value={editedData.lastEdit}
                                                    disabled
                                                    onChange={(e) => handleEditChange('lastEdit', e.target.value)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                row.lastEdit
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRowId === row.id ? (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <Tooltip title="Save">
                                                        <IconButton onClick={handleSave}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Cancel">
                                                        <IconButton onClick={handleCancel}>
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => handleOpenDeleteDialog(row.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEdit(row.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleSnackbarClose}
            >
                <Alert severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: 'auto',
                        maxHeight: '30%',
                        padding: '1%'
                    }
                }}
            >
                <div>
                    <h1 variant="h6">{`Confirm Delete`}</h1>
                </div>
                <div>
                    <Typography>{`Are you sure for delete ${editedData.name} ?`}</Typography>
                </div>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Uploadfile;
