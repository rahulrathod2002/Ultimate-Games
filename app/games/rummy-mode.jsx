import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const RummyMode = () => {
    const router = useRouter();

    const handleModeSelect = (players) => {
        router.push({ pathname: '/games/rummy', params: { players: String(players) } });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Players</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect(2)}
            >
                <Text style={styles.buttonText}>2 Players</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect(4)}
            >
                <Text style={styles.buttonText}>4 Players</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect(6)}
            >
                <Text style={styles.buttonText}>6 Players</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default RummyMode;
