import React from 'react';
import { View } from 'react-native';
import AppText from './AppText';
import { colors, spacing } from '../theme';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <View style={{ marginBottom: spacing.sm }}>
      <AppText variant="h2">{title}</AppText>
      {subtitle ? (
        <AppText style={{ color: colors.textSecondary, marginTop: 4 }}>{subtitle}</AppText>
      ) : null}
    </View>
  );
};

export default SectionHeader;
