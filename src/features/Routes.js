import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PageLayout } from "components/Page";

import { CategoriesPage } from "./categories/CategoriesPage";
import { ServicesListPage } from "./services/ServicesListPage";
import { ServicePage } from "./services/ServicePage";
import { AboutPage } from "./about/AboutPage";
import { PrivacyPage } from "./about/PrivacyPage";
import { TermsPage } from "./about/TermsPage";
import { Error } from "./misc/Error";

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Suspense fallback="loading">
        <PageLayout>
          <CategoriesPage />
        </PageLayout>
      </Suspense>
    </Route>
    <Route exact path="/category/:slug">
      <Suspense fallback="loading">
        <PageLayout>
          <ServicesListPage />
        </PageLayout>
      </Suspense>
    </Route>
    <Route exact path="/service/:id">
      <Suspense fallback="loading">
        <PageLayout>
          <ServicePage />
        </PageLayout>
      </Suspense>
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
);
