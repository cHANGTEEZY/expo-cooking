import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type CustomInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  style?: object;
  inputStyle?: object;
  onBlur?: () => void;
};

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  iconName,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  error,
  style,
  inputStyle,
  onBlur,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color="#666"
            style={styles.icon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={"#999"}
          autoCapitalize="none"
          secureTextEntry={showPassword}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          style={[styles.input, inputStyle, multiline && styles.multiline]}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              // color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  focused: {
    borderColor: "#007bff",
  },
  errorBorder: {
    borderColor: "#ff0000",
  },
  icon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 18,
    color: "#333",
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: 14,
    color: "#ff0000",
    marginTop: 5,
  },
});

export default CustomInput;
