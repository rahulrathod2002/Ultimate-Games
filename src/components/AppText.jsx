import React from 'react';
import { Text } from 'react-native';
import { colors, typography } from '../theme';

const AppText = ({ variant = 'body', style, children, ...props }) => {
  const variantStyle = typography[variant] ?? typography.body;
  return (
    <Text style={[{ color: colors.textPrimary }, variantStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
