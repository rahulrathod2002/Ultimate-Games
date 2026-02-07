import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme';
import { buildWebGameHtml } from './loadWebGame';

const WebGameScreen = ({ config }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const merged = await buildWebGameHtml(config);
      if (mounted) {
        setHtml(merged);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [config]);

  if (!html) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      allowFileAccess
      allowUniversalAccessFromFileURLs
      source={{ html }}
      style={{ flex: 1, backgroundColor: colors.background }}
    />
  );
};

export default WebGameScreen;
