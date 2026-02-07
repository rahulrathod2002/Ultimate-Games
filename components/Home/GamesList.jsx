import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const GamesList = () => {
    const router = useRouter();

    const onMenuClick = async (item) => {
        router.push(item.path);
    };

    const gamesList = [
        {
            id: 1,
            name: 'Tic Tac Toe',
            icon: require('./../../assets/images/tic_tac_toe.jpg'),
            path: '/games/tic-tac-toe-mode'
        },
        {
            id: 2,
            name: 'Numbers Guessing',
            icon: require('./../../assets/images/gauess.png'),
            path: '/games/numbers-guessing'
        },
        {
            id: 3,
            name: 'Colors Changing',
            icon: require('./../../assets/images/color_change.jpg'),
            path: '/games/color-changing'
        },
        {
            id: 4,
            name: 'Memory Game',
            icon: require('./../../assets/images/memory_game.jpg'),
            path: '/games/memory-game'
        },
        {
            id: 5,
            name: 'Rock Papaer Scissors',
            icon: require('./../../assets/images/rock-paper-scissors.png'),
            path: '/games/rock-paper-scissors'
        },
        {
            id: 6,
            name: 'Play Rummy',
            icon: require('./../../assets/images/poker-table.png'),
            path: '/games/rummy-mode'
            // path: '/games/rummy'
        },
        {
            id: 7,
            name: 'Lets test your Luck',
            icon: require('./../../assets/images/cards.png'),
            path: '/games/card-guess'
        }
    ];

    return (
        <View style={{ marginTop: 50, gap: 50 }}>
            <FlatList
                data={gamesList}
                numColumns={2}
                style={{ padding: 5 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onMenuClick(item)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: 'green',
                            marginTop: 10,
                            backgroundColor: "#fff",
                            flex: 1,
                            margin: 5,
                            elevation: 3
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                flex: 1,
                                marginLeft: 10,
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default GamesList;
