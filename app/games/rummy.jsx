import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components';
import { colors, spacing } from '../../src/theme';

const TABLE_IMAGE = require('../../screenshots/rummy-desk.jpg');

const CARD_IMAGES = {
  'club-A': require('../../assets/images/cards/club/A.png'),
  'club-2': require('../../assets/images/cards/club/2.png'),
  'club-3': require('../../assets/images/cards/club/3.png'),
  'club-4': require('../../assets/images/cards/club/4.png'),
  'club-5': require('../../assets/images/cards/club/5.png'),
  'club-6': require('../../assets/images/cards/club/6.png'),
  'club-7': require('../../assets/images/cards/club/7.png'),
  'club-8': require('../../assets/images/cards/club/8.png'),
  'club-9': require('../../assets/images/cards/club/9.png'),
  'club-10': require('../../assets/images/cards/club/10.png'),
  'club-J': require('../../assets/images/cards/club/J.png'),
  'club-Q': require('../../assets/images/cards/club/queen.png'),
  'club-K': require('../../assets/images/cards/club/king.png'),
  'diamond-A': require('../../assets/images/cards/diamond/A.png'),
  'diamond-2': require('../../assets/images/cards/diamond/2.png'),
  'diamond-3': require('../../assets/images/cards/diamond/3.png'),
  'diamond-4': require('../../assets/images/cards/diamond/4.png'),
  'diamond-5': require('../../assets/images/cards/diamond/5.png'),
  'diamond-6': require('../../assets/images/cards/diamond/6.png'),
  'diamond-7': require('../../assets/images/cards/diamond/7.png'),
  'diamond-8': require('../../assets/images/cards/diamond/8.png'),
  'diamond-9': require('../../assets/images/cards/diamond/9.png'),
  'diamond-10': require('../../assets/images/cards/diamond/10.png'),
  'diamond-J': require('../../assets/images/cards/diamond/J.png'),
  'diamond-Q': require('../../assets/images/cards/diamond/queen.png'),
  'diamond-K': require('../../assets/images/cards/diamond/king.png'),
  'heart-A': require('../../assets/images/cards/heart/A.png'),
  'heart-2': require('../../assets/images/cards/heart/2.png'),
  'heart-3': require('../../assets/images/cards/heart/3.png'),
  'heart-4': require('../../assets/images/cards/heart/4.png'),
  'heart-5': require('../../assets/images/cards/heart/5.png'),
  'heart-6': require('../../assets/images/cards/heart/6.png'),
  'heart-7': require('../../assets/images/cards/heart/7.png'),
  'heart-8': require('../../assets/images/cards/heart/8.png'),
  'heart-9': require('../../assets/images/cards/heart/9.png'),
  'heart-10': require('../../assets/images/cards/heart/10.png'),
  'heart-J': require('../../assets/images/cards/heart/J.png'),
  'heart-Q': require('../../assets/images/cards/heart/queen.png'),
  'heart-K': require('../../assets/images/cards/heart/king.png'),
  'spade-A': require('../../assets/images/cards/spade/A.png'),
  'spade-2': require('../../assets/images/cards/spade/2.png'),
  'spade-3': require('../../assets/images/cards/spade/3.png'),
  'spade-4': require('../../assets/images/cards/spade/4.png'),
  'spade-5': require('../../assets/images/cards/spade/5.png'),
  'spade-6': require('../../assets/images/cards/spade/6.png'),
  'spade-7': require('../../assets/images/cards/spade/7.png'),
  'spade-8': require('../../assets/images/cards/spade/8.png'),
  'spade-9': require('../../assets/images/cards/spade/9.png'),
  'spade-10': require('../../assets/images/cards/spade/10.png'),
  'spade-J': require('../../assets/images/cards/spade/J.png'),
  'spade-Q': require('../../assets/images/cards/spade/queen.png'),
  'spade-K': require('../../assets/images/cards/spade/king.png'),
};

