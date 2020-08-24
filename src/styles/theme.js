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
  orange: "#E17617",
  green: "#0A9143",
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
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    post: {
      fontSize: "1.2rem",
      lineHeight: "32px",
    },
  },
  spacings: memoize(calculateSpacing),
  ui: {
    maxWidth: `${breakpointsMap.md}px`,
    text: colors.black,
    background: colors.white,
    border: colors.grayLight,
    button: {
      primary: {
        color: colors.white,
        background: colors.primary,
        hover: {
          background: colors.secondary,
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
