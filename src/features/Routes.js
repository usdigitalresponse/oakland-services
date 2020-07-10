import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { PageLayout } from "components/Page";
import { Spinner } from "components/Spinner";

import { CategoriesPage } from "./categories/CategoriesPage";
import { ResourceListPage } from "./resources/ResourceListPage";
import { ResourcePage } from "./resources/ResourcePage";
import { AboutPage } from "./about/AboutPage";
import { PrivacyPage } from "./about/PrivacyPage";
import { TermsPage } from "./about/TermsPage";
import { Error } from "./misc/Error";

import { useTracking } from "utils/useTracking";

export const Routes = () => {
  useTracking("UA-172308259-1");
  return (
    <Suspense
      fallback={
        <SpinnerContainer>
          <Spinner loading />
        </SpinnerContainer>
      }
    >
      <Switch>
        <Route exact path="/">
          <PageLayout>
            <CategoriesPage />
          </PageLayout>
        </Route>
        <Route exact path="/category/:categoryId">
          <PageLayout>
            <ResourceListPage />
          </PageLayout>
        </Route>
        <Route exact path="/resource/:resourceId">
          <PageLayout>
            <ResourcePage />
          </PageLayout>
        </Route>
        <Route path="/about">
          <PageLayout>
            <AboutPage />
          </PageLayout>
        </Route>
        <Route path="/privacy">
          <PageLayout>
            <PrivacyPage />
          </PageLayout>
        </Route>
        <Route path="/terms">
          <PageLayout>
            <TermsPage />
          </PageLayout>
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Suspense>
  );
};

const SpinnerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
`;
