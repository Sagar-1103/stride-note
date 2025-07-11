import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const sizeValue = size === "small" ? 32 : size === "large" ? 56 : 44;
    const baseStyle = {
      width: sizeValue,
      height: sizeValue,
      borderRadius: sizeValue / 2,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textTertiary : colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
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

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};
