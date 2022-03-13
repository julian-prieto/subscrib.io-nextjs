import { useEffect, useState } from "react";
import { useStateWithStorage } from "hooks";
import { AppContext } from "context/AppContext";

export const AppProvider = ({ children }) => {
  const [storageTheme, setStorageTheme] = useStateWithStorage("theme", "dark");
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
    setTheme(storageTheme);
  }, []);

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
