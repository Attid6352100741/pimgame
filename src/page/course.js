import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, Avatar, DialogTitle, Dialog, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import '../style/course.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function Course() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => setOpenDialog(false);
    const [testHistory, setTestHistory] = useState([]);
    const [courseScores, setCourseScores] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedListItem, setSelectedListItem] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [animationBox1, setAnimationBox1] = useState(false);
    const [animationBox2, setAnimationBox2] = useState(false);
    const [countdown] = useState(0.2);
    const [round, setRound] = useState(0);

    const [courseData] = useState([
        { id: 1, name: 'English Verb 1', weeks: ['1', '2', '3', '4'] },
        { id: 2, name: 'English Verb 2', weeks: ['1', '2', '3'] },
        { id: 3, name: 'English Verb 3', weeks: ['1', '2', '3', '4'] },
        { id: 4, name: 'English Verb 4', weeks: ['1', '2'] },
    ]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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


    const CourseListItem = ({ course }) => {

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
        };

        return (
            <div style={{ minWidth: '200px' }}>
                <ListItem key={course.id} button onClick={() => handleCourseClick(course)} selected={selectedListItem === course.id} style={{ borderRadius: '20px', marginBottom: '3%' }}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LibraryBooksIcon style={{ color: '#4b76db' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={course.name}
                        secondary={<span style={{ color: course.score >= 10 ? '#28b02b' : 'red' }}>Score: {course.score}/20</span>}
                    />
                </ListItem>
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
                        </Box>
                    </div>

                    {selectedCourse && (
                        <div style={{ marginTop: '2.2%' }}>
                            {selectedCourse && selectedCourse.weeks && selectedCourse.weeks.map((week, index) => (
                                <div key={index} style={{ marginLeft: '1%', minWidth: '50vw' }}>
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            padding: "40px",
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
                                                    <h3>Practice {selectedCourse.id} Week {week}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <RestartAltIcon style={{ marginRight: '5px' }} />
                                                        <p style={{ margin: '5px', color: 'black', fontSize: '16px'}}>
                                                            {round}/5
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
                                                if (course.id === selectedCourse.id) {
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
                                                                    backgroundColor: '#d3d3d3', // เปลี่ยนสีพื้นหลังของ progress bar
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: progressBarColor, // เปลี่ยนสีของ progress bar
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
                            <p>History English Verb {selectedCourse ? selectedCourse.id : ''}</p>
                        </div>
                        <div style={{ border: '1px solid black', padding: '10px', minWidth: '500px', minHeight: '200px' }}>
                            <TestHistoryTable testHistory={testHistory.filter(test => test.course === selectedCourse?.name)} />
                        </div>
                    </DialogTitle>
                </div>
            </Dialog>
        </div>
    );
}

export default Course;
