import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Screen } from '../../src/components';
import { colors, spacing } from '../../src/theme';

const DoYouLoveMe = () => {
  const [playArea, setPlayArea] = useState({ width: 0, height: 0 });
  const [noButtonSize, setNoButtonSize] = useState({ width: 0, height: 0 });
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showLove, setShowLove] = useState(false);

  const maxPosition = useMemo(() => {
    return {
      x: Math.max(0, playArea.width - noButtonSize.width),
      y: Math.max(0, playArea.height - noButtonSize.height),
    };
  }, [playArea, noButtonSize]);

  const resetNoPosition = () => {
    setNoPosition({
      x: Math.min(maxPosition.x / 2, maxPosition.x),
      y: Math.min(maxPosition.y / 2, maxPosition.y),
    });
  };

  useEffect(() => {
    resetNoPosition();
  }, [maxPosition.x, maxPosition.y]);

  const moveNoButton = () => {
    setNoPosition({
      x: Math.random() * maxPosition.x,
      y: Math.random() * maxPosition.y,
    });
  };

  const handleYes = () => {
    setShowLove(true);
  };

  const handleReset = () => {
    setShowLove(false);
    resetNoPosition();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Do You Love Me?</Text>
        <Text style={styles.subtitle}>Choose wisely.</Text>

        <View
          style={styles.playArea}
          onLayout={(event) => setPlayArea(event.nativeEvent.layout)}
        >
          <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.noButton, { left: noPosition.x, top: noPosition.y }]}
            onLayout={(event) => setNoButtonSize(event.nativeEvent.layout)}
            onPress={moveNoButton}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showLove} transparent animationType="fade" onRequestClose={handleReset}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>owhh! love you so much..!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleReset}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  playArea: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFF7EA',
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  yesButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  noButton: {
    position: 'absolute',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
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

export default DoYouLoveMe;
