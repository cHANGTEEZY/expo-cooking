import React from "react";
import { Text, View } from "react-native";

type DividerProps = {
  dividerText: string;
  lineColor?: string;
  textColor?: string;
  style?: object;
};

const Divider = ({
  dividerText,
  lineColor = "#CBD5E1", // slate-300
  textColor = "#eeeeee", //white hex
  style = {},
}: DividerProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
      <Text
        style={{
          marginHorizontal: 8,
          color: textColor,
          fontWeight: "500",
        }}
      >
        {dividerText}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
    </View>
  );
};

export default Divider;
