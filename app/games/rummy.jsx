import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Rummy = () => {
    const route = useRoute();
    const { mode } = route.params; // 'computer' or 'friend'

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Rummy Game - {mode === 'computer' ? 'Play against Computer' : 'Play with Friend'}
            </Text>
            {/* Game logic and UI will be added here */}
            <View style={styles.gameContainer}>
                {/* Add your Rummy game components here */}
                <Text>Rummy game will be played here.</Text>
                {/* Placeholder for now */}
            </View>
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
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Rummy;
