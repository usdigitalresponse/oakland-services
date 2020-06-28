import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Text } from "components/Text";
import { Button } from "components/Button";

const categories = [
  { id: 0, title: "A place to sleep tonight", slug: "shelters" },
  { id: 1, title: "Healthcare", slug: "healthcare" },
  { id: 2, title: "Food to eat", slug: "food" },
  { id: 4, title: "Mental health support", slug: "mental" },
  { id: 5, title: "A place to detox", slug: "shelters" },
  { id: 6, title: "Something else", slug: "other" },
];

export const CategoriesPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <CategoriesHeader>
        <Text>{t("home.description1")}</Text>
        <Text>{t("home.description2")}</Text>
      </CategoriesHeader>
      {categories.map((c) => (
        <CategoryLink as={Link} key={c.id} to={`/category/${c.slug}`}>
          {c.title}
        </CategoryLink>
      ))}
    </section>
  );
};

const CategoriesHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;

const CategoryLink = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacings(2)};
`;