const SUITS = ['spade', 'heart', 'diamond', 'club'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const BACK_IMAGE = require('../../assets/images/cards/back.png');

const getRankValue = (rank) => {
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return Number(rank);
};

const buildDeck = (deckCount) => {
  const cards = [];
  for (let deckIndex = 0; deckIndex < deckCount; deckIndex += 1) {
    SUITS.forEach((suit) => {
      RANKS.forEach((rank) => {
        const key = `${suit}-${rank}`;
        cards.push({
          id: `${key}-${deckIndex}`,
          suit,
          rank,
          value: getRankValue(rank),
          image: CARD_IMAGES[key],
        });
      });
    });
  }
  return cards;
};

const shuffle = (cards) => {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const collectSequencesForSuit = (cards, aceHigh = false) => {
  const sorted = [...cards].sort((a, b) => {
    const va = aceHigh && a.rank === 'A' ? 14 : a.value;
    const vb = aceHigh && b.rank === 'A' ? 14 : b.value;
    return va - vb;
  });
  const sequences = [];
  let current = [];
  for (let i = 0; i < sorted.length; i += 1) {
    const currentValue = aceHigh && sorted[i].rank === 'A' ? 14 : sorted[i].value;
    if (current.length === 0) {
      current = [sorted[i]];
      continue;
    }
    const lastValue = aceHigh && current[current.length - 1].rank === 'A' ? 14 : current[current.length - 1].value;
    if (currentValue === lastValue + 1) {
      current.push(sorted[i]);
    } else {
      if (current.length >= 3) {
        sequences.push([...current]);
      }
      current = [sorted[i]];
    }
  }
  if (current.length >= 3) {
    sequences.push([...current]);
  }
  return sequences;
};

const getAllSequences = (cards) => {
  const sequences = [];
  SUITS.forEach((suit) => {
    const suitCards = cards.filter((card) => card.suit === suit);
    sequences.push(...collectSequencesForSuit(suitCards, false));
    sequences.push(...collectSequencesForSuit(suitCards, true));
  });
  return sequences;
};

const getAllSets = (cards) => {
  const sets = [];
  RANKS.forEach((rank) => {
    const rankCards = cards.filter((card) => card.rank === rank);
    if (rankCards.length >= 3) {
      const combos = (arr, size, start = 0, picked = [], output = []) => {
        if (picked.length === size) {
          output.push([...picked]);
          return output;
        }
        for (let i = start; i < arr.length; i += 1) {
          picked.push(arr[i]);
          combos(arr, size, i + 1, picked, output);
          picked.pop();
        }
        return output;
      };
      const uniqueSuit = (combo) => new Set(combo.map((card) => card.suit)).size === combo.length;
      if (rankCards.length >= 3) {
        combos(rankCards, 3)
          .filter(uniqueSuit)
          .forEach((combo) => sets.push(combo));
      }
      if (rankCards.length >= 4) {
        combos(rankCards, 4)
          .filter(uniqueSuit)
          .forEach((combo) => sets.push(combo));
      }
    }
  });
  return sets;
};

const cardKey = (card) => `${card.suit}-${card.rank}-${card.id}`;

const isConsecutive = (values) => {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] !== values[i - 1] + 1) {
      return false;
    }
  }
  return true;
};

const isSequenceMeld = (meld) => {
  if (!meld.length) return false;
  if (!meld.every((card) => card.suit === meld[0].suit)) return false;
  const valuesLow = [...meld].map((card) => card.value).sort((a, b) => a - b);
  if (isConsecutive(valuesLow)) return true;
  const valuesHigh = [...meld]
    .map((card) => (card.rank === 'A' ? 14 : card.value))
    .sort((a, b) => a - b);
  return isConsecutive(valuesHigh);
};

const isSetMeld = (meld) => {
  if (!meld.length) return false;
  return meld.every((card) => card.rank === meld[0].rank);
};

