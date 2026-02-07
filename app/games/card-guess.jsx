import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Button, StatusBar } from 'react-native';
import { spades, clubs, diamonds, hearts } from './../../constants/cards';

const generateShuffledCards = (numberOfCards) => {
    const suits = [spades, clubs, diamonds, hearts];
    const allCards = [];

    suits.forEach(suit => {
        const shuffledSuit = shuffle(suit).slice(0, Math.floor(numberOfCards / 4));
        allCards.push(...shuffledSuit);
    });

    return shuffle(allCards).slice(0, numberOfCards).flatMap(c => [c, c]).sort(() => Math.random() - 0.5);
};

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const CardGuess = () => {
    const [cards, setCards] = useState(generateShuffledCards(15)); // Default to 20 cards
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [first, second] = selectedCards;
            if (cards[first].id === cards[second].id && cards[first].suit === cards[second].suit) {
                setMatchedCards([...matchedCards, first, second]);
            }
            setTimeout(() => setSelectedCards([]), 1000);
            setMoves(moves + 1);
        }
    }, [selectedCards]);

    const handleCardPress = (index) => {
        if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
            setSelectedCards([...selectedCards, index]);
        }
    };

    const resetGame = () => {
        setCards(generateShuffledCards(cards.length));
        setSelectedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };

    const handleSortPress = (numberOfCards) => {
        setCards(generateShuffledCards(numberOfCards));
        setSelectedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };

    const calculateScore = () => {
        const requiredMoves = cards.length / 2; // Minimum number of moves required for a perfect game
        const score = Math.max(0, 100 - (moves - requiredMoves) * 5); // Decrease score by 5% for each move over the required moves
        return score;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Match The Cards</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.sortButton} onPress={() => handleSortPress(17)}>
                    <Text style={styles.sortButtonText}>32 Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={() => handleSortPress(26)}>
                    <Text style={styles.sortButtonText}>64 Cards</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                {cards.map((card, index) => (
                    <TouchableOpacity
                        key={`${card.suit}-${card.id}-${index}`} // Ensure unique key
                        style={[styles.card, selectedCards.includes(index) || matchedCards.includes(index) ? styles.selectedCard : null]}
                        onPress={() => handleCardPress(index)}
                    >
                        <Image
                            source={selectedCards.includes(index) || matchedCards.includes(index) ? card.icon : require('./../../assets/images/cards/back.png')}
                            style={styles.cardImage}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.message}>
                {`Moves: ${moves} | Score: ${calculateScore()}`}
            </Text>
            <Button title="Reset Game" onPress={resetGame} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    sortButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 50,
        height: 75,
        margin: 5,
    },
    selectedCard: {
        borderColor: 'yellow',
        borderWidth: 2,
        borderRadius: 5,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        // resizeMode: 'contain',
    },
    message: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default CardGuess;
