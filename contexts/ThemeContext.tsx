import { Colors, ColorScheme } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: typeof Colors.light;
  toggleColorScheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const THEME_KEY = "theme_preference";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    systemColorScheme || "light"
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
          setColorScheme(savedTheme);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleColorScheme = async () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
    try {
      await AsyncStorage.setItem(THEME_KEY, newScheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <ThemeContext.Provider
      value={{ colorScheme, colors, toggleColorScheme, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
