import React from "react";
import ReactDOM from "react-dom";
import { debounce } from "lodash";
import * as serviceWorker from "./serviceWorker";
import "./i18n";

// resize listeners
const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
const debouncedResize = debounce(onResize, 100);
window.addEventListener("resize", debouncedResize);
onResize();

// render react app
const render = () => {
  const { App } = require("./features/App");
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./features/App", render);
}

serviceWorker.unregister();
