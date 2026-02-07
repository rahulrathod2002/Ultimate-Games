import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { colors } from '../theme';

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
