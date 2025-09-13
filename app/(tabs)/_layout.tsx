import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ headerShown: false }} />
      <Tabs.Screen name="Profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
