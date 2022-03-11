import styled from "styled-components";
import { darken, lighten } from "polished";

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

const withOpacity = (percent, color) => {
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

export const colors = {
  light: "#ECECEC",
  lighter: "#FFFFFF",
  dark: "#313133",
  darker: "#1D1D1F",
  primary: "#5452D9",
  secondary: "#1D1D1F",
  alert: "#E73552",
  warning: "#FFD330",
  success: "#4BB37D",
};

export const lightTheme = {
  colors: {
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
      color: colors.darker,
      outline: withOpacity(75, colors.darker),
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
  },
};

export const darkTheme = {
  colors: {
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
      color: colors.lighter,
      outline: withOpacity(75, colors.lighter),
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
  },
};

export const Container = styled.div`
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
  padding: 2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.card.background};
  color: ${(props) => props.theme.colors.card.color};
  /* box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1); */
`;
