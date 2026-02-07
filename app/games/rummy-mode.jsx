import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RummyMode = () => {
    const navigation = useNavigation();

    const handleModeSelect = (mode) => {
        navigation.navigate('Rummy', { mode });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Mode</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect('computer')}
            >
                <Text style={styles.buttonText}>Vs. Computer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelect('friend')}
            >
                <Text style={styles.buttonText}>Vs. Friend</Text>
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
