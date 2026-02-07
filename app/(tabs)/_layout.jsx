import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../src/theme';

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.muted,
                tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
                }}
            />

            {/* <Tabs.Screen
                name='games'
                options={{
                    tabBarLabel: 'Games',
                    tabBarIcon: () => (
                        <Image
                            source={require('./../../assets/images/Games.png')}
                            style={{ width: 24, height: 24 }} // Adjust size as needed
                        />
                    )
                }}
            /> */}
        </Tabs>
    );
}

export default TabLayout;
