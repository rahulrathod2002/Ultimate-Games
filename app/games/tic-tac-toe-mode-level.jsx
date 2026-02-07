import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TicTacToeAskLevel = () => {
    const router = useRouter();
    const handleLevelSelect = (level) => {
        router.push(`/games/tic-tac-toe?playAgainstComputer=true&level=${level}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Difficulty Level</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLevelSelect('easy')}
            >
                <Text style={styles.buttonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLevelSelect('medium')}
            >
                <Text style={styles.buttonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLevelSelect('hard')}
            >
                <Text style={styles.buttonText}>Hard</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: '50%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default TicTacToeAskLevel;
