import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import { Box, Avatar, DialogTitle, Dialog, Typography, TextField, DialogContent } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import createCoursePicture from '../gif/createcourse.gif'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import '../style/course.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import QuizIcon from '@mui/icons-material/Quiz';

function Course() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [openCreateDialog, setCreateDialog] = useState(false);
    const handleClose = () => setOpenDialog(false);
    const handleCloseCreate = () => setCreateDialog(false);
    const [testHistory, setTestHistory] = useState([]);
    const [courseScores, setCourseScores] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedListItem, setSelectedListItem] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [animationBox1, setAnimationBox1] = useState(false);
    const [animationBox2, setAnimationBox2] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [CourseName, setCourseName] = useState('');
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [countdown] = useState(0.2);
    const [round, setRound] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const isStudent = user && user.roll === 'Student';

    const typeIcons = {
        'Practice': <MenuBookIcon style={{ color: '#75b023', width: '25px', height: 'auto' }} />,
        'Relaxing': <AddHomeIcon style={{ color: '#25c0db', width: '25px', height: 'auto' }} />,
        'Test': <BookmarkAddedIcon style={{ color: '#ebbd17', width: '25px', height: 'auto' }} />,
        'Final': <QuizIcon style={{ color: '#eb7e17', width: '25px', height: 'auto' }} />,
      };

    const handleCreateCourse = () => {
        console.log("CourseName:", CourseName);
        console.log("selectedWeeks:", selectedWeeks);
        console.log("selectedType:", selectedType);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);

        if (!CourseName || selectedWeeks.length === 0 || !selectedType || !startDate || !endDate) {
            setSnackbarMessage('Please fill in all required fields.');
            setSnackbarOpen(true);
            return;
        }

        const storedCourseList = JSON.parse(localStorage.getItem('CourseList')) || [];
        const maxId = storedCourseList.reduce((max, course) => (course.id > max ? course.id : max), 0);
        const weeksArray = Array.from({ length: Math.max(...selectedWeeks) }, (_, i) => i + 1);

        const newCourse = {
            id: maxId + 1,
            name: CourseName,
            type: selectedType,
            startDate,
            endDate,
            weeks: weeksArray,
        };

        const updatedCourseList = [...storedCourseList, newCourse];
        localStorage.setItem('CourseList', JSON.stringify(updatedCourseList));

        setCourseName('');
        setSelectedWeeks([]);
        setSelectedType('');
        setStartDate('');
        setEndDate('');
        handleCloseCreate();
        window.location.reload();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const storedCourseList = JSON.parse(localStorage.getItem('CourseList')) || [];
        setCourseData(storedCourseList);

        console.log('Updated Course Data:', storedCourseList);
    }, []);


    const getCourseDataById = (courseId) => {
        return courseData.find((course) => course.id === courseId);
    };

    useEffect(() => {
        const storedCourseList = JSON.parse(localStorage.getItem('CourseList')) || [];
        setCourseData(storedCourseList);
    }, []);

    useEffect(() => {
        setAnimationBox1(true);
        setAnimationBox2(true);
    }, []);

    useEffect(() => {
        const fetchedScores = [];
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            const { id: userId } = storedUser;

            courseData.forEach((course) => {
                const storedScore = localStorage.getItem(`game${course.id}Score_${userId}`);
                const score = storedScore ? parseInt(storedScore, 10) : 0;
                fetchedScores.push({ id: course.id, score, name: course.name });
            });

            setCourseScores(fetchedScores);

            if (!selectedCourse) {
                const defaultCourse = courseData.find((course) => course.name === 'English Verb 1');
                setSelectedCourse(defaultCourse);
            }

            const storedTestHistory = localStorage.getItem(`testHistory_${userId}`);
            if (storedTestHistory) {
                setTestHistory(JSON.parse(storedTestHistory));
            }
        }
    }, [user, navigate, selectedCourse, setTestHistory, courseData]);

    const handleTestButtonClick = (selectedCourse, week) => {
        const storedRound = parseInt(localStorage.getItem(`round_course${selectedCourse.id}_${user.id}`), 10) || 0;

        if (selectedCourse && storedRound === 5) {
            setSnackbarMessage('Your Test Is Limited!');
            setSnackbarOpen(true);
        } else {
            navigate(`/home/course/games/${selectedCourse.id}/week/${week}`);
        }
    };

    useEffect(() => {
        const initialCourse = courseData.length > 0 ? courseData.reduce((minCourse, currentCourse) => (
            currentCourse.id < minCourse.id ? currentCourse : minCourse
        ), courseData[0]) : null;
        if (initialCourse) {
            setSelectedCourse({ ...initialCourse, weeks: initialCourse.weeks });
            setSelectedListItem(initialCourse.id);
            setRound(parseInt(localStorage.getItem(`round_course${initialCourse.id}_${user.id}`), 10) || 0);
            setAnimationBox2(false);
            setTimeout(() => {
                setAnimationBox2(true);
            }, countdown * 1000);
            const storedWeeks = localStorage.getItem(`courseWeeks_${initialCourse.id}`);
            const weeks = storedWeeks ? JSON.parse(storedWeeks) : [];
            setSelectedWeeks(weeks);
        }
    }, [courseData, user]);


    const CourseListItem = ({ course }) => {
        console.log('Course Object:', course);

        const [menuAnchorEl, setMenuAnchorEl] = useState(null);

        const handleMenuClose = () => {
            setMenuAnchorEl(null);
        };

        const handleMenuClick = (event) => {
            setMenuAnchorEl(event.currentTarget);
        };

        const handleSettingClick = (courseId) => {
            navigate(`/home/course/setting/${courseId}`);
            handleMenuClose();
        };

        const handleDeleteClick = (courseId) => {
            const storedCourseList = JSON.parse(localStorage.getItem('CourseList')) || [];
            const updatedCourseList = storedCourseList.filter((course) => course.id !== courseId);
            localStorage.setItem('CourseList', JSON.stringify(updatedCourseList));
            setCourseData(updatedCourseList);
            handleMenuClose();
            window.location.reload();
        };


        useEffect(() => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                const userId = storedUser.id;
                const storedRound = parseInt(localStorage.getItem(`round_course${course.id}_${userId}`), 10) || 0;
                setRound(storedRound);
            }
        }, [course]);

        const handleCourseClick = (course) => {
            const selectedCourseData = courseData.find((courseData) => courseData.id === course.id);
            setSelectedCourse({ ...selectedCourseData, weeks: selectedCourseData.weeks });
            setSelectedListItem(course.id);
            setRound(parseInt(localStorage.getItem(`round_course${course.id}_${user.id}`), 10) || 0);
            setAnimationBox2(false);
            setTimeout(() => {
                setAnimationBox2(true);
            }, countdown * 1000);
            const storedWeeks = localStorage.getItem(`courseWeeks_${course.id}`);
            const weeks = storedWeeks ? JSON.parse(storedWeeks) : [];
            setSelectedWeeks(weeks);
        };
        return (
            <div style={{ minWidth: '250px', marginBottom: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItem key={course.id} button onClick={() => handleCourseClick(course)} selected={selectedListItem === course.id} style={{ borderRadius: '20px', marginBottom: '3%', flex: '1' }}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LibraryBooksIcon style={{ color: '#4b76db' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={course.name}
                    />
                </ListItem>
                {isStudent ? null : (
                    <div>
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleSettingClick(course.id)}>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteClick(course.id)}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        );
    };


    function TestHistoryTable({ testHistory }) {
        return (
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Course</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {testHistory.map((test, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{test.course}</td>
                            <td>{test.score}</td>
                            <td>{test.date}</td>
                            <td>{test.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column', }}>
            <AppBarToolbar user={user} onLogout={handleLogout} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                                transition: 'transform 0.6s ease-in-out',
                                transform: animationBox1 ? 'translateY(0%)' : 'translateY(50%)',
                            }}
                        >
                            <h4 style={{}}>Course</h4>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: "15px" }}>
                                {courseScores.map((course) => (
                                    <CourseListItem key={course.id} course={course} />
                                ))}
                            </List>
                            {isStudent ? null : (
                                <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#4b76db',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            minWidth: 'auto',
                                        }}
                                        onClick={() => setCreateDialog(true)}
                                    >
                                        <AddIcon style={{ color: 'white' }} />
                                    </Button>
                                </div>
                            )}
                        </Box>
                    </div>

                    {/* Second Box */}
                    {selectedCourse && (
                        <div style={{ marginTop: '2.2%' }}>
                            {selectedCourse && selectedCourse.weeks && selectedCourse.weeks.map((week, index) => (
                                <div key={index} style={{ marginLeft: '1%', minWidth: '50vw' }}>
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            padding: "30px",
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            bgcolor: 'background.paper',
                                            borderRadius: "15px",
                                            transition: 'transform 0.6s ease-in-out',
                                            transform: animationBox2 ? 'translateY(0%)' : 'translateY(50%)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <div>
                                                    <Avatar style={{ backgroundColor: 'transparent', width: '4rem', height: '4rem' }}>
                                                        <LibraryBooksIcon style={{ color: '#4b76db', width: '3rem', height: '3rem' }} />
                                                    </Avatar>
                                                </div>
                                                <div style={{ marginLeft: '1rem', flex: 1 }}>
                                                    <h3>{selectedCourse.name} Week : {week}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {typeIcons[selectedCourse.type] || <RestartAltIcon style={{ marginRight: '5px' }} />}
                                                        <p style={{ margin: '5px', color: 'black', fontSize: '16px' }}>
                                                            {selectedCourse.type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{}}>
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<HistoryIcon />}
                                                        style={{ backgroundColor: '#4b76db' }}
                                                        onClick={() => setOpenDialog(true)}
                                                    >
                                                        History
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<SendIcon />}
                                                        style={{ backgroundColor: '#4b76db', marginLeft: '15px' }}
                                                        onClick={() => handleTestButtonClick(selectedCourse, week)}
                                                    >
                                                        Test
                                                    </Button>
                                                </div>
                                            </div>
                                            {courseScores.map((course) => {
                                                const courseDataById = getCourseDataById(course.id);
                                                if (courseDataById && courseDataById.id === selectedCourse.id) {
                                                    const progress = (course.score / 20) * 100;
                                                    const progressBarColor = progress < 100 ? '#e3d10e' : '#4caf50';

                                                    return (
                                                        <div key={course.id} style={{ marginTop: '10px', width: '100%' }}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={progress}
                                                                sx={{
                                                                    height: 5,
                                                                    borderRadius: 5,
                                                                    marginBottom: '10px',
                                                                    backgroundColor: '#d3d3d3',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: progressBarColor,
                                                                    },
                                                                }}
                                                            />
                                                            <Typography variant="caption" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>

            <Dialog
                open={openDialog}
                onClose={() => handleClose(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '15px',
                }}
            >
                <div>
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '-20px' }}>
                            <p>Course : {selectedCourse?.name}</p>
                        </div>
                        <div style={{ border: '1px solid black', padding: '10px', minWidth: '500px', minHeight: '200px' }}>
                            <TestHistoryTable testHistory={testHistory.filter(test => test.course === selectedCourse?.name)} />
                        </div>
                    </DialogTitle>
                </div>
            </Dialog>

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
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        <Typography>Create New Course</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <div
                                style={{
                                    backgroundImage: `url(${createCoursePicture})`,
                                    backgroundSize: 'cover',
                                    width: '28vw',
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
                                            onChange={(e) => setCourseName(e.target.value)}
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
                                                value: selectedType,
                                                onChange: (e) => setSelectedType(e.target.value),
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
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateCourse}
                            >
                                Create
                            </Button>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}

export default Course;
