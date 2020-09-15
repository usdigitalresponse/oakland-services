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
      <MessageButton as="a" href="mailto: oakland-team@usdigitalresponse.org">
        {t("categories.commentsButton")}
      </MessageButton>
    </FeedbackContainer>
  );
};

const MessageButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.orange};
  &:hover {
    background-color: ${({ theme }) => theme.colors.orangeLight};
  }
`;

const FeedbackContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacings(4)};
  }
`;
