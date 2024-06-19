import React, { useState } from 'react';
import { Container, Typography, Select, MenuItem, Button, Snackbar } from '@mui/material';
import AppBarToolbar from '../components/AppBarToolbar';
import { useUser } from '../components/UserContext';

// Define the correct sentence
const correctSentence = 'The dog is so nice';

// Define fake options for each sentence
const sentenceOptions = [
    ['The', 'water', 'drive'],
    ['Dog', 'them', 'swim'],
    ['Is', 'Pen', 'eat'],
    ['so', 'Sun', 'dance'],
    ['nice', 'Water', 'joking']
];

function Gamestest() {
    const { user, logout } = useUser();
    const [selectedWords, setSelectedWords] = useState(new Array(5).fill(''));
    const [openSnackbar, setOpenSnackbar] = useState(false); // State สำหรับเปิดปิด Snackbar
    const [score, setScore] = useState(0); // State เก็บคะแนน

    const handleChange = (index, event) => {
        const newSelectedWords = [...selectedWords];
        newSelectedWords[index] = event.target.value;
        setSelectedWords(newSelectedWords);
    };

    const handleSubmit = () => {
        // Check if all words are selected as the first option in the options list
        const isAllOption1 = selectedWords.every((word, index) => word === sentenceOptions[index][0]);

        if (isAllOption1) {
            // Calculate score based on correct sentence matching
            let totalScore = 0;

            // Check each selected word against the correct sentence
            selectedWords.forEach((word, index) => {
                if (word === correctSentence.split(' ')[index]) {
                    totalScore += 1;
                }
            });

            // Ensure score does not exceed 5
            const finalScore = Math.min(totalScore, 5);

            // Set the score
            setScore(finalScore);

            // Open the Snackbar
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='maincontent' style={{ width: '100vw', height: '100vh', backgroundColor: '#f6f7f1' }}>
            <AppBarToolbar user={user} />
            <Container component="main" maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
                <div className='header' style={{ backgroundColor: 'white', width: '70vw', height: 'auto', borderRadius: '10px', marginTop: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
                    <Typography variant="h4" style={{ marginBottom: '2%' }}>Select Words</Typography>
                    <div className='content' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between' }}>
                        {selectedWords.map((word, index) => (
                            <div key={index} style={{ width: '18%', marginBottom: '2%' }}>
                                <Typography variant="subtitle1" style={{ marginBottom: '1%' }}>Word {index + 1}</Typography>
                                <Select
                                    value={word}
                                    onChange={(event) => handleChange(index, event)}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select a word</em>
                                    </MenuItem>
                                    {/* Map through specific options for each sentence */}
                                    {sentenceOptions[index].map((option, i) => (
                                        <MenuItem key={i} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '2%' }}>
                        Submit
                    </Button>
                </div>
            </Container>
            {/* Snackbar for showing score */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={`Congratulations! You scored ${score}/5.`}
            />
        </div>
    );
}

export default Gamestest;
