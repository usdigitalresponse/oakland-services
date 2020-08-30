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
  color: ${({ theme }) => theme.ui.navigation.text};
  background: ${({ theme }) => theme.ui.navigation.background};
  margin-bottom: ${({ theme }) => theme.spacings(4)};

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spacings(2)} 0`};
    position: relative;
    z-index: 2;
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
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .menu-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 80px;
    padding-bottom: 12px;
    background: #fff;
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
  max-width: ${({ theme }) => theme.ui.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacings(12)};

  ${({ theme }) => theme.breakpoints.sm`
    padding: 0 ${({ theme }) => theme.spacings(4)};
  `}
`;

export const PageFooter = styled.footer`
  color: ${({ theme }) => theme.ui.navigation.text};
  background: ${({ theme }) => theme.ui.navigation.background};
  padding: ${({ theme }) =>
    `${theme.spacings(4)} ${theme.spacings(4)} ${theme.spacings(17)}`};
  text-align: center;

  p {
    margin: 0;
  }
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
            <Link className="title" to="/">
              <Heading>{t("title")}</Heading>
              <Heading2>{t("subtitle")}</Heading2>
            </Link>
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
      <Container>{children}</Container>
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
