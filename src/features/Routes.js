import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageLayout } from "components/Page";

import { ServiceCategoriesPage } from "./categories/ServiceCategoriesPage";
import { AboutPage } from "./about/AboutPage";
import { PrivacyPage } from "./about/PrivacyPage";
import { TermsPage } from "./about/TermsPage";
import { Error } from "./misc/Error";

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PageLayout>
        <ServiceCategoriesPage />
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
);
