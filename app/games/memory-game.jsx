import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar, Image } from 'react-native';

// Import the back.png image
const backImage = require('./../../assets/images/idea.png');

const generateShuffledCards = () => {
    const cards = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, 13).flatMap(c => [c, c]);
    return cards.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
    const [cards, setCards] = useState(generateShuffledCards());
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [first, second] = selectedCards;
            if (cards[first] === cards[second]) {
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
        setCards(generateShuffledCards());
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <StatusBar showHideTransition='slide' hidden={true} />
            <View style={styles.container}>
                <Text style={styles.title}>Match The Alphabets</Text>
                <View style={styles.board}>
                    {cards.map((card, index) => {
                        const isSelected = selectedCards.includes(index);
                        const isMatched = matchedCards.includes(index);
                        const isFirstSelected = selectedCards[0] === index;
                        const isSecondSelected = selectedCards[1] === index;

                        let backgroundColor = '#fff'; // Default color for unselected cards

                        // Determine the background color based on card state
                        if (isFirstSelected || isSecondSelected) {
                            backgroundColor = isMatched ? 'green' : (selectedCards.length === 2 ? 'red' : '#fff');
                        } else if (isMatched) {
                            backgroundColor = 'green';
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.card,
                                    { backgroundColor }
                                ]}
                                onPress={() => handleCardPress(index)}
                            >
                                {isSelected || isMatched ? (
                                    <Text style={styles.cardText}>{card}</Text>
                                ) : (
                                    <Image source={backImage} style={styles.cardImage} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Text style={styles.moves}>Moves: {moves}</Text>
                <Text style={styles.score}>Score: {calculateScore()}%</Text>
                <TouchableOpacity style={styles.button} onPress={resetGame}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    card: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 24,
        color: '#000',
    },
    moves: {
        fontSize: 18,
        marginBottom: 20,
    },
    score: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FF4136',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar } from 'react-native';

// const generateShuffledCards = () => {
//     const cards = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, 13).flatMap(c => [c, c]);
//     return cards.sort(() => Math.random() - 0.5);
// };

// export default function MemoryGame() {
//     const [cards, setCards] = useState(generateShuffledCards());
//     const [selectedCards, setSelectedCards] = useState([]);
//     const [matchedCards, setMatchedCards] = useState([]);
//     const [moves, setMoves] = useState(0);

//     useEffect(() => {
//         if (selectedCards.length === 2) {
//             const [first, second] = selectedCards;
//             if (cards[first] === cards[second]) {
//                 setMatchedCards([...matchedCards, first, second]);
//             }
//             setTimeout(() => setSelectedCards([]), 1000);
//             setMoves(moves + 1);
//         }
//     }, [selectedCards]);

//     const handleCardPress = (index) => {
//         if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
//             setSelectedCards([...selectedCards, index]);
//         }
//     };

//     const resetGame = () => {
//         setCards(generateShuffledCards());
//         setSelectedCards([]);
//         setMatchedCards([]);
//         setMoves(0);
//     };

//     const calculateScore = () => {
//         const requiredMoves = cards.length / 2; // Minimum number of moves required for a perfect game
//         const score = Math.max(0, 100 - (moves - requiredMoves) * 5); // Decrease score by 5% for each move over the required moves
//         return score;
//     };
//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <StatusBar showHideTransition='slide' hidden={true} />
//             <View style={styles.container}>
//                 <Text style={styles.title}>Match The Aplphabates</Text>
//                 <View style={styles.board}>
//                     {cards.map((card, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={[
//                                 styles.card,
//                                 selectedCards.includes(index) || matchedCards.includes(index) ? styles.cardSelected : styles.cardUnselected,
//                             ]}
//                             onPress={() => handleCardPress(index)}
//                         >
//                             <Text style={styles.cardText}>
//                                 {selectedCards.includes(index) || matchedCards.includes(index) ? card : '?'}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//                 <Text style={styles.moves}>Moves: {moves}</Text>
//                 <Text style={styles.score}>Score: {calculateScore()}%</Text>
//                 <TouchableOpacity style={styles.button} onPress={resetGame}>
//                     <Text style={styles.buttonText}>Reset</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     board: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     card: {
//         width: 70,
//         height: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 5,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//     },
//     cardSelected: {
//         backgroundColor: '#007BFF',
//     },
//     cardUnselected: {
//         backgroundColor: '#fff',
//     },
//     cardText: {
//         fontSize: 24,
//         color: '#fff',
//     },
//     moves: {
//         fontSize: 18,
//         marginBottom: 20,
//     },
//     score: {
//         fontSize: 18,
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: '#FF4136',
//         padding: 15,
//         borderRadius: 10,
//         width: '80%',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//     },
// });
