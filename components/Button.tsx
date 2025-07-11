import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: size === "small" ? 16 : size === "large" ? 24 : 20,
      paddingHorizontal: size === "small" ? 16 : size === "large" ? 24 : 20,
      paddingVertical: size === "small" ? 8 : size === "large" ? 16 : 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      minHeight: size === "small" ? 32 : size === "large" ? 48 : 40,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textTertiary : colors.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceSecondary,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case "danger":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textTertiary : colors.danger,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: size === "small" ? 14 : size === "large" ? 18 : 16,
      fontWeight: "600" as const,
    };

    switch (variant) {
      case "primary":
      case "danger":
        return {
          ...baseStyle,
          color: "#FFFFFF",
        };
      case "secondary":
        return {
          ...baseStyle,
          color: colors.text,
        };
      case "ghost":
        return {
          ...baseStyle,
          color: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
