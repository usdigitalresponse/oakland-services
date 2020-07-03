import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import i18n from "i18next";

import { ErrorBoundary } from "./misc/ErrorBoundary";
import { Routes } from "./Routes";
import { GlobalStyle } from "styles/global";
import { lightTheme } from "styles/theme";

export const App = () => (
  <ThemeProvider theme={lightTheme}>
    <SWRConfig
      value={{
        fetcher: (url, params) =>
          fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": i18n.language,
            },
            ...params,
          }).then((res) => res.json()),
      }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </SWRConfig>
  </ThemeProvider>
);
