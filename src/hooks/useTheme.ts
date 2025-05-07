import { getThemeById } from "@/lib/themes";
import { useState } from "react";

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return userData.theme || "default";
      }
    }
    return "default";
  });

  const updateTheme = (theme: string) => {
    setCurrentTheme(theme);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = { ...userData, theme };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return {
    currentTheme,
    updateTheme,
    theme: getThemeById(currentTheme),
  };
}
