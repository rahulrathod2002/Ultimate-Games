import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, AppText, GameCard, SectionHeader } from '../../src/components';
import { colors, spacing } from '../../src/theme';
import { gameSections } from '../../src/data/games';

const Home = () => {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        <View style={{ marginBottom: spacing.xl }}>
          <AppText variant="h1">Ultimate Games</AppText>
          <AppText style={{ color: colors.textSecondary, marginTop: spacing.xs }}>
            Everything you built in one polished arcade.
          </AppText>
        </View>

        {gameSections.map((section) => (
          <View key={section.id} style={{ marginBottom: spacing.xl }}>
            <SectionHeader title={section.title} subtitle={section.subtitle} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {section.items.map((game, index) => (
                <View key={game.id} style={{ width: '48%', marginBottom: spacing.md }}>
                  <GameCard
                    title={game.title}
                    subtitle={game.subtitle}
                    icon={game.icon}
                    order={`#${index + 1}`}
                    onPress={() => router.push(game.route)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default Home;
