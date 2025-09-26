import { COLORS } from "@/utils/colors";
import CurrentTime from "@/utils/currentTime";
import { ScreenHeight } from "@/utils/dimensions";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { greeting } = CurrentTime();
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={COLORS.primaryPurple} />
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop:
            Platform.OS === "ios" ? ScreenHeight * 0.07 : ScreenHeight * 0.075,
          paddingBottom: Platform.OS === "ios" ? 0 : ScreenHeight * 0.03,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
        className="bg-primaryPurple"
        edges={["bottom", "left", "right"]}
      >
        <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
          {greeting},{" "}
          {user?.username
            ?.charAt(0)
            .toUpperCase()
            .concat(user?.username?.slice(1)) || "User"}
          .
        </Text>
        <Pressable onPress={() => router.replace("/(tabs)/Profile")}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              height: 56,
              width: 56,
              borderRadius: 28,
            }}
            resizeMode="cover"
          />
        </Pressable>
      </SafeAreaView>

      <View style={{ flex: 1, margin: 16 }}>
        <Text>Your Tasks</Text>
      </View>
    </View>
  );
};

export default Home;
