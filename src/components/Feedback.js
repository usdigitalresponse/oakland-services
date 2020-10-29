import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Heading2, Text } from "components/Text";
import { Container } from "components/Page";
import { Button } from "components/Button";

export const Feedback = () => {
  const { t } = useTranslation();
  return (
    <FeedbackContainer>
      <Heading2>{t("categories.commentsTitle")}</Heading2>
      <Text>{t("categories.commentsContent")}</Text>
      <MessageButtonContainer>
        <MessageButton as="a" href="mailto: oakland-team@usdigitalresponse.org">
          <img src="/assets/mail-icon.svg" alt="Mail" />
          {t("categories.commentsButton")}
        </MessageButton>
      </MessageButtonContainer>
    </FeedbackContainer>
  );
};

const MessageButtonContainer = styled.section`
  display: flex;
  justify-content: center;
`;

const MessageButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.accentCoolDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  border: none;
  margin-top: ${({ theme }) => theme.spacings(6)};
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentCoolDarker};
  }
  img {
    margin-right: ${({ theme }) => theme.spacings(4)};
  }
`;

const FeedbackContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacings(4)};
  }
`;
