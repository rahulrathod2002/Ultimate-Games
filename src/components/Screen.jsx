import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const Screen = ({ children, style }) => {
  const [isStatusHidden, setIsStatusHidden] = useState(false);
  const inactivityTimer = useRef(null);

  const resetInactivity = useCallback(() => {
    setIsStatusHidden(false);
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      setIsStatusHidden(true);
    }, 3000);
  }, []);

  useEffect(() => {
    resetInactivity();
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetInactivity]);

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      onTouchStart={resetInactivity}
      onTouchMove={resetInactivity}
    >
      <StatusBar barStyle="dark-content" hidden={isStatusHidden} showHideTransition="fade" />
      <View style={{ flex: 1 }} onTouchStart={resetInactivity} onTouchMove={resetInactivity}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Screen;
