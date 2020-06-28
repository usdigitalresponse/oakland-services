import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import { ErrorBoundary } from "./misc/ErrorBoundary";
import { Routes } from "./Routes";
import { GlobalStyle } from "styles/global";
import { lightTheme } from "styles/theme";

export const App = () => (
  <ThemeProvider theme={lightTheme}>
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
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
