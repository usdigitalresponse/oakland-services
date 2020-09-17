import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Heading, Heading2, Text } from "components/Text";
import { Container } from "components/Page";
import { BlockLoader } from "components/Loader";
import { Feedback } from "components/Feedback";
import { useQueryParams } from "utils/useQueryParams";
import {
  CategoriesHeader,
  CategoriesSection,
  CategoryLink,
  CategoriesSectionItemsContainer,
} from "./CategoriesPage";

export const SubcategoriesPage = () => {
  const { categoryId } = useParams();
  const { t } = useTranslation();
  const { data } = useSWR(`/api/categories/${categoryId}/subcategories`);
  const { categoryName } = useQueryParams();

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
      <CategoriesSection>
        <Heading2>{t("subcategories.categoriesTitle")}</Heading2>
        {!data ? (
          <BlockLoader />
        ) : (
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
        )}
      </CategoriesSection>
      <Feedback />
    </section>
  );
};
