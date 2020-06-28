import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Button = styled.button`
  display: flex;
  padding: ${({ theme }) => `0 ${theme.spacings(5)}`};
  background-color: ${({ theme }) => theme.ui.button.background};
  color: ${({ theme }) => theme.ui.button.color};
  font-weight: ${({ theme }) => theme.ui.button.fontWeight};
  box-shadow: ${({ theme }) => theme.ui.button.shadow};
  border-radius: 4px;
  letter-spacing: -0.2px;
  height: ${({ theme }) => theme.spacings(10)};
  line-height: ${({ theme }) => theme.spacings(10)};
  transition: 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.ui.button.hover.background};
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.ui.button.disabled.background};
    box-shadow: ${({ theme }) => theme.ui.button.disabled.shadow};
  }
`;

export const ButtonLink = styled(Button)`
  display: inline-flex;
  background-color: transparent;
  color: initial;
  box-shadow: none;
  &:hover {
    background-color: ${({ theme }) => theme.ui.button.hover.backgroundGrey};
  }
`;

export const BackButton = ({ onClick = () => {}, ...rest }) => {
  const history = useHistory();

  const handleClick = () => {
    onClick();
    history.goBack();
  };

  return (
    <ButtonLink onClick={handleClick} {...rest}>
      Back
    </ButtonLink>
  );
};
