import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default function NumberGuessing() {
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber('easy'));
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts, setMaxAttempts] = useState(Infinity);
    const [showNumber, setShowNumber] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        resetGame(difficulty);
    }, [difficulty]);

    useEffect(() => {
        generateOptions();
    }, [randomNumber]);

    function generateRandomNumber(level) {
        let max;
        switch (level) {
            case 'easy':
                max = 10;
                break;
            case 'medium':
                max = 50;
                break;
            case 'hard':
                max = 100;
                break;
            default:
                max = 20;
        }
        return Math.floor(Math.random() * max) + 1;
    }

    function generateOptions() {
        const optionsSet = new Set();
        optionsSet.add(randomNumber);
        while (optionsSet.size < 4) {
            optionsSet.add(generateRandomNumber(difficulty));
        }
        setOptions([...optionsSet].sort(() => Math.random() - 0.5));
    }

    const handleGuess = (guess) => {
        setAttempts(attempts + 1);
        if (guess === randomNumber) {
            setMessage('Correct guess!');
            setShowNumber(true);
            setDisableOptions(true);
            fadeIn();
            setTimeout(() => {
                fadeOut();
                resetGame(difficulty); // Reset game and update options after correct guess
            }, 2000);
        } else if (attempts + 1 >= maxAttempts) {
            setMessage('Game over! Out of attempts.');
            setShowNumber(true);
            setDisableOptions(true);
            fadeIn();
            setTimeout(() => {
                fadeOut();
                resetGame(difficulty); // Reset game and update options after game over
            }, 2000);
        } else {
            setMessage('Wrong guess! Try again.');
            setShowNumber(true);
            setDisableOptions(true);
            fadeIn();
            setTimeout(() => {
                fadeOut();
                setDisableOptions(false);
                setMessage('');
                generateOptions(); // Regenerate options after incorrect guess
            }, 2000);
        }
    };

    const resetGame = (level) => {
        const newRandomNumber = generateRandomNumber(level);
        setRandomNumber(newRandomNumber);
        setAttempts(0);
        setShowNumber(false);
        setDisableOptions(false);
        setMessage('');
        setMaxAttempts(level === 'easy' ? Infinity : level === 'medium' ? 10 : 5);
        generateOptions(); // Ensure options are updated with new random number
    };

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Number Guessing Game</Text>
            <Text style={styles.title}>Select The Level</Text>
            <View style={styles.difficultyContainer}>
                <TouchableOpacity style={styles.difficultyButton} onPress={() => handleDifficultyChange('easy')}>
                    <Text style={styles.difficultyButtonText}>Easy-10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.difficultyButton} onPress={() => handleDifficultyChange('medium')}>
                    <Text style={styles.difficultyButtonText}>Med-50</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.difficultyButton} onPress={() => handleDifficultyChange('hard')}>
                    <Text style={styles.difficultyButtonText}>Hard-100</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.randomNumberContainer}>
                <Text style={styles.randomNumberText}>Guess This Number:</Text>
                <Animated.View style={[styles.randomNumberBox, { opacity: fadeAnim }]}>
                    <Text style={styles.randomNumber}>
                        {showNumber ? randomNumber : ''}
                    </Text>
                </Animated.View>
            </View>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, disableOptions && styles.disabledButton]}
                        onPress={() => handleGuess(option)}
                        disabled={disableOptions}
                    >
                        <Text style={styles.optionButtonText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => resetGame(difficulty)}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    randomNumberContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    randomNumberText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 150
    },
    randomNumberBox: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
    },
    randomNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 18,
        color: 'red',
        marginBottom: 60,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '85%',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        margin: 5,
        width: '20%',
        alignItems: 'center',
    },
    optionButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    resetButton: {
        backgroundColor: '#FF4136',
    },
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    difficultyButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    difficultyButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    disabledButton: {
        backgroundColor: '#b0c4de',
    },
});
