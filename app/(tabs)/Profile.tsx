import Icon from "@/components/IconWrapper";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import * as Icons from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/Signin");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  const confirmSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: handleSignOut,
      },
    ]);
  };

  const ticketStats = {
    totalTickets: 47,
    activeTickets: 3,
    expiredTickets: 44,
    favoriteVenues: 12,
  };

  const ProfileItem = ({
    icon,
    title,
    onPress,
    rightElement = null,
    showArrow = true,
  }: {
    icon: keyof typeof Icons;
    title: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      onPress={rightElement ? undefined : onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-100"
      activeOpacity={rightElement ? 1 : 0.7}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
          <Icon name={icon} size={20} color="#666" />
        </View>
        <Text className="text-lg ">{title}</Text>
      </View>
      <View className="flex-row items-center">
        {rightElement}
        {showArrow && <Icon name="ChevronRight" size={20} color="#666" />}
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({
    icon,
    value,
    label,
    color = "#8B5CF6",
  }: {
    icon: keyof typeof Icons;
    value: number;
    label: string;
    color?: string;
  }) => (
    <View className="flex-1 bg-white rounded-2xl p-4 mx-1 shadow-sm border border-gray-100">
      <View className="items-center">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mb-2"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon name={icon} size={24} color={color} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">{value}</Text>
        <Text className="text-sm text-gray-600 text-center">{label}</Text>
      </View>
    </View>
  );

  return (
    <View className="bg-primaryPurple flex-1">
      <StatusBar barStyle={"dark-content"} />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="flex-row justify-between items-center m-8">
          <Text className="font-bold text-3xl text-white">My Profile</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => {
                console.log("Profile settings clicked");
              }}
            >
              <Icon name="UserRoundCog" size={27} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("Notifications clicked");
              }}
            >
              <Icon name="Bell" size={27} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 bg-white rounded-t-[40px]"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        >
          <View className="p-8 pb-4">
            <View className="flex-row items-center gap-6 mb-6">
              <View>
                {user?.imageUrl ? (
                  <Image
                    source={{ uri: user.imageUrl }}
                    className="h-32 w-32 rounded-[25px]"
                  />
                ) : (
                  <View className="h-32 w-32 bg-gray-200 rounded-[25px] items-center justify-center">
                    <Icon name="User" size={48} color="#666" />
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold font-DMSANSMEDIUM mb-2">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-lg text-gray-600 mb-1">
                  {user?.primaryEmailAddress?.emailAddress}
                </Text>
                {user?.username && (
                  <Text className="text-lg font-semibold text-purple-400">
                    @{user.username}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Statistics Section */}
          <View className="px-8 pb-6">
            <Text className="text-xl font-bold mb-4">Ticket Statistics</Text>
            <View className="flex-row mb-4">
              <StatCard
                icon="Ticket"
                value={ticketStats.totalTickets}
                label="Total Tickets"
                color="#8B5CF6"
              />
              <StatCard
                icon="Clock"
                value={ticketStats.activeTickets}
                label="Active"
                color="#10B981"
              />
            </View>
            <View className="flex-row">
              <StatCard
                icon="Archive"
                value={ticketStats.expiredTickets}
                label="Expired"
                color="#6B7280"
              />
              <StatCard
                icon="Heart"
                value={ticketStats.favoriteVenues}
                label="Favorite Venues"
                color="#EF4444"
              />
            </View>
          </View>

          {/* Settings Section */}
          <View className="px-8 pb-6">
            <Text className="text-xl font-bold mb-4">Settings</Text>
            <View className="bg-gray-50 rounded-2xl p-4">
              <ProfileItem
                icon="Bell"
                title="Push Notifications"
                rightElement={
                  <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{ false: "#767577", true: "#8B5CF6" }}
                  />
                }
                showArrow={false}
              />
              <ProfileItem
                icon="RefreshCw"
                title="Auto-sync Tickets"
                rightElement={
                  <Switch
                    value={autoSync}
                    onValueChange={setAutoSync}
                    trackColor={{ false: "#767577", true: "#8B5CF6" }}
                  />
                }
                showArrow={false}
              />
              <ProfileItem
                icon="Fingerprint"
                title="Biometric Authentication"
                rightElement={
                  <Switch
                    value={biometricAuth}
                    onValueChange={setBiometricAuth}
                    trackColor={{ false: "#767577", true: "#8B5CF6" }}
                  />
                }
                showArrow={false}
              />
              <ProfileItem
                icon="Moon"
                title="Dark Mode"
                rightElement={
                  <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#767577", true: "#8B5CF6" }}
                  />
                }
                showArrow={false}
              />
            </View>
          </View>

          {/* Support Section */}
          <View className="px-8 pb-6">
            <Text className="text-xl font-bold mb-4">Support</Text>
            <View className="bg-gray-50 rounded-2xl p-4">
              <ProfileItem
                icon="HelpCircle"
                title="Help & Support"
                onPress={() => console.log("Help & Support")}
              />
              <ProfileItem
                icon="MessageCircle"
                title="Contact Us"
                onPress={() => console.log("Contact us")}
              />
              <ProfileItem
                icon="Star"
                title="Rate App"
                onPress={() => console.log("Rate app")}
              />
              <ProfileItem
                icon="FileText"
                title="Privacy Policy"
                onPress={() => console.log("Privacy policy")}
              />
              <ProfileItem
                icon="Shield"
                title="Terms of Service"
                onPress={() => console.log("Terms of service")}
              />
            </View>
          </View>

          {/* Sign Out Section */}
          <View className="px-8 pb-8">
            <TouchableOpacity
              onPress={confirmSignOut}
              className="bg-red-50 border border-red-200 rounded-2xl p-4 flex-row items-center justify-center"
            >
              <Icon name="LogOut" size={20} color="#EF4444" />
              <Text className="text-red-500 font-bold ml-2 text-lg">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
