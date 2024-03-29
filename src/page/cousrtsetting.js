import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography, TextField } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import createCoursePicture from '../gif/setting.gif'
import Radio from '@mui/material/Radio';

function Courstsetting() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState({
        courseName: '',
        courseType: '',
        startDate: '',
        endDate: '',
        selectedWeeks: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const courseList = JSON.parse(localStorage.getItem('CourseList')) || [];

            let matchingCourse;

            if (courseId !== undefined && courseId !== null && !isNaN(courseId)) {
                const courseIdNumber = parseInt(courseId, 10);
                matchingCourse = courseList.find((course) => course.id === courseIdNumber);

                if (matchingCourse) {
                    console.log(`CourseData for courseId ${courseId}:`, matchingCourse);
                } else {
                    console.error(`No course found with id ${courseId}`);
                }
            } else {
                console.error('Invalid courseId:', courseId);
            }

            setCourseData({
                courseName: matchingCourse?.name || '',
                courseType: matchingCourse?.type || '',
                startDate: matchingCourse?.startDate || '',
                endDate: matchingCourse?.endDate || '',
                selectedWeeks: matchingCourse?.weeks || [],
            });
        };

        fetchData();
    }, [courseId]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUpdate = () => {
        if (!courseData.courseName || !courseData.courseType || !courseData.startDate || !courseData.endDate) {
            console.error('Please fill in all the required fields.');
            return;
        }
    
        const courseIdNumber = parseInt(courseId, 10);
        let courseList = JSON.parse(localStorage.getItem('CourseList')) || [];
        const courseIndex = courseList.findIndex((course) => course.id === courseIdNumber);
        const weeksArray = Array.from({ length: Math.max(...courseData.selectedWeeks) }, (_, i) => i + 1);
    
        if (courseIndex !== -1) {
            const updatedCourse = {
                id: courseIdNumber,
                name: courseData.courseName,
                type: courseData.courseType,
                startDate: courseData.startDate,
                endDate: courseData.endDate,
                weeks: weeksArray,
            };
    
            courseList[courseIndex] = updatedCourse;
    
            localStorage.setItem('CourseList', JSON.stringify(courseList));
    
            navigate('/home/course');
        } else {
            console.error(`No course found with id ${courseId}`);
        }
    };
    

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column' }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
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
                                justifyContent: 'center',
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
                                            value={courseData.courseType}
                                            onChange={(e) => setCourseData({ ...courseData, courseType: e.target.value })}
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
                                            value={courseData.startDate}
                                            sx={{ width: '100%' }}
                                            onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })}
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
                                            value={courseData.endDate}
                                            sx={{ width: '100%' }}
                                            onChange={(e) => setCourseData({ ...courseData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '3%' }}>
                                    <Typography variant="body1" gutterBottom>
                                        Selected Weeks : {courseData.selectedWeeks.join(', ')}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        row
                                        aria-label="week"
                                        name="week"
                                        value={courseData.selectedWeeks.join('')}
                                        onChange={(e) => setCourseData({ ...courseData, selectedWeeks: e.target.value.split('').map(Number) })}
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
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3%' }}>
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
