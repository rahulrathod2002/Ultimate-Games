import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TicTacToe = () => {
    const route = useRoute();
    const playAgainstComputer = route.params?.playAgainstComputer === 'true';
    const level = route.params?.level || 'easy';
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [previousBoard, setPreviousBoard] = useState(null);
    const [lastMove, setLastMove] = useState(null);

    useEffect(() => {
        if (playAgainstComputer && currentPlayer === 'O') {
            makeComputerMove();
        }
    }, [currentPlayer, playAgainstComputer]);

    const handlePress = (index) => {
        if (board[index] === null && (!playAgainstComputer || currentPlayer === 'X')) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setPreviousBoard(board); // Save previous board state before update
            setLastMove(index); // Save the index of the last move
            setBoard(newBoard);

            const winner = calculateWinner(newBoard);
            if (winner) {
                setTimeout(() => {
                    Alert.alert(
                        `${winner} wins!`,
                        '',
                        [
                            { text: 'Show Result', onPress: () => showResultBoard() },
                            { text: 'OK', onPress: () => { resetBoard() } }
                        ]
                    );
                }, 1000);
                // Do not reset board here, only when 'Reset' is pressed
            } else if (newBoard.every(cell => cell !== null)) {
                setTimeout(() => {
                    Alert.alert(
                        'Draw!',
                        '',
                        [
                            { text: 'Show Result', onPress: () => showResultBoard() },
                            { text: 'OK', onPress: () => { resetBoard() } }
                        ]
                    );
                }, 1000);
                // Do not reset board here, only when 'Reset' is pressed
            } else {
                setCurrentPlayer(playAgainstComputer ? 'O' : currentPlayer === 'X' ? 'O' : 'X');
            }
        }
    };

    const makeComputerMove = () => {
        setTimeout(() => {
            const bestMove = findBestMove(board, level);
            const newBoard = [...board];
            newBoard[bestMove] = 'O';
            setPreviousBoard(board); // Save previous board state before update
            setLastMove(bestMove); // Save the index of the last move
            setBoard(newBoard);

            const winner = calculateWinner(newBoard);
            if (winner) {
                setTimeout(() => {
                    Alert.alert(
                        `${winner} wins!`,
                        '',
                        [
                            { text: 'Show Result', onPress: () => showResultBoard() },
                            { text: 'OK', onPress: () => { resetBoard() } }
                        ]
                    );
                }, 1000);
                // Do not reset board here, only when 'Reset' is pressed
            } else if (newBoard.every(cell => cell !== null)) {
                setTimeout(() => {
                    Alert.alert(
                        'Draw!',
                        '',
                        [
                            { text: 'Show Result', onPress: () => showResultBoard() },
                            { text: 'OK', onPress: () => { resetBoard() } }
                        ]
                    );
                }, 1000);
                // Do not reset board here, only when 'Reset' is pressed
            } else {
                setCurrentPlayer('X');
            }
        }, 1000);
    };

    const showResultBoard = () => {
        Alert.alert(
            'Result Board:',
            board.map((cell, index) => `Position ${index}: ${cell || '?'}`).join('\n')
        );
    };

    const findBestMove = (board, level) => {
        if (level === 'easy') {
            return findRandomMove(board);
        } else if (level === 'medium') {
            return findMediumMove(board);
        } else {
            return findBestMoveWithMinimax(board);
        }
    };

    const findRandomMove = (board) => {
        const availableMoves = board.map((cell, index) => (cell === null ? index : null)).filter(cell => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };

    const findMediumMove = (board) => {
        // Implement a medium difficulty move logic here (e.g., a mix of random and strategic moves)
        return findRandomMove(board);
    };

    const findBestMoveWithMinimax = (board) => {
        let bestVal = -Infinity;
        let bestMove = -1;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let moveVal = minimax(board, 0, false);
                board[i] = null;
                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    };

    const minimax = (board, depth, isMaximizing) => {
        const scores = { 'X': -1, 'O': 1, 'Draw': 0 };
        const result = calculateWinner(board);
        if (result) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestVal = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    let moveVal = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestVal = Math.max(bestVal, moveVal);
                }
            }
            return bestVal;
        } else {
            let bestVal = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    let moveVal = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestVal = Math.min(bestVal, moveVal);
                }
            }
            return bestVal;
        }
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setPreviousBoard(null);
        setLastMove(null);
    };

    const renderSquare = (index) => (
        <TouchableOpacity key={index} style={styles.square} onPress={() => handlePress(index)}>
            <Text style={styles.squareText}>{board[index]}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tic-Tac-Toe</Text>
            <View style={styles.board}>
                {board.map((_, index) => renderSquare(index))}
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
                <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const calculateWinner = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (board.every(cell => cell !== null)) {
        return 'Draw';
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    board: {
        width: '80%',
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    square: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        elevation: 1.5,
        // elevationAdjustment: 1000
    },
    squareText: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    resetButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        elevation: 3,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TicTacToe;
