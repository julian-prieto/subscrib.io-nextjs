import React from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { Icon } from "./styled";
import { useUserPreferences } from "hooks";

const ThemeSwitch = (props) => {
  const { theme, toggleTheme } = useUserPreferences();
  const isDark = theme === "dark";

  return (
    <Icon {...props} onClick={() => toggleTheme()}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Icon>
  );
};

export default ThemeSwitch;
