import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function ColorChanging() {
    const [colors, setColors] = useState([
        '#fcbe24', // random1
        '#9efc24', // random2
        '#24fcea', // random3
        '#fc24c2', // random4
        '#fc243a', // random5
        '#8e44ad', // new1
        '#3498db', // new2
        '#2ecc71'  // new3
    ]);

    const getRandomColors = () => {
        return [...colors].sort(() => 0.5 - Math.random());
    };

    const handlePress = () => {
        const newColors = getRandomColors();
        setColors(newColors);
    };

    return (
        <View style={styles.container}>
            {colors.map((color, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.box, { backgroundColor: color }]}
                    onPress={handlePress}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgb(222, 251, 192)',
        height: '100%',
        paddingTop: '35%'
    },
    box: {
        height: 150,
        width: 150,
        margin: 5,
        borderRadius: 10,
        elevation: 5
    },
});
