import styled from "styled-components";
import { darken, lighten } from "polished";

export const withOpacity = (percent, color) => {
  if (percent >= 0 && percent <= 100) {
    let hex = Math.ceil(Number((percent / 100) * 255))
      .toString(16)
      .toUpperCase();
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    return color + hex;
  }
  return `${color}FF`;
};

export const getContrastColor = (hexcolor) => {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? colors.darker : colors.lighter;
};

export const sizes = {
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
};

export const devices = {
  sm: `(min-width: ${sizes.sm})`,
  md: `(min-width: ${sizes.md})`,
  lg: `(min-width: ${sizes.lg})`,
  xl: `(min-width: ${sizes.xl})`,
};

export const colors = {
  light: "#ECECEC",
  lighter: "#FFFFFF",
  dark: "#313133",
  darker: "#1D1D1F",
  primary: "#5452D9",
  secondary: "#1D1D1F",
  option: "#60a5fa",
  alert: "#E73552",
  warning: "#FFD330",
  success: "#4BB37D",
};

export const lightTheme = {
  devices,
  colors: {
    ...colors,
    header: {
      background: colors.primary,
      color: colors.lighter,
    },
    body: {
      background: "#E9E9E9",
      color: colors.dark,
    },
    divider: "#1D1D1F80",
    button: {
      primary: {
        background: colors.primary,
        backgroundHover: darken(0.1, colors.primary),
        backgroundDisabled: lighten(0.3, colors.primary),
        color: colors.lighter,
      },
      secondary: {
        background: colors.darker,
        backgroundHover: lighten(0.1, colors.darker),
        backgroundDisabled: lighten(0.6, colors.darker),
        color: colors.lighter,
      },
      alert: {
        background: colors.alert,
        backgroundHover: darken(0.1, colors.alert),
        backgroundDisabled: lighten(0.3, colors.alert),
        color: colors.lighter,
      },
      warning: {
        background: colors.warning,
        backgroundHover: darken(0.1, colors.warning),
        backgroundDisabled: lighten(0.3, colors.warning),
        color: colors.lighter,
      },
      success: {
        background: colors.success,
        backgroundHover: darken(0.1, colors.success),
        backgroundDisabled: lighten(0.3, colors.success),
        color: colors.lighter,
      },
    },
    input: {
      background: colors.light,
      labelBackground: withOpacity(10, colors.darker),
      color: colors.darker,
      outline: withOpacity(75, colors.darker),
    },
    checkbox: {
      uncheckedBackground: colors.light,
      checkedBackground: colors.secondary,
    },
    collapse: {
      background: colors.light,
      color: colors.darker,
      divider: withOpacity(10, colors.darker),
    },
    card: {
      background: colors.lighter,
      color: colors.darker,
    },
    select: {
      background: colors.light,
      labelBackground: withOpacity(10, colors.darker),
      color: colors.darker,
      outline: withOpacity(75, colors.darker),
    },

    // Specific components
    subscription: {
      card: {
        background: colors.lighter,
        title: {
          background: colors.darker,
          color: colors.lighter,
        },
        creditCard: {
          defaultBackground: colors.secondary,
          defaultNumberBackground: colors.dark,
          color: colors.lighter,
        },
      },
      listItem: {
        hoverBackground: withOpacity(3, colors.darker),
        border: withOpacity(5, colors.darker),
      },
    },
    tag: {
      background: withOpacity(10, colors.dark),
      color: colors.dark,
    },
    creditCard: {
      background: colors.light,
      editBackground: withOpacity(5, colors.dark),
      color: colors.dark,
    },
    optionsMenu: {
      trigger: {
        hoverBackground: withOpacity(5, colors.dark),
      },
      menu: {
        background: colors.dark,
        color: colors.lighter,
      },
      item: {
        backgroundHover: withOpacity(5, colors.lighter),
      },
    },
    modal: {
      backdropBackground: withOpacity(80, colors.darker),
      background: colors.lighter,
      hoverBackground: withOpacity(5, colors.dark),
    },
    summary: {
      item: {
        background: colors.light,
      },
      creditCard: {
        defaultBackground: colors.dark,
        defaultNumberBackground: colors.dark,
        color: colors.lighter,
      },
    },
  },
};

