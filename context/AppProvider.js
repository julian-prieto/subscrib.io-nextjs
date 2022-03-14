import { useEffect, useState } from "react";
import { useStateWithStorage } from "hooks";
import { AppContext } from "context/AppContext";

export const AppProvider = ({ children }) => {
  const [storageTheme, setStorageTheme] = useStateWithStorage("theme");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Keep theme synchronized with LocalStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setStorageTheme(newTheme);
  };

  const setUserOnAuthChange = (user) => setUser(user);

  useEffect(() => {
    if (storageTheme) {
      setTheme(storageTheme);
    }
  }, []);

  useEffect(() => {
    const colorSchema = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (!storageTheme) {
        setTheme(newColorScheme);
      }
    };

    if (typeof window !== "undefined") {
      const systemTheme = colorSchema.matches ? "dark" : "light";
      setTheme(storageTheme ? storageTheme : systemTheme);
      colorSchema.addEventListener("change", handleSystemThemeChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        colorSchema.removeEventListener("change", handleSystemThemeChange);
      }
    };
  }, [storageTheme]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUserOnAuthChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
