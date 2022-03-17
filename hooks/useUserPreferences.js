import { useContext, useEffect } from "react";
import { AppContext } from "context";
import { useStateWithStorage } from "hooks";
import { ACTIONS } from "context";

const useUserPreferences = () => {
  const {
    state: { userPreferences },
    dispatch,
  } = useContext(AppContext);

  /*********************************
   *  PREFERENCES: THEME           *
   *********************************/
  const [storageTheme, setStorageTheme] = useStateWithStorage("theme");

  const toggleTheme = () => {
    const newTheme = userPreferences.theme === "light" ? "dark" : "light";
    dispatch({ type: ACTIONS.CHANGE_THEME, payload: newTheme });
    setStorageTheme(newTheme);
  };

  useEffect(() => {
    const colorSchema = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (!storageTheme) {
        dispatch({ type: ACTIONS.CHANGE_THEME, payload: newColorScheme });
      }
    };

    if (typeof window !== "undefined") {
      const systemTheme = colorSchema.matches ? "dark" : "light";
      dispatch({ type: ACTIONS.CHANGE_THEME, payload: storageTheme ? storageTheme : systemTheme });
      colorSchema.addEventListener("change", handleSystemThemeChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        colorSchema.removeEventListener("change", handleSystemThemeChange);
      }
    };
  }, [storageTheme, dispatch]);

  /*********************************
   *  PREFERENCES: CURRENCY        *
   *********************************/
  const setPreferredCurrency = (currency) => {
    dispatch({ type: ACTIONS.CHANGE_PREFERRED_CURRENCY, payload: currency });
  };

  return {
    theme: userPreferences.theme,
    preferredCurrency: userPreferences.preferredCurrency,
    toggleTheme,
    setPreferredCurrency,
  };
};

export default useUserPreferences;
