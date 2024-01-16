import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box, DialogTitle, Typography, TextField } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Button from '@mui/material/Button';
import createCoursePicture from '../gif/setting.gif'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import '../style/course.css';

function Courstsetting() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const { courseId } = useParams();
    const [loading, setLoading] = useState(true);

    const [courseData, setCourseData] = useState({
        courseName: '',
        courseType: '',
        startDate: '',
        endDate: '',
        selectedWeeks: [],
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUpdate = () => {
        const courseList = JSON.parse(localStorage.getItem('CourseList')) || {};
        courseList[courseId] = courseData;
        localStorage.setItem('CourseList', JSON.stringify(courseList));
    };

    useEffect(() => {
        const fetchData = async () => {
            const courseList = JSON.parse(localStorage.getItem('CourseList')) || {};
            console.log('CourseList from localStorage:', courseList);

            const courseIdNumber = parseInt(courseId, 10);
            const courseData = courseList[courseIdNumber] || { courseName: '', courseType: '', startDate: '', endDate: '', selectedWeeks: [] };
            console.log(`CourseData for courseId ${courseId}:`, courseData);

            setCourseData(courseData);
            setStartDate(courseData.startDate || '');
            setEndDate(courseData.endDate || '');
            setSelectedWeeks(courseData.selectedWeeks || []);
            setLoading(false);
        };

        fetchData();
    }, [courseId]);
    
    


    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column', }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
                    {/* First Box */}
                    <div>
                        <Box
                            sx={{
                                marginTop: 5,
                                padding: "20px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: "15px",
                                position: 'relative',                
                            }}
                        >
                            <h3>Setting Course : {courseId}</h3>
                            <div
                                style={{
                                    backgroundImage: `url(${createCoursePicture})`,
                                    backgroundSize: 'cover',
                                    width: '20vw',
                                    height: '40vh',
                                }}
                            ></div>
                            <div>
                                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, marginRight: '16px' }}>
                                        <Typography style={{ marginBottom: '-5%' }}>
                                            Course Name
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            sx={{ width: '100%' }}
                                            value={courseData.courseName}
                                            onChange={(e) => setCourseData({ ...courseData, courseName: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Typography style={{ marginBottom: '-5%' }}>
                                            Course Type
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            select
                                            SelectProps={{
                                                value: courseData.courseType,
                                                onChange: (e) => setCourseData({ ...courseData, courseType: e.target.value }),
                                            }}
                                            sx={{ width: '100%' }}
                                        >
                                            {['Practice', 'Relaxing', 'Test', 'Final'].map((week) => (
                                                <MenuItem key={week} value={week}>
                                                    {week}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, marginRight: '16px' }}>
                                        <Typography style={{ marginBottom: '-5%' }}>
                                            Start Date
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            type='date'
                                            value={startDate}
                                            sx={{ width: '100%' }}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Typography style={{ marginBottom: '-5%' }}>
                                            End Date
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            type='date'
                                            value={endDate}
                                            sx={{ width: '100%' }}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '3%' }}>
                                    <Typography variant="body1" gutterBottom>
                                        Selected Weeks : {selectedWeeks.join(', ')}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        row
                                        aria-label="week"
                                        name="week"
                                        value={selectedWeeks.join('')}
                                        onChange={(e) => setSelectedWeeks(e.target.value.split('').map(Number))}
                                    >
                                        {[1, 2, 3, 4].map((week) => (
                                            <FormControlLabel
                                                key={week}
                                                value={week.toString()}
                                                control={<Radio sx={{ color: '#4b76db' }} />}
                                                label={week.toString()}
                                            />
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" onClick={handleUpdate}>
                                    Update
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Courstsetting;
