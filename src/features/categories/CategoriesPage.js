import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { ListLoader } from "components/Loader";

export const CategoriesPage = () => {
  const { t } = useTranslation();
  const { data } = useSWR("/api/featured-categories");

  return (
    <section>
      <CategoriesHeader>
        <Text>{t("home.description1")}</Text>
        <Text>{t("home.description2")}</Text>
      </CategoriesHeader>
      {!data ? (
        <ListLoader />
      ) : (
        <CategoriesBody>
          {data.map((c) => (
            <CategoryLink
              as={Link}
              key={c.id}
              to={`/category/${c.name}/${c.id}`}
            >
              {c.preferred_name ?? c.name}
            </CategoryLink>
          ))}
        </CategoriesBody>
      )}
    </section>
  );
};

const CategoriesHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;

const CategoriesBody = styled.section`
  display: flex;
  flex-direction: column;
`;

const CategoryLink = styled(Button)`
  width: 100%;
  max-width: 360px;
  margin-bottom: ${({ theme }) => theme.spacings(2)};
`;
