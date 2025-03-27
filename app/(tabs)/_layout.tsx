import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: undefined,
        tabBarStyle: {
          backgroundColor: "#009688",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 70,
          position: "absolute",
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#B2DFDB"
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
          name="Explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="globe.europe.africa.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.crop.circle.fill" color={color} />
            ),
          }}
        />
    </Tabs>
    

  );
}
