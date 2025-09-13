import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  return (
    <View>
      <SafeAreaView>
        <Text className="text-red-700 text-3xl font-bold">Sign in Page</Text>
        <Link href={"/(auth)/Signup"}>Sign up</Link>
      </SafeAreaView>
    </View>
  );
};

export default Signin;
