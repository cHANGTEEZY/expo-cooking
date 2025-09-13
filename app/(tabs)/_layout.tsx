import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          marginHorizontal: 20,
          height: 65,
          borderRadius: 40,
          backgroundColor: "black",
          borderTopWidth: 0,
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 8,
        },

        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="home" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="search" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="heart" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="user" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="settings" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
    top: 10,
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    bottom: -10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
});

export default TabsLayout;
