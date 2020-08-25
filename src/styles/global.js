import styledNormalize from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    color: ${({ theme }) => theme.ui.text};
    text-rendering: optimizeLegibility;
    font-family: 'HelveticaNow', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    letter-spacing: -0.2px;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: 0.2s ease;
  }

  /* Remove button styling */
  button,
  input[type='submit'],
  input[type='reset'] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${({ theme }) => theme.spacings(3)};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacings(2)};
  }

  ul, li {
    margin: 0;
  }

  .sr-only {
    position: absolute;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    overflow: hidden;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }

  [hidden] {
    display: none !important;
  }
`;
