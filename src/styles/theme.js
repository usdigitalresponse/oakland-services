import { css } from "styled-components";
import { memoize } from "lodash";

const SPACING_UNIT = 4;
const calculateSpacing = (n) => {
  return `${n * SPACING_UNIT}px`;
};

export const colors = {
  black: "#000000",
  grayDarkest: "#323232",
  grayMedDark: "#676666",
  grayMed: "#9F9F9F",
  grayMedLight: "#CCCBCB",
  grayLight: "#E7E7E7",
  grayLightest: "#F0F0F0",
  white: "#FFFFFF",
  teal: "#28A0CB",
  tealDark: "#2188ac",
  orange: "#E26A08",
  orangeDark: "#C05A06",
  green: "#0A9143",
  greenDark: "#087b38",
  // Semantic colors
  primaryDarker: "#792161",
  primaryDark: "#922A75",
  primary: "#AD3A8D",
  primaryLight: "#D478BB",
  primaryLighter: "#F6E0F0",
  secondaryDarker: "#43267D",
  secondaryDark: "#523097",
  secondary: "#6039AE",
  secondaryLight: "#9970ED",
  secondaryLighter: "#EBE0FF",
  accentCoolDarker: "#097964",
  accentCoolDark: "#0C8D75",
  accentCool: "#2FCCAF",
  accentCoolLight: "#83EDD9",
  accentCoolLighter: "#CEF6EF",
  accentWarmDarker: "#125F7A",
  accentWarmDark: "#2089AF",
  accentWarm: "#32B2E0",
  accentWarmLight: "#8CD6F1",
  accentWarmLighter: "#C4ECFB",
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
      backgroundHeader: colors.grayLightest,
      text: colors.white,
      backgroundFooter: colors.secondaryDarker,
    },
    button: {
      primary: {
        color: colors.grayDarkest,
        background: colors.white,
        hover: {
          background: colors.grayLight,
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
