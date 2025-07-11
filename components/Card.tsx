import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "default",
}) => {
  const { colors } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
    };

    switch (variant) {
      case "elevated":
        return {
          ...baseStyle,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        };
      case "outlined":
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return {
          ...baseStyle,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        };
    }
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};
