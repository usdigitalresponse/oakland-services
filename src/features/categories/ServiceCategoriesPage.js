import React from "react";
import { useTranslation } from "react-i18next";

export const ServiceCategoriesPage = () => {
  const { t } = useTranslation();
  return <h1>{t("Welcome to React")}</h1>;
};
