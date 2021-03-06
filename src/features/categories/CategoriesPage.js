import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useQueryParams } from "utils/useQueryParams";
import { Link } from "react-router-dom";
import { Heading, Heading2, Text } from "components/Text";
import { Container } from "components/Page";
import { Button } from "components/Button";
import { BlockLoader } from "components/Loader";
import { Feedback } from "components/Feedback";

export const CategoriesPage = () => {
  const { t } = useTranslation();
  const { data } = useSWR("/api/categories");
  const { debug } = useQueryParams();
  return (
    <section>
      <CategoriesHeader>
        <Container>
          <Heading>{t("categories.title")}</Heading>
          <Text>{t("categories.description")}</Text>
        </Container>
      </CategoriesHeader>
      <CategoriesSection>
        <Heading2>{t("categories.speakTitle")}</Heading2>
        <ActionItemsContainer>
          <CallButton
            as="a"
            href="tel:+1-211"
            size="small"
            bgColor="accentCoolDark"
          >
            <img src="/assets/call-icon.svg" alt="Call 2-1-1" />
            Call 2-1-1
          </CallButton>
          <CallButton
            as="a"
            href="sms:898211"
            size="small"
            bgColor="accentCoolDark"
          >
            <img src="/assets/text-icon.svg" alt="Text 898211" />
            Text 898211
          </CallButton>
        </ActionItemsContainer>
      </CategoriesSection>
      <CategoriesResources>
        <Container>
          <Heading2>{t("categories.categoriesTitle")}</Heading2>
          {!data ? (
            <BlockLoader />
          ) : (
            <CategoriesSectionItemsContainer>
              {data.map((c) => (
                <CategoryLink
                  as={Link}
                  key={c.id}
                  to={`/category/${c.id}/subcategories?categoryName=${c.name}`}
                >
                  <img src={`/assets/category-icons/${c.external_id}.svg`} />
                  {c.preferred_name ?? c.name}
                  {!!debug && <span>[{c.external_id}]</span>}
                </CategoryLink>
              ))}
            </CategoriesSectionItemsContainer>
          )}
        </Container>
      </CategoriesResources>
      <Feedback />
      <CategoriesSection>
        <Heading2>{t("categories.aboutTitle")}</Heading2>
        <Text>{t("categories.aboutContent")}</Text>
      </CategoriesSection>
      <CategoriesSection>
        <Heading2>{t("categories.byTitle")}</Heading2>
        <Text>{t("categories.byContent")}</Text>
        <LogoContainer>
          <img src="/assets/logos/oakland.svg" alt="City of Oakland" />
          <img src="/assets/logos/alameda.svg" alt="County of Alemeda" />
          <img src="/assets/logos/eden.svg" alt="Eden I&R" />
          <img src="/assets/logos/benetech.svg" alt="Benetech" />
          <img src="/assets/logos/usdr.svg" alt="USDR" />
        </LogoContainer>
      </CategoriesSection>
    </section>
  );
};

export const CategoriesHeader = styled.section`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }
  background: ${({ theme }) => theme.colors.white};
  padding-top: ${({ theme }) => theme.spacings(3)};
  padding-bottom: ${({ theme }) => theme.spacings(3)};
  margin-bottom: ${({ theme }) => theme.spacings(6)};
`;

export const CategoriesSection = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacings(4)};
  }
  background: ${({ theme }) => theme.colors.white};
`;

export const CategoriesResources = styled.section`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacings(4)};
  }
  background: ${({ theme }) => theme.colors.grayLightest};
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const CategoriesSectionItemsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacings(2)};
  margin-bottom: ${({ theme }) => theme.spacings(4)};
`;

export const ActionItemsContainer = styled(CategoriesSectionItemsContainer)`
  grid-template-columns: 1fr 1fr;
`;

export const CategoryLink = styled(Button)`
  display: flex;
  width: 100%;
  margin: auto;
  height: 80px;
  font-weight: 500;
  font-size: 1.4em;
  img {
    height: 64px;
    margin-right: ${({ theme }) => theme.spacings(8)};
  }
`;

export const CallButton = styled(Button)`
  display: flex;
  max-width: 280px;
  width: 100%;
  margin: auto;
  height: 72px;
  font-size: 16px;
  color: white;
  border: none;
  background-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.ui.button.primary.background};
  &:hover {
    background-color: ${({ theme, bgColor }) => theme.colors.accentCoolDarker};
  }
  img {
    margin-right: ${({ theme }) => theme.spacings(4)};
  }
  ${({ theme }) => theme.breakpoints.sm`
    padding: ${({ theme }) => theme.spacings(3)};
  `}
`;

export const LogoContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacings(3)};
  margin-top: ${({ theme }) => theme.spacings(10)};
  img {
    height: 100px;
    width: 150px;
    justify-self: center;
  }
`;
