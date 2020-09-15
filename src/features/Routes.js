import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { PageLayout, Container } from "components/Page";
import { Spinner } from "components/Spinner";
import { ScrollToTop } from "components/ScrollToTop";

import { CategoriesPage } from "./categories/CategoriesPage";
import { SubcategoriesPage } from "./categories/SubcategoriesPage";
import { ResourceListPage } from "./resources/ResourceListPage";
import { ResourcePage } from "./resources/ResourcePage";
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
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <PageLayout>
            <CategoriesPage />
          </PageLayout>
        </Route>
        <Route exact path="/category/:categoryId/subcategories">
          <PageLayout>
            <SubcategoriesPage />
          </PageLayout>
        </Route>
        <Route exact path="/category/:categoryId">
          <PageLayout>
            <ResourceListPage />
          </PageLayout>
        </Route>
        <Route exact path="/resource/:resourceId">
          <PageLayout>
            <Container>
              <ResourcePage />
            </Container>
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