const findMeldArrangement = (cards) => {
  const sequences = getAllSequences(cards);
  const sets = getAllSets(cards);
  const melds = [...sequences, ...sets].sort((a, b) => b.length - a.length);

  const backtrack = (remaining, pickedMelds, sequenceCount) => {
    if (remaining.length === 0) {
      return sequenceCount >= 2 ? pickedMelds : null;
    }

    for (let i = 0; i < melds.length; i += 1) {
      const meld = melds[i];
      const meldKeys = meld.map(cardKey);
      const remainingKeys = new Set(remaining.map(cardKey));
      const canUse = meldKeys.every((key) => remainingKeys.has(key));
      if (!canUse) continue;

      const nextRemaining = remaining.filter((card) => !meldKeys.includes(cardKey(card)));
      const isSequence = isSequenceMeld(meld);
      const result = backtrack(nextRemaining, [...pickedMelds, meld], sequenceCount + (isSequence ? 1 : 0));
      if (result) {
        return result;
      }
    }

    return null;
  };

  return backtrack(cards, [], 0);
};

const analyzeHand = (hand) => {
  const arrangement = findMeldArrangement(hand);
  if (!arrangement) {
    return {
      isValid: false,
      melds: [],
      firstLife: [],
      secondLife: [],
      sets: [],
    };
  }

  const sequences = arrangement.filter((meld) => isSequenceMeld(meld));
  const sets = arrangement.filter((meld) => isSetMeld(meld));

  return {
    isValid: sequences.length >= 2,
    melds: arrangement,
    firstLife: sequences[0] || [],
    secondLife: sequences[1] || [],
    sets,
  };
};

const sortForDisplay = (hand) => {
  const analysis = analyzeHand(hand);
  if (!analysis.melds.length) {
    return [...hand].sort((a, b) => a.suit.localeCompare(b.suit) || a.value - b.value);
  }
  return analysis.melds.flat();
};

