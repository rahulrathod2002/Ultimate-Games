import { View, Text } from 'react-native'
import React from 'react'
import TicTacToe_Ask from './tic-tak-toe-mode'
import TicTacToeAskLevel from './tic-tac-toe-mode-level'
import RummyMode from './rummy-mode'

const Games = () => {
  return (
    <View >
      <TicTacToe_Ask />
      {/* <TicTacToeAskLevel /> */}
      {/* <RummyMode /> */}
    </View>
  )
}

export default Games

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// const GameSelector = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/games/tic-tac-toe-ask')}
//       >
//         <Text style={styles.buttonText}>Tic-Tac-Toe</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/games/color-changing')}
//       >
//         <Text style={styles.buttonText}>Color Changing</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/games/color-guessing')}
//       >
//         <Text style={styles.buttonText}>Color Guessing</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/games/memory-game')}
//       >
//         <Text style={styles.buttonText}>Memory Game</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default GameSelector
