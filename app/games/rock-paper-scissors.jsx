import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const RockPaperScissors = () => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [result, setResult] = useState('');

    const choices = ['rock', 'paper', 'scissors'];

    const computerPlay = () => {
        const randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    };

    const playRound = (playerSelection) => {
        const computerSelection = computerPlay();
        if (playerSelection === computerSelection) {
            setResult(`It's a tie!`);
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            setPlayerScore(playerScore + 1);
            setResult(`You win! ${playerSelection} beats ${computerSelection}`);
        } else {
            setComputerScore(computerScore + 1);
            setResult(`You lose! ${computerSelection} beats ${playerSelection}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rock Paper Scissors Game</Text>
            <Text style={styles.subtitle}>Choose your move:</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.rock]}
                    onPress={() => playRound('rock')}
                >
                    <Text style={styles.buttonText}>✊</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.paper]}
                    onPress={() => playRound('paper')}
                >
                    <Text style={styles.buttonText}>🖐️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.scissors]}
                    onPress={() => playRound('scissors')}
                >
                    <Text style={styles.buttonText}>✌️</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.result}>{result}</Text>
            <View style={styles.scores}>
                <Text style={styles.score}>Your score: <Text style={styles.userScore}>{playerScore}</Text></Text>
                <Text style={styles.score}>Computer score: <Text style={styles.computerScore}>{computerScore}</Text></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 'none'
    },
    button: {
        borderRadius: 10,
        margin: 10,
        padding: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 40,
    },
    rock: {
        backgroundColor: '#ff0000',
    },
    paper: {
        backgroundColor: '#2196f3',
    },
    scissors: {
        backgroundColor: '#4caf50',
    },
    result: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
    scores: {
        marginTop: 20,
        alignItems: 'center',
    },
    score: {
        fontSize: 18,
        fontWeight: '600',
        // backgroundColor: '#fff'
    },
    userScore: {
        color: '#2196f3',
    },
    computerScore: {
        color: '#ff0000',
    },
});

export default RockPaperScissors;
