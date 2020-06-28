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
  <Suspense fallback="loading">
    <Switch>
      <Route exact path="/">
        <PageLayout>
          <CategoriesPage />
        </PageLayout>
      </Route>
      <Route exact path="/category/:slug">
        <PageLayout>
          <ServicesListPage />
        </PageLayout>
      </Route>
      <Route exact path="/service/:id">
        <PageLayout>
          <ServicePage />
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
