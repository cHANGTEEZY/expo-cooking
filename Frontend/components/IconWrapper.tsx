import * as Icons from "lucide-react-native";
import React from "react";
import { View, ViewStyle } from "react-native";

type IconProps = {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  className?: string;
  style?: ViewStyle;
};

const Icon = ({
  name,
  size = 24,
  color = "#000",
  className,
  style,
}: IconProps) => {
  const LucideIcon = Icons[name];

  if (
    !LucideIcon ||
    (typeof LucideIcon !== "function" && typeof LucideIcon !== "object")
  ) {
    console.warn(
      `Icon "${name}" does not exist in lucide-react-native or is not a valid component`
    );
    return null;
  }

  return (
    <View className="bg-white p-2 rounded-l-[16px] rounded-r-[16px]">
      <LucideIcon
        size={size}
        color={color}
        className={className}
        style={style}
      />
    </View>
  );
};

export default Icon;
