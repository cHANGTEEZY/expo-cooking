import CurrentTime from "@/utils/currentTime";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";

const ScreenHeight = Dimensions.get("window").height;

const Home = () => {
  const { greeting } = CurrentTime();
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: ScreenHeight * 0.07,
          paddingBottom: ScreenHeight * 0.03,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
        className="bg-primaryPurple"
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
      </View>

      <View style={{ flex: 1, margin: 16 }}>
        <Text>Your Tasks</Text>
      </View>
    </View>
  );
};

export default Home;
