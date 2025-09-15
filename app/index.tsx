import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading spinner while checking auth state
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  // Redirect based on authentication state
  if (isSignedIn) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return <Redirect href="/(auth)/Signin" />;
};

export default index;
