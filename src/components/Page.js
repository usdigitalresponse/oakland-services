import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Text, Heading, Heading2 } from "components/Text";
import { Icon } from "components/Icon";

export const Page = styled.section`
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: calc((var(--vh, 1vh) * 100));
`;

export const Navigation = styled.nav`
  color: ${({ theme }) => theme.colors.secondaryDark};
  background: ${({ theme }) => theme.ui.navigation.backgroundHeader};

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spacings(2)} 0`};
    position: relative;
    z-index: 2;
  }

  .nav-title {
    display: flex;
    img {
      margin-right: ${({ theme }) => theme.spacings(2)};
      width: 50px;
    }
  }

  .title {
    padding: 0;
    h1,
    h2 {
      font-size: ${({ theme }) => theme.typography.h4.fontSize};
    }
    h1 {
      margin-bottom: ${({ theme }) => theme.spacings(1)};
    }
    h2 {
      font-weight: 400;
    }
  }


  a,
  button {
    padding: ${({ theme }) => theme.spacings(3)};
    &:hover {
      color: ${({ theme }) => theme.colors.secondaryDarker};
    }
  }

  .menu-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 80px;
    padding-bottom: 12px;
    background: ${({ theme }) => theme.colors.grayLightest};
    transform: translateY(-100%);
    z-index: 1;

    &.in {
      transform: translateY(0);
    }
  }

  .menu-content {
    display: flex;
    flex-direction: column;
    button {
      text-align: left;
    }
  }

  .menu-backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #00000052;
  }
`;

export const Container = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.ui.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacings(12)};

  ${({ theme }) => theme.breakpoints.sm`
    padding: 0 ${({ theme }) => theme.spacings(4)};
  `}
`;

export const PageFooter = styled.footer`
  color: ${({ theme }) => theme.ui.navigation.text};
  background: ${({ theme }) => theme.ui.navigation.backgroundFooter};
  padding: ${({ theme }) =>
    `${theme.spacings(4)} ${theme.spacings(4)} ${theme.spacings(17)}`};
  text-align: center;

  p {
    margin: 0;
  }
`;

export const PageHeading = styled.h1`
color: ${({ theme }) => theme.colors.primary};
`;

export const PageSubheading = styled.h1`
color: ${({ theme }) => theme.colors.secondaryDark};
font-weight: normal;
`;


export const PageLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <Page>
      <Navigation>
        <Container>
          <div className="nav-content">
            <div className="nav-title">
              <img src="/assets/icon-portal_home-multi.svg"/>
            <Link className="title" to="/">
              <PageHeading>{t("title")}</PageHeading>
              <PageSubheading>{t("subtitle")}</PageSubheading>
            </Link></div>
            <button
              className="fixed"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon icon="menu" />
            </button>
          </div>
        </Container>
        <div
          className={`menu-container ${isMenuOpen ? "in" : ""}`}
          hidden={!isMenuOpen}
        >
          <Container className="menu-content">
            <h4>Languages</h4>
            <button type="button" onClick={() => changeLanguage("en")}>
              English
            </button>
            <button type="button" onClick={() => changeLanguage("es")}>
              Español
            </button>
          </Container>
        </div>
        {isMenuOpen && (
          <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />
        )}
      </Navigation>
      {children}
      <PageFooter>
        <Container>
          <Text>
            <strong>Underhoused Resources:</strong>
          </Text>
          <Text>Alameda County</Text>
        </Container>
      </PageFooter>
    </Page>
  );
};
