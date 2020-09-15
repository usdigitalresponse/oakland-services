import { css } from "styled-components";
import { memoize } from "lodash";

const SPACING_UNIT = 4;
const calculateSpacing = (n) => {
  return `${n * SPACING_UNIT}px`;
};

export const colors = {
  black: "#000000",
  grayDarkest: "#0C0C0C",
  grayMedDark: "#4F4F4F",
  grayMed: "#828282",
  grayMedLight: "#BDBDBD",
  grayLight: "#E0E0E0",
  grayLightest: "#F2F2F2",
  white: "#FFFFFF",
  blue: "#1A75E0",
  purple: "#681AB0",
  red: "#C91919",
  teal: "#28A0CB",
  tealLight: "#42BAE5",
  orange: "#E26A08",
  orangeLight: "#FC8422",
  green: "#0A9143",
  greenLight: "#24AB5D",
  // Semantic colors
  primary: "#005EA2",
  secondary: "#1A4480",
  highlight: "#C1FED2",
};

const breakpointsMap = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const breakpoints = Object.keys(breakpointsMap).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpointsMap[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const lightTheme = {
  colors,
  breakpoints,
  typography: {
    h1: {
      fontSize: "28px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 700,
    },
    h4: {
      fontSize: "18px",
      fontWeight: 700,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 700,
    },
    text: {
      fontSize: "16px",
      lineHeight: "20px",
    },
  },
  spacings: memoize(calculateSpacing),
  ui: {
    maxWidth: `${breakpointsMap.md}px`,
    text: colors.black,
    background: colors.white,
    border: colors.grayLight,
    navigation: {
      text: colors.white,
      background: colors.secondary,
    },
    button: {
      primary: {
        color: colors.white,
        background: colors.primary,
        hover: {
          background: colors.blue,
        },
        disabled: {
          background: colors.grayMedLight,
        },
      },
      link: {
        hover: {
          background: colors.grayLight,
        },
      },
    },
  },
};
