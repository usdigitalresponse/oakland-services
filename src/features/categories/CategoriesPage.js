import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Heading, Heading2, Text } from "components/Text";
import { Button } from "components/Button";
import { ListLoader } from "components/Loader";

export const CategoriesPage = () => {
  const { t } = useTranslation();
  const { data } = useSWR("/api/featured-categories");

  return (
    <section>
      <CategoriesHeader>
        <Heading>{t("categories.title")}</Heading>
        <Text>{t("categories.description")}</Text>
      </CategoriesHeader>
      <CategoriesSection>
        <Heading2>{t("categories.speakTitle")}</Heading2>
        <CategoriesSectionItemsContainer>
          <CategoryLink as="a" href="tel:+1-211">
            Call 2-1-1
          </CategoryLink>
          <CategoryLink as="a" href="sms:898211">
            Text 898211
          </CategoryLink>
        </CategoriesSectionItemsContainer>
      </CategoriesSection>
      {!data ? (
        <ListLoader />
      ) : (
        <CategoriesSection>
          <Heading2>{t("categories.categoriesTitle")}</Heading2>
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

const CategoriesHeader = styled.header`
  h1 {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacings(1)};
    font-weight: normal;
  }
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;

const CategoriesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacings(4)};
  }
`;

const CategoriesSectionItemsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacings(4)};
`;

const CategoryLink = styled(Button)`
  max-width: 360px;
  width: 100%;
  height: 88px;
`;
