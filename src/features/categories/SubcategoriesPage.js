import React from "react";
import useSWR from "swr";
import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Heading, Heading3, Text } from "components/Text";
import { ListLoader } from "components/Loader";
import {
  CategoriesHeader,
  CategoriesSection,
  CategoryLink,
  CategoriesSectionItemsContainer,
} from "./CategoriesPage";

export const SubcategoriesPage = () => {
  const location = useLocation();
  const { categoryId } = useParams();
  const { t } = useTranslation();
  const { data } = useSWR(`/api/categories/${categoryId}/subcategories`);
  const { categoryName } = queryString.parse(location.search);

  return (
    <section>
      <CategoriesHeader>
        <Heading>{categoryName}</Heading>
        <Text>{t("categories.description")}</Text>
      </CategoriesHeader>
      {!data ? (
        <ListLoader />
      ) : (
        <CategoriesSection>
          <Heading3>{t("categories.categoriesTitle")}</Heading3>
          <CategoriesSectionItemsContainer>
            {data.map((c) => (
              <CategoryLink
                as={Link}
                key={c.id}
                to={`/category/${c.id}?categoryName=${c.name}`}
              >
                {c.preferred_name ?? c.name}
              </CategoryLink>
            ))}
          </CategoriesSectionItemsContainer>
        </CategoriesSection>
      )}
    </section>
  );
};