const Rummy = () => {
  const params = useLocalSearchParams();
  const playerCount = useMemo(() => {
    const parsed = Number(params.players);
    return Number.isNaN(parsed) || parsed < 2 ? 2 : parsed;
  }, [params.players]);

  const deckCount = playerCount >= 5 ? 2 : 1;
  const [players, setPlayers] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [analysis, setAnalysis] = useState(() => analyzeHand([]));
  const [showWinner, setShowWinner] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const botTimeout = useRef(null);

  const resetGame = useCallback(() => {
    if (botTimeout.current) {
      clearTimeout(botTimeout.current);
    }
    const deck = shuffle(buildDeck(deckCount));
    const newPlayers = Array.from({ length: playerCount }).map((_, index) => ({
      id: `player-${index}`,
      name: index === 0 ? 'You' : `Bot ${index}`,
      isHuman: index === 0,
      hand: [],
    }));

    for (let cardIndex = 0; cardIndex < 13; cardIndex += 1) {
      newPlayers.forEach((player) => {
        player.hand.push(deck.pop());
      });
    }

    const firstDiscard = deck.pop();
    setPlayers(newPlayers);
    setDrawPile(deck);
    setDiscardPile(firstDiscard ? [firstDiscard] : []);
    setCurrentPlayerIndex(0);
    setHasDrawn(false);
    setAnalysis(analyzeHand(newPlayers[0].hand));
    setShowWinner(false);
    setWinnerName('');
  }, [deckCount, playerCount]);

  useEffect(() => {
    resetGame();
    return () => {
      if (botTimeout.current) {
        clearTimeout(botTimeout.current);
      }
    };
  }, [resetGame]);

  const currentPlayer = players[currentPlayerIndex] || null;
  const human = players[0] || null;

  const nextPlayer = () => {
    setHasDrawn(false);
    setCurrentPlayerIndex((index) => (index + 1) % players.length);
  };

  const drawCard = (source) => {
    if (!currentPlayer || !currentPlayer.isHuman || hasDrawn) return;
    if (source === 'draw' && drawPile.length === 0) return;
    if (source === 'discard' && discardPile.length === 0) return;

    const card = source === 'draw' ? drawPile[drawPile.length - 1] : discardPile[discardPile.length - 1];
    const updatedDraw = source === 'draw' ? drawPile.slice(0, -1) : drawPile;
    const updatedDiscard = source === 'discard' ? discardPile.slice(0, -1) : discardPile;

    const updatedPlayers = players.map((player, index) =>
      index === currentPlayerIndex ? { ...player, hand: [...player.hand, card] } : player
    );

    setPlayers(updatedPlayers);
    setDrawPile(updatedDraw);
    setDiscardPile(updatedDiscard);
    setHasDrawn(true);
  };

  const discardCard = (cardId) => {
    if (!currentPlayer || !currentPlayer.isHuman || !hasDrawn) return;
    const updatedPlayers = players.map((player, index) => {
      if (index !== currentPlayerIndex) return player;
      const updatedHand = player.hand.filter((card) => card.id !== cardId);
      return { ...player, hand: updatedHand };
    });

    const discardedCard = currentPlayer.hand.find((card) => card.id === cardId);
    if (!discardedCard) return;

    setPlayers(updatedPlayers);
    setDiscardPile([...discardPile, discardedCard]);
    setAnalysis(analyzeHand(updatedPlayers[0].hand));
    nextPlayer();
  };

  const handleSort = () => {
    if (!human) return;
    const sorted = sortForDisplay(human.hand);
    const updatedPlayers = players.map((player, index) =>
      index === 0 ? { ...player, hand: sorted } : player
    );
    setPlayers(updatedPlayers);
    setAnalysis(analyzeHand(sorted));
  };

  const handleDeclare = () => {
    if (!human) return;
    const result = analyzeHand(human.hand);
    setAnalysis(result);
    if (result.isValid) {
      setWinnerName('You');
      setShowWinner(true);
    }
  };

  useEffect(() => {
    if (!players.length) return;
    const activePlayer = players[currentPlayerIndex];
    if (activePlayer && !activePlayer.isHuman) {
      botTimeout.current = setTimeout(() => {
        const useDrawPile = drawPile.length > 0;
        const drawFrom = useDrawPile
          ? drawPile[drawPile.length - 1]
          : discardPile[discardPile.length - 1];
        if (!drawFrom) return;

        let discardedCard = null;
        const updatedPlayers = players.map((player, index) => {
          if (index !== currentPlayerIndex) return player;
          const updatedHand = [...player.hand, drawFrom];
          const discardIndex = Math.floor(Math.random() * updatedHand.length);
          const [discarded] = updatedHand.splice(discardIndex, 1);
          discardedCard = discarded;
          return { ...player, hand: updatedHand };
        });

        const baseDiscard = useDrawPile ? discardPile : discardPile.slice(0, -1);
        const nextDiscard = discardedCard ? [...baseDiscard, discardedCard] : baseDiscard;
        setDiscardPile(nextDiscard);
        setDrawPile(useDrawPile ? drawPile.slice(0, -1) : drawPile);

        setPlayers(updatedPlayers);
        nextPlayer();
      }, 900);
    }
  }, [currentPlayerIndex, players, drawPile, discardPile]);

  const renderCard = (card, interactive = false) => {
    return (
      <TouchableOpacity
        key={card.id}
        onPress={() => (interactive ? discardCard(card.id) : null)}
        disabled={!interactive}
        style={styles.cardWrapper}
      >
        <Image source={card.image} style={styles.cardImage} />
      </TouchableOpacity>
    );
  };

  const renderMeldRow = (title, cards) => {
    if (!cards.length) return null;
    return (
      <View style={styles.meldRow}>
        <Text style={styles.meldTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardWrapperSmall}>
              <Image source={card.image} style={styles.cardImageSmall} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <Screen style={{ backgroundColor: '#0F1E1B' }}>
      <ImageBackground source={TABLE_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Play Rummy</Text>
              <Text style={styles.subtitle}>13-card rummy against {playerCount - 1} computer player(s).</Text>
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetText}>New Game</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.turnRow}>
            <Text style={styles.turnText}>Turn: {currentPlayer ? currentPlayer.name : '...'}</Text>
            <View style={styles.turnActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSort}>
                <Text style={styles.actionText}>Sort</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleDeclare}>
                <Text style={styles.actionText}>Declare</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tableRow}>
            <TouchableOpacity style={styles.pile} onPress={() => drawCard('draw')}>
              <Image source={BACK_IMAGE} style={styles.pileImage} />
              <Text style={styles.pileLabel}>Draw</Text>
              <Text style={styles.pileCount}>{drawPile.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pile} onPress={() => drawCard('discard')}>
              {discardPile.length ? (
                <Image source={discardPile[discardPile.length - 1].image} style={styles.pileImage} />
              ) : (
                <View style={styles.emptyPile}>
                  <Text style={styles.emptyPileText}>Empty</Text>
                </View>
              )}
              <Text style={styles.pileLabel}>Discard</Text>
              <Text style={styles.pileCount}>{discardPile.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.botRow}>
            {players.slice(1).map((player) => (
              <View key={player.id} style={styles.botCard}>
                <Text style={styles.botName}>{player.name}</Text>
                <Text style={styles.botCount}>{player.hand.length} cards</Text>
              </View>
            ))}
          </View>

          <View style={styles.handSection}>
            <Text style={styles.handTitle}>
              Your Hand {hasDrawn ? '(tap a card to discard)' : '(draw a card)'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.handRow}>
              {(human?.hand || []).map((card) => renderCard(card, currentPlayer?.isHuman && hasDrawn))}
            </ScrollView>
          </View>

          <View style={styles.analysisPanel}>
            <Text style={styles.analysisTitle}>Valid Sets</Text>
            {renderMeldRow('First Life (Sequence)', analysis.firstLife)}
            {renderMeldRow('Second Life (Sequence)', analysis.secondLife)}
            {analysis.sets.length ? (
              <View>
                <Text style={styles.meldTitle}>Sets</Text>
                {analysis.sets.map((set, index) => (
                  <ScrollView key={`set-${index}`} horizontal showsHorizontalScrollIndicator={false}>
                    {set.map((card) => (
                      <View key={card.id} style={styles.cardWrapperSmall}>
                        <Image source={card.image} style={styles.cardImageSmall} />
                      </View>
                    ))}
                  </ScrollView>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </ImageBackground>

      <Modal visible={showWinner} transparent animationType="fade" onRequestClose={() => setShowWinner(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{winnerName} won the game!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.25,
  },
  overlay: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: 'rgba(10, 24, 22, 0.88)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#F8F5EE',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(248,245,238,0.75)',
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  resetText: {
    color: '#fff',
    fontWeight: '700',
  },
  turnRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    color: '#fff',
    fontWeight: '600',
  },
  turnActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    backgroundColor: '#1F6F78',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  tableRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.lg,
  },
  pile: {
    alignItems: 'center',
  },
  pileImage: {
    width: 72,
    height: 104,
    borderRadius: 8,
  },
  pileLabel: {
    color: '#fff',
    marginTop: 6,
  },
  pileCount: {
    color: 'rgba(255,255,255,0.7)',
  },
  emptyPile: {
    width: 72,
    height: 104,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPileText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  botRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  botCard: {
    padding: spacing.sm,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  botName: {
    color: '#fff',
    fontWeight: '600',
  },
  botCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  handSection: {
    marginTop: spacing.lg,
  },
  handTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  handRow: {
    paddingBottom: spacing.sm,
  },
  cardWrapper: {
    marginRight: 8,
  },
  cardImage: {
    width: 64,
    height: 96,
    borderRadius: 8,
  },
  analysisPanel: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  analysisTitle: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  meldRow: {
    marginBottom: spacing.sm,
  },
  meldTitle: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  cardWrapperSmall: {
    marginRight: 6,
  },
  cardImageSmall: {
    width: 44,
    height: 64,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default Rummy;
