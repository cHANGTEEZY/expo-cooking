import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type CustomButtonProps = {
  isGradient?: boolean;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  backgroundColor?: string; // for non-gradient
  buttonText?: string;
  handlePress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  children?: React.ReactNode; // render custom children if needed
  style?: ViewStyle;
};

const CustomButton = ({
  isGradient = true,
  firstColor = "#4A00E0",
  secondColor = "#8E2DE2",
  thirdColor = "#9B4DFF",
  backgroundColor = "#4A00E0",
  buttonText,
  handlePress,
  icon,
  children,
  style,
}: CustomButtonProps) => {
  const ButtonContent = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[styles.button, style]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
      )}
      {children ? children : <Text style={styles.text}>{buttonText}</Text>}
    </TouchableOpacity>
  );

  if (isGradient) {
    return (
      <LinearGradient
        colors={[firstColor, secondColor, thirdColor]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <ButtonContent />
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.nonGradient, { backgroundColor }]}>
      <ButtonContent />
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
  },
  nonGradient: {
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});

export default CustomButton;
