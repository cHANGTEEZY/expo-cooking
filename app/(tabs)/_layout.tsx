import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const TabBarItem = ({
  name,
  color,
  focused,
}: {
  name: string;
  color: string;
  focused: boolean;
}) => {
  const content = <Feather name={name as any} size={24} color={color} />;

  if (focused) {
    return (
      <LinearGradient
        colors={["#4c1fa6", "#cfc8de", "#4c1fa6"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.tabIconContainer]}
      >
        {content}
      </LinearGradient>
    );
  } else {
    return <View style={styles.tabIconContainer}>{content}</View>;
  }
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          marginHorizontal: ScreenWidth * 0.07,
          bottom: 20,
          height: 65,
          borderColor: "transparent",
          borderWidth: 0,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.234,
          shadowRadius: 50,
          elevation: 10,
          paddingBottom: 8,
          paddingTop: 13,
          backgroundColor: "transparent",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#9430bf", "#604c8a", "#321273"]}
            style={{
              flex: 1,
              borderColor: "transparent",
              borderRadius: 50,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingBottom: 0,
          paddingTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarItem name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarItem name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Events"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarItem name="star" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarItem name="user" color={color} focused={focused} />
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    height: 48,
    borderColor: "transparent",
    borderWidth: 0,
    width: ScreenWidth * 0.178,
  },
  activeDot: {
    bottom: -10,
    width: 6,
    height: 6,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: "white",
  },
});

export default TabsLayout;
