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
  teal: "#28A0CB",
  tealDark: "#2188ac",
  orange: "#E26A08",
  orangeDark: "#C05A06",
  green: "#0A9143",
  greenDark: "#087b38",
  // Semantic colors
  primaryDarker: "#162E51",
  primaryDark: "#1A4480",
  primary: "#005EA2",
  primaryLight: "#73B3E7",
  primaryLighter: "#D9E8F6",
  secondaryDarker: "#8B0A03",
  secondaryDark: "#B50909",
  secondary: "#D83933",
  secondaryLight: "#F2938C",
  secondaryLighter: "#F8DFE2",
  accentCoolDarker: "#07648D",
  accentCoolDark: "#28A0CB",
  accentCool: "#00BDE3",
  accentCoolLight: "#97D4EA",
  accentCoolLighter: "#E1F3F8",
  accentWarmDarker: "#775540",
  accentWarmDark: "#C05600",
  accentWarm: "#FA9441",
  accentWarmLight: "#FFBC78",
  accentWarmLighter: "#F2E4D4",
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
      background: colors.primaryDark,
    },
    button: {
      primary: {
        color: colors.white,
        background: colors.primary,
        hover: {
          background: colors.primaryDark,
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
