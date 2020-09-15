import React from "react";
import useSWR from "swr";
import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Heading, Heading2, Text } from "components/Text";
import { Container } from "components/Page";
import { ListLoader } from "components/Loader";
import {
  CategoriesHeader,
  CategoriesSection,
  CategoryLink,
  CategoriesSectionItemsContainer,
  FeedbackSection,
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
        <Container>
          <Heading>{categoryName}</Heading>
          <Text>
            {t("subcategories.description")} {categoryName}{" "}
            {t("subcategories.description2")}
          </Text>
        </Container>
      </CategoriesHeader>
      {!data ? (
        <ListLoader />
      ) : (
        <CategoriesSection>
          <Heading2>{t("subcategories.categoriesTitle")}</Heading2>
          <CategoriesSectionItemsContainer>
            {data.map((c) => (
              <CategoryLink
                as={Link}
                key={c.id}
                to={`/category/${c.id}?categoryName=${c.name}`}
              >
                <img src={`/assets/category-icons/${c.id}`} />
                {c.preferred_name ?? c.name}
              </CategoryLink>
            ))}
          </CategoriesSectionItemsContainer>
        </CategoriesSection>
      )}
      <FeedbackSection t={t} />
    </section>
  );
};