export const darkTheme = {
  devices,
  colors: {
    ...colors,
    header: {
      background: colors.darker,
      color: colors.lighter,
    },
    body: {
      background: "#3D3D3F",
      color: colors.lighter,
    },
    divider: "#E2E2E280",
    button: {
      primary: {
        background: colors.primary,
        backgroundHover: darken(0.1, colors.primary),
        backgroundDisabled: lighten(0.2, colors.primary),
        color: colors.lighter,
      },
      secondary: {
        background: colors.lighter,
        backgroundHover: darken(0.1, colors.lighter),
        backgroundDisabled: darken(0.2, colors.lighter),
        color: colors.darker,
      },
      alert: {
        background: colors.alert,
        backgroundHover: darken(0.1, colors.alert),
        backgroundDisabled: lighten(0.3, colors.alert),
        color: colors.lighter,
      },
      warning: {
        background: colors.warning,
        backgroundHover: darken(0.1, colors.warning),
        backgroundDisabled: lighten(0.3, colors.warning),
        color: colors.lighter,
      },
      success: {
        background: colors.success,
        backgroundHover: darken(0.1, colors.success),
        backgroundDisabled: lighten(0.3, colors.success),
        color: colors.lighter,
      },
    },
    input: {
      background: colors.darker,
      labelBackground: withOpacity(5, colors.lighter),
      color: colors.lighter,
      outline: withOpacity(25, colors.lighter),
    },
    checkbox: {
      uncheckedBackground: colors.light,
      checkedBackground: colors.secondary,
    },
    collapse: {
      background: colors.darker,
      color: colors.lighter,
      divider: withOpacity(20, colors.lighter),
    },
    card: {
      background: colors.dark,
      color: colors.light,
    },
    select: {
      background: colors.darker,
      labelBackground: withOpacity(5, colors.lighter),
      color: colors.lighter,
      outline: withOpacity(25, colors.lighter),
    },

    // Specific components
    subscription: {
      card: {
        background: colors.darker,
        title: {
          background: colors.lighter,
          color: colors.dark,
        },
        creditCard: {
          defaultBackground: colors.lighter,
          defaultNumberBackground: colors.dark,
          color: colors.darker,
        },
      },
      listItem: {
        hoverBackground: withOpacity(3, colors.lighter),
        border: withOpacity(3, colors.lighter),
      },
    },
    tag: {
      background: withOpacity(10, colors.light),
      color: colors.light,
    },
    creditCard: {
      background: colors.darker,
      editBackground: withOpacity(10, colors.light),
      color: colors.light,
    },
    optionsMenu: {
      trigger: {
        hoverBackground: withOpacity(10, colors.light),
      },
      menu: {
        background: colors.lighter,
        color: colors.darker,
      },
      item: {
        backgroundHover: withOpacity(5, colors.darker),
      },
    },
    modal: {
      backdropBackground: withOpacity(80, colors.darker),
      background: colors.dark,
      hoverBackground: withOpacity(10, colors.darker),
    },
    summary: {
      item: {
        background: colors.darker,
      },
      creditCard: {
        defaultBackground: colors.lighter,
        defaultNumberBackground: colors.dark,
        color: colors.darker,
      },
    },
  },
};

export const Container = styled.div`
  display: ${(props) => (props.hidden ? "none" : "block")};
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  width: 100%;

  @media ${devices.sm} {
    max-width: 600px;
  }

  @media ${devices.md} {
    max-width: 960px;
  }

  @media ${devices.lg} {
    max-width: 1280px;
  }
`;

const StyledFlex = styled.div`
  display: flex;

  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  gap: ${(props) => props.gap};
  padding: ${(props) =>
    typeof props.p === "number" ? `${props.p}rem` : props.p?.map((p) => `${p}rem`).join(" ")};
  margin: ${(props) =>
    typeof props.m === "number" ? `${props.m}rem` : props.m?.map((m) => `${m}rem`).join(" ")};

  & + & {
    margin-top: 1rem;
  }
`;

export const Flex = (props) => <StyledFlex {...props} />;

export const Icon = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
})``;

export const Svg = styled(Icon)`
  stroke: ${(props) => props.theme.colors.collapse.color};
`;

export const Card = styled.div`
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.card.background};
  color: ${(props) => props.theme.colors.card.color};
`;
