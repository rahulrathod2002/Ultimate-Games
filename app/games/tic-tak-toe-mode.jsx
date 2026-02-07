import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TicTacToe_Ask = () => {
    const router = useRouter();

    const handleModeSelect = useCallback((computerMode) => {
        if (computerMode === 'true') {
            router.push(`/games/tic-tac-toe-mode-level`);
        } else {
            router.push(`/games/tic-tac-toe?playAgainstComputer=${computerMode}`);
        }
    }, [router]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect('true')}
            >
                <Text style={styles.buttonText}>Vs. Computer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect('false')}
            >
                <Text style={styles.buttonText}>Vs. Friend</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: '80%'
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default TicTacToe_Ask;
