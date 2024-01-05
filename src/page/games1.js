import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Box, Button } from "@mui/material";
import Container from '@mui/material/Container';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBarToolbar from '../components/AppBarToolbar';


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function Games1() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const choices1 = useMemo(() => ["on", "like", "his", "dog's"], []);
    const choices2 = useMemo(() => ["be", "her", "am", "tail"], []);
    const choices3 = useMemo(() => ["do", "job", "time", "is"], []);
    const choices4 = useMemo(() => ["black", "work", "but", "im"], []);
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [testHistory, setTestHistory] = useState([]);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [counting, setCounting] = useState(false);
    const [round, setRound] = useState(0);

    const [shuffledChoices1, setShuffledChoices1] = useState(shuffleArray(choices1));
    const [shuffledChoices2, setShuffledChoices2] = useState(shuffleArray(choices2));
    const [shuffledChoices3, setShuffledChoices3] = useState(shuffleArray(choices3));
    const [shuffledChoices4, setShuffledChoices4] = useState(shuffleArray(choices4));
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleChange = (choices, setChoice, setShuffledChoices) => (event) => {
        const selectedChoice = event.target.value;
        setShuffledChoices(shuffleArray([...choices]));
        setChoice((prevChoice) => {
            localStorage.setItem(`game1Choice1_${user.id}`, prevChoice === choice1 ? selectedChoice : choice1 || '');
            localStorage.setItem(`game1Choice2_${user.id}`, prevChoice === choice2 ? selectedChoice : choice2 || '');
            localStorage.setItem(`game1Choice3_${user.id}`, prevChoice === choice3 ? selectedChoice : choice3 || '');
            localStorage.setItem(`game1Choice4_${user.id}`, prevChoice === choice4 ? selectedChoice : choice4 || '');
            return selectedChoice;
        });
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
    
        if (storedUser) {
            const userId = storedUser.id;
    
            const storedScore = localStorage.getItem(`game1Score_${userId}`);
            const storedTestHistory = localStorage.getItem(`testHistory_${userId}`);
            const storedRound = localStorage.getItem(`round_course1_${userId}`);
    
            if (storedScore) {
                setScore(parseInt(storedScore, 10));
            }
    
            if (storedTestHistory) {
                setTestHistory(JSON.parse(storedTestHistory));
            }
    
            if (storedRound) {
                setRound(parseInt(storedRound, 10));
            }

            const storedChoice1 = localStorage.getItem(`game1Choice1_${userId}`);
            const storedChoice2 = localStorage.getItem(`game1Choice2_${userId}`);
            const storedChoice3 = localStorage.getItem(`game1Choice3_${userId}`);
            const storedChoice4 = localStorage.getItem(`game1Choice4_${userId}`);

            if (storedChoice1) {
                setChoice1(storedChoice1);
            }

            if (storedChoice2) {
                setChoice2(storedChoice2);
            }

            if (storedChoice3) {
                setChoice3(storedChoice3);
            }

            if (storedChoice4) {
                setChoice4(storedChoice4);
            }

            setShuffledChoices1(shuffleArray(choices1));
            setShuffledChoices2(shuffleArray(choices2));
            setShuffledChoices3(shuffleArray(choices3));
            setShuffledChoices4(shuffleArray(choices4));
        }
    }, [choices1, choices2, choices3, choices4]);


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = (confirmed) => {
        setOpenDialog(false);

        if (confirmed) {
            setSubmitted(true);
            checkAnswers();
            ["game1Choice1", "game1Choice2", "game1Choice3", "game1Choice4"].forEach((choiceKey) => {
                localStorage.removeItem(`${choiceKey}_${user.id}`);
            });

            handleCountdown();
        }
    };



    const handleSubmit = () => {
        handleClickOpen();
    };

    const checkAnswers = () => {
        let newScore = 0;

        if (choice1 === "dog's") {
            newScore += 5;
        }

        if (choice2 === 'tail') {
            newScore += 5;
        }

        if (choice3 === 'is') {
            newScore += 5;
        }

        if (choice4 === 'black') {
            newScore += 5;
        }

        setScore(newScore);

        const currentDateTime = new Date();
        const currentDate = currentDateTime.toLocaleDateString('th-TH');
        const currentTime = currentDateTime.toLocaleTimeString('th-TH');
    
        const updatedTestHistory = [
            ...testHistory,
            {
                course: 'English Verb 1',
                score: newScore,
                date: currentDate,
                time: currentTime,
            },
        ];
    
        setTestHistory(updatedTestHistory);
    
        localStorage.removeItem(`game1Score_${user.id}`);
        localStorage.setItem(`game1Score_${user.id}`, newScore.toString());
        localStorage.setItem(`testHistory_${user.id}`, JSON.stringify(updatedTestHistory));
    
        if (round < 5) {
            setRound((prevRound) => prevRound + 1);
            localStorage.setItem(`round_course1_${user.id}`, (round + 1).toString());
        }
    };

    const handleCountdown = () => {
        setCounting(true);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval);
            setCounting(false);
            setCountdown(5);
            navigate('/course');
        }, countdown * 1000);
    };


    return (
        <div>
            <AppBarToolbar user={user} onLogout={handleLogout} testHistory={testHistory} />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 5,
                        padding: "50px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: "15px",
                    }}
                >
                    <h3 style={{ marginBottom: '10%' }}>English Word Game 1</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <InputLabel id="startText" sx={{ mb: 0 }}>Start Text</InputLabel>
                            <TextField
                                id="outlined-basic"
                                disabled
                                value="Her"
                                sx={{ minWidth: 100 }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Choice 1 */}
                            <InputLabel id="choice1" sx={{ mb: 0 }}>Choice 1</InputLabel>
                            <Select
                                sx={{ minWidth: 100 }}
                                labelId="choice1"
                                id="choice1"
                                value={choice1}
                                label="Choice 1"
                                onChange={handleChange(choices1, setChoice1, setShuffledChoices1)}
                            >
                                {shuffledChoices1.map((choice, index) => (
                                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Choice 2 */}
                            <InputLabel id="choice2" sx={{ mb: 0 }}>Choice 2</InputLabel>
                            <Select
                                sx={{ minWidth: 100 }}
                                labelId="choice2"
                                id="choice2"
                                value={choice2}
                                label="Choice 2"
                                onChange={handleChange(choices2, setChoice2, setShuffledChoices2)}
                            >
                                {shuffledChoices2.map((choice, index) => (
                                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Choice 3 */}
                            <InputLabel id="choice3" sx={{ mb: 0 }}>Choice 3</InputLabel>
                            <Select
                                sx={{ minWidth: 100 }}
                                labelId="choice3"
                                id="choice3"
                                value={choice3}
                                label="Choice 3"
                                onChange={handleChange(choices3, setChoice3, setShuffledChoices3)}
                            >
                                {shuffledChoices3.map((choice, index) => (
                                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Choice 4 */}
                            <InputLabel id="choice4" sx={{ mb: 0 }}>Choice 4</InputLabel>
                            <Select
                                sx={{ minWidth: 100 }}
                                labelId="choice4"
                                id="choice4"
                                value={choice4}
                                label="Choice 4"
                                onChange={handleChange(choices4, setChoice4, setShuffledChoices4)}
                            >
                                {shuffledChoices4.map((choice, index) => (
                                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <p style={{ color: submitted && score >= 10 ? 'green' : submitted ? 'red' : 'black' }}>
                            Your Score {score} / 20
                        </p>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                    <div>
                        {counting && (
                            <div style={{ marginTop: '10px' }}>
                                <p>Back to the main page in {countdown} seconds</p>
                            </div>
                        )}
                    </div>


                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to submit your answers?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>

            </Container>
        </div>
    );
}

export default Games1;
