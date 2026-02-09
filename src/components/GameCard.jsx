import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { colors, spacing, shadows } from '../theme';

const GameCard = ({ title, subtitle, icon, order, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        flex: 1,
        minHeight: 140,
        borderRadius: 18,
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'space-between',
        ...shadows.card,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
        {icon ? (
          <Image source={icon} style={{ width: 48, height: 48, borderRadius: 12 }} />
        ) : null}
        {order ? (
          <View
            style={{
              backgroundColor: colors.surfaceElevated ?? colors.surface,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              alignSelf: 'flex-start',
            }}
          >
            <AppText variant="caption" style={{ color: colors.textSecondary }}>
              {order}
            </AppText>
          </View>
        ) : null}
      </View>
      <View style={{ gap: 4 }}>
        <AppText variant="h3">{title}</AppText>
        {subtitle ? <AppText style={{ color: colors.textSecondary }}>{subtitle}</AppText> : null}
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
