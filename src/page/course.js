import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, Avatar, DialogTitle, Dialog } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBarToolbar from '../components/AppBarToolbar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../style/course.css';

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
    const [animation, setAnimation] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        setAnimation(true);
    }, []);

    useEffect(() => {
        const fetchedScores = [];

        const courseData = [
            { id: 1, name: 'English Verb 1' },
            { id: 2, name: 'English Verb 2' },
            { id: 3, name: 'English Verb 3' },
            { id: 4, name: 'English Verb 4' },
        ];
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
    }, [user, navigate, selectedCourse, setTestHistory]);

    const handleTestButtonClick = () => {
        const storedRound = parseInt(localStorage.getItem(`round_course${selectedCourse.id}_${user.id}`), 10) || 0;

        if (selectedCourse && storedRound === 5) {
            setSnackbarMessage('Your Test Is Limited!');
            setSnackbarOpen(true);
        } else {
            navigate(`games/${selectedCourse.id}`);
        }
    };

    const CourseListItem = ({ course }) => {
        const [round, setRound] = useState(0);

        useEffect(() => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                const userId = storedUser.id;
                const storedRound = parseInt(localStorage.getItem(`round_course${course.id}_${userId}`), 10) || 0;
                setRound(storedRound);
            }
        }, [course]);

        const handleCourseClick = () => {
            setSelectedCourse(course);
            setSelectedListItem(course.id);
            setRound(parseInt(localStorage.getItem(`round_course${course.id}_${user.id}`), 10) || 0);
        };


        return (
            <div style={{ minWidth: '200px' }}>
                <ListItem key={course.id} button onClick={handleCourseClick} selected={selectedListItem === course.id} style={{ borderRadius: '20px', marginBottom: '3%' }}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LibraryBooksIcon style={{ color: '#4b76db', fontSize: '19px' }} />
                            <p style={{ margin: '5px', color: 'black', fontSize: '14px' }}>
                                {round}/5
                            </p>
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
        <div style={{ minHeight: '100vh', backgroundColor: '#b9dff4', display: 'flex', flexDirection: 'column' , }}>
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
                                transform: animation ? 'translateY(0%)' : 'translateY(50%)',
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

                    {/* Second Box */}
                    <div style={{ marginLeft: '1%', minWidth: '50vw' }}>
                        <Box
                            sx={{
                                marginTop: 5,
                                padding: "50px",
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: "15px",
                                transition: 'transform 0.6s ease-in-out',
                                transform: animation ? 'translateY(0%)' : 'translateY(50%)',
                            }}
                        >
                            {selectedCourse && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <div>
                                            <Avatar style={{ backgroundColor: 'transparent', width: '4rem', height: '4rem' }}>
                                                <LibraryBooksIcon style={{ color: '#4b76db', width: '3rem', height: '3rem' }} />
                                            </Avatar>
                                        </div>
                                        <div style={{ marginLeft: '1rem', flex: 1 }}>
                                            <h3>{selectedCourse.name}</h3>
                                            {courseScores.map((course) => {
                                                if (course.id === selectedCourse.id) {
                                                    return (
                                                        <p key={course.id}>
                                                            Score: {course.score}/20 {course.score >= 10 ? '✔️' : '❌'}
                                                        </p>
                                                    );
                                                }
                                                return null;
                                            })}
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
                                                onClick={handleTestButtonClick}
                                            >
                                                Test
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            )}
                        </Box>
                    </div>
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
