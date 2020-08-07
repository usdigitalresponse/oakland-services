import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Navigation } from "components/Navigation";
import { Icon } from "components/Icon";

export const PageContainer = styled.section`
  max-width: ${({ theme }) => theme.ui.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacings(12)};
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: calc((var(--vh, 1vh) * 100));
  background: ${({ background }) => background || "transparent"};

  ${({ theme }) => theme.breakpoints.sm`
    padding: 0 ${({ theme }) => theme.spacings(4)};
  `}
`;

export const PageContent = styled.section`
  padding: ${({ theme }) => theme.spacings(5)} 0;
`;

export const PageFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  letter-spacing: -1px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};

  a {
    margin-right: ${({ theme }) => theme.spacings(3)};
    &:hover {
      text-decoration: underline;
    }
    &:last-child {
      margin-right: 0;
    }
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
    <PageContainer>
      <Navigation>
        <div className="nav-content">
          <button
            className="fixed"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon icon="menu" />
          </button>
          <Link className="title" to="/">
            {t("title")}
          </Link>
          <div className="fixed" />
        </div>
        <div className={`menu-container ${isMenuOpen ? "in" : ""}`}>
          <h4>Languages</h4>
          <button type="button" onClick={() => changeLanguage("en")}>
            English
          </button>
          <button type="button" onClick={() => changeLanguage("es")}>
            Español
          </button>
        </div>
        {isMenuOpen && (
          <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />
        )}
      </Navigation>
      {children}
      <PageFooter>
        <span>© {new Date().getFullYear()}, Oakland Services</span>
      </PageFooter>
    </PageContainer>
  );
};
