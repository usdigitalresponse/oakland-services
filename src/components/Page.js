import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navigation } from "components/Navigation";
import { Logo } from "components/Logo";

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
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <PageContainer>
      <Navigation>
        <Link to="/">
          <Logo />
        </Link>
        <NavRight>
          <button type="button" onClick={() => changeLanguage("en")}>
            en
          </button>
          <button type="button" onClick={() => changeLanguage("es")}>
            es
          </button>
        </NavRight>
      </Navigation>
      {children}
      <PageFooter>
        <span>© {new Date().getFullYear()}, Oakland Services</span>
      </PageFooter>
    </PageContainer>
  );
};

const NavRight = styled.div`
  a,
  button {
    padding: ${({ theme }) => theme.spacings(3)};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
