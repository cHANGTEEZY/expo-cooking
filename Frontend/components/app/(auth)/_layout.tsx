import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  console.log("User is signed in: ", isSignedIn);

  // If user is authenticated, redirect to home
  if (isLoaded && isSignedIn) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
