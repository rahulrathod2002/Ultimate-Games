import { Stack } from 'expo-router';
import Constants from 'expo-constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const RELEASES_LATEST_URL = 'https://github.com/rahulrathod2002/Ultimate-Games/releases/latest/';
const RELEASES_API_URL = 'https://api.github.com/repos/rahulrathod2002/Ultimate-Games/releases/latest';
const ASSET_NAME_REGEX = /UltimateGames V(\d+)\.apk/i;

const normalizeBuildNumber = (value: unknown) => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

const UpdatePrompt = () => {
  const [visible, setVisible] = useState(false);
  const [latestLabel, setLatestLabel] = useState('');
  const [latestUrl, setLatestUrl] = useState(RELEASES_LATEST_URL);
  const hasChecked = useRef(false);

  const currentBuild = useMemo(() => {
    return (
      normalizeBuildNumber(Constants.nativeBuildVersion) ||
      normalizeBuildNumber(Constants.expoConfig?.android?.versionCode) ||
      normalizeBuildNumber(Constants.expoConfig?.extra?.buildNumber) ||
      normalizeBuildNumber(Constants.manifest?.extra?.buildNumber) ||
      normalizeBuildNumber(Constants.manifest2?.extra?.buildNumber)
    );
  }, []);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    let mounted = true;
    const checkLatest = async () => {
      try {
        const response = await fetch(RELEASES_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) return;
        const data = await response.json();
        if (!mounted || !currentBuild) return;
        const asset = (data?.assets ?? []).find((item: { name?: string }) => ASSET_NAME_REGEX.test(item?.name));
        const match = asset?.name?.match(ASSET_NAME_REGEX);
        const availableBuild = match ? normalizeBuildNumber(match[1]) : 0;
        if (!availableBuild || currentBuild >= availableBuild) return;

        setLatestLabel(asset?.name ?? `UltimateGames V${availableBuild}.apk`);
        setLatestUrl(asset?.browser_download_url ?? RELEASES_LATEST_URL);
        setVisible(true);
      } catch (error) {
        // fail silently
      }
    };
    checkLatest();
    return () => {
      mounted = false;
    };
  }, [currentBuild]);

  const handleDownload = () => {
    setVisible(false);
    Linking.openURL(latestUrl);
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
      <View style={styles.updateBackdrop}>
        <View style={styles.updateCard}>
          <Text style={styles.updateTitle}>New version available</Text>
          <Text style={styles.updateSubtitle}>
            A new version ({latestLabel}) is available. Download the latest release.
          </Text>
          <View style={styles.updateActions}>
            <Pressable onPress={() => setVisible(false)} style={[styles.updateButton, styles.cancelButton]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleDownload} style={[styles.updateButton, styles.downloadButton]}>
              <Text style={styles.downloadText}>Download</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function RootLayout() {
  return (
    <>
      <UpdatePrompt />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="games/tic-tac-toe" /> */}
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  updateBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  updateCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    marginBottom: 6,
  },
  updateSubtitle: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 18,
  },
  updateActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  updateButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  downloadButton: {
    backgroundColor: '#111111',
  },
  cancelText: {
    color: '#333333',
    fontWeight: '600',
  },
  downloadText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
