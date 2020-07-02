import React from "react";
import ContentLoader from "react-content-loader";

export const ListLoader = () => (
  <ContentLoader height={300} width="100%" speed={3}>
    <rect x="0" y="0" width="100%" height="40" rx="4" ry="4" />
    <rect x="0" y="50" width="100%" height="40" rx="4" ry="4" />
    <rect x="0" y="100" width="100%" height="40" rx="4" ry="4" />
    <rect x="0" y="150" width="100%" height="40" rx="4" ry="4" />
    <rect x="0" y="200" width="100%" height="40" rx="4" ry="4" />
  </ContentLoader>
);
